import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import BancoBrasilSvg from '../../assets/banco-brasil-logo.svg';
import BradescoSvg from '../../assets/bradesco-logo.svg';
import CaixaEconomicaSvg from '../../assets/cef-logo.svg';
import ItauSvg from '../../assets/itau-logo.svg';
import NubankSvg from '../../assets/nubank-logo.svg';
import SantanderSvg from '../../assets/santander-logo.svg';

export const Container = styled.View`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.View`
  flex: 1;

  padding: 24px 24px 0;
`;

export const BankContainer = styled.View`
  align-items: center;
  justify-content: center;

  margin-bottom: 32px;
`;

export const BankName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  padding: 0 24px ${getBottomSpace() + 24}px;
`;

export const BancoBrasilLogo = styled(BancoBrasilSvg)``;

export const BradescoLogo = styled(BradescoSvg)``;

export const CaixaEconomicaLogo = styled(CaixaEconomicaSvg)``;

export const ItauLogo = styled(ItauSvg)``;

export const NubankLogo = styled(NubankSvg)``;

export const SantanderLogo = styled(SantanderSvg)``;
