import React, { useState } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '../../hooks/auth';

import { InputForm } from '../../components/Form/InputForm'
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'

type NavigationProps = {
  navigate:(screen:string) => void;
}

interface FormData {
  [name: string]: any;
}

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive()
    .required('Valor é obrigatório'),
});

export function Register() {
  const [ transactionType, setTransactionType ] = useState('');
  const [ categoryModalOpen, setCategoryModalOpen ] = useState(false);
  const [ category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const { user } = useAuth();

  const navigation = useNavigation<NavigationProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: 'positive'| 'negative') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  async function handleRegister(form: FormData) {
    if(!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const dataKey = `@gofinance:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormated = [
        ...currentData,
        newTransaction,
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigation.navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>
            Cadastro
          </Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                isActive={transactionType === 'positive'}
                onPress={() => handleTransactionsTypeSelect('positive')}
              />

              <TransactionTypeButton
                type="down"
                title="Outcome"
                isActive={transactionType === 'negative'}
                onPress={() => handleTransactionsTypeSelect('negative')}
              />
            </TransactionsTypes>

            <CategorySelectButton
              testID="button-category"
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />

          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal testID="modal-category" visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  );
}
