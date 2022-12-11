import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../../components/Form/Button';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  Title,
  Content,
  NoDataContainer,
  NoDataText,
  AddAccountContainer,
} from './styles';

interface NavigationProps {
  navigate: (screen: string) => void;
  goBack: () => void;
}

export function Banks() {
  const [ accounts, setAccounts ] = useState([]);

  const theme = useTheme();
  const navigation =  useNavigation<NavigationProps>();
  const { user } = useAuth();

  function handleAddBank() {
    navigation.navigate('NewBank');
  }

  async function fetchAccount() {
    try {
      const dataKey = `@gofinance:accounts:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const dataFormatted = data ? JSON.parse(data) : [];

      setAccounts(dataFormatted);
    } catch (error) {
      console.error(error);
      
    }
  }

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Contas</Title>
      </Header>

      <Content>
        {accounts.length === 0 && (
          <NoDataContainer>
            <NoDataText>Não há contas cadastradas</NoDataText>
          </NoDataContainer>
        )}
        <AddAccountContainer>
          <Button
            rounded
            onPress={handleAddBank}
          >
            <MaterialIcons
              name="add"
              size={20}
              color={theme.colors.shape}
            />
          </Button>
        </AddAccountContainer>
      </Content>
    </Container>
  );
}
