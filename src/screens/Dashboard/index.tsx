import React, { useState, useEffect, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  UserGreeting,
  UserName,
  User,
  Photo,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from './styles';

export interface DatalistProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DatalistProps[]>([]);

  async function loadTransactions() {
    const dataKey = '@gofinance:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFomatted: DatalistProps[] = transactions.map((item: DatalistProps) => {
      const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }
    });

    setData(transactionsFomatted);
  }

  useEffect(() => {
    loadTransactions();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{uri: 'https://github.com/brunodsazevedo.png'}} />
              <User>
                <UserGreeting>Olá</UserGreeting>
                <UserName>Bruno</UserName>
              </User>
            </UserInfo>

            <LogoutButton onPress={() => {}}>
              <Icon name="power" />
            </LogoutButton>
          </UserWrapper>
        </Header>

        <HighlightCards>
          <HighlightCard
            type="up"
            title="Entradas"
            amount="R$ 17.400,00"
            lastTransaction="Última entrada dia 13 de abril"
          />

          <HighlightCard
            type="down"
            title="Saídas"
            amount="R$ 16.141,00"
            lastTransaction="Última entrada dia 03 de abril"
          />

          <HighlightCard
            type="total"
            title="Total"
            amount="R$ 16,141,00"
            lastTransaction="Última entrada dia 13 de abril"
          />

        </HighlightCards>

        <Transactions>
          <Title>Listagem</Title>

            <TransactionList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
        </Transactions>
    </Container>
  )
}
