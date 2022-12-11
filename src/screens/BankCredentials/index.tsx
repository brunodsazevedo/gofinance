import React from 'react';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';

import { createConnection } from '../../services/pluggyService';

import {
  Container,
  Header,
  Title,
  Content,
  BankContainer,
  BankName,
  Footer,
  BancoBrasilLogo,
  BradescoLogo,
  CaixaEconomicaLogo,
  ItauLogo,
  NubankLogo,
  SantanderLogo,
} from './styles';

interface Bank {
  id: number;
  name: string;
  institutionUrl: string;
  imageUrl: string;
  primaryColor: string;
  type: string;
  country: string;
  credentials: {
    name: string;
    label: string;
    type: 'text' | 'password' | 'number' | 'image' | 'select';
    assistiveText?: string;
    data?: string;
    placeholder?: string;
    validation?: string;
    validationMessage?: string;
    mfa?: boolean;
    options?: {
      value: string;
      label: string;
    }[];
  }[];
}

interface Params {
  bank: Bank;
}

export function BankCredentials() {
  const { control, handleSubmit } = useForm();
  const route = useRoute();

  const { bank } = route.params as Params;

  async function handleConnectBank(data: any) {
    try {

      const response = await createConnection(bank.id, data);
      console.log(response);
      
    } catch (error) {
      if(error instanceof AxiosError) {
        console.log(error.response?.data);
        
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Insira suas credenciais</Title>
        </Header>

        <Content>
          <BankContainer>
            {bank.id === 211 && (
              <BancoBrasilLogo
                height={60}
                width={60}
              />
            )}

            {bank.id === 203 && (
              <BradescoLogo
                height={60}
                width={60}
              />
            )}

            {bank.id === 219 && (
              <CaixaEconomicaLogo
                height={60}
                width={60}
              />
            )}

            {bank.id === 201 && (
              <ItauLogo
                height={60}
                width={60}
              />
            )}

            {bank.id === 212 && (
              <NubankLogo
                height={60}
                width={60}
              />
            )}

            {bank.id === 208 && (
              <SantanderLogo
                height={60}
                width={60}
              />
            )}

            <BankName>
              {bank.name}
            </BankName>
          </BankContainer>

          {bank.credentials.map(credential => (
            <InputForm
              key={credential.name}
              name={credential.name}
              placeholder={credential.label}
              secureTextEntry={credential.name === 'password'}
              keyboardType={
                credential.type === 'number'
                ? 'number-pad'
                : 'default'
              }
              control={control}
            />
          ))}
        </Content>

        <Footer>
          <Button
            title="Conectar ao banco"
            onPress={handleSubmit(handleConnectBank)}
          />
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
