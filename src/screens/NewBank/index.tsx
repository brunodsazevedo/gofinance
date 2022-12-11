import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { listBanks } from '../../services/pluggyService';

import {
  Container,
  Header,
  Title,
  Option,
  Wrapper,
  ImageContainer,
  OptionDetail,
  Name,
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
  imageUrl: string
}

interface NavigationProps {
  navigate(screen: string, params?: any): void;
  goBack(): void;
}

export function NewBank() {
  const [banks, setBanks] = useState<Bank[]>([]);

  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();

  async function fetchBanks() {
    try {
      const data = await listBanks();
      
      setBanks(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleBankCredentials(bank: Bank) {
    navigation.navigate('BankCredentials', {
      bank,
    });
  }

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Selecione uma conta</Title>
      </Header>

      <FlatList
        data={banks}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingVertical: 16,
          paddingHorizontal: 24,
        }}
        renderItem={({ item }) => (
          <Option onPress={() => handleBankCredentials(item)}>
            <Wrapper>
              <ImageContainer>
                {item.id === 211 && (
                  <BancoBrasilLogo
                    height={40}
                    width={40}
                  />
                )}

                {item.id === 203 && (
                  <BradescoLogo
                    height={40}
                    width={40}
                  />
                )}

                {item.id === 219 && (
                  <CaixaEconomicaLogo
                    height={40}
                    width={40}
                  />
                )}

                {item.id === 201 && (
                  <ItauLogo
                    height={40}
                    width={40}
                  />
                )}

                {item.id === 212 && (
                  <NubankLogo
                    height={40}
                    width={40}
                  />
                )}

                {item.id === 208 && (
                  <SantanderLogo
                    height={40}
                    width={40}
                  />
                )}
              </ImageContainer>

              <OptionDetail>
                <Name>{item.name}</Name>
              </OptionDetail>
            </Wrapper>

            <MaterialIcons
              name="arrow-forward"
              size={20}
              color={theme.colors.primary}
            />
          </Option>
        )}
      />
    </Container>
  );
}
