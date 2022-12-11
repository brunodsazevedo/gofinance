import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import BancoBrasilSvg from '../../assets/banco-brasil-logo.svg';
import BradescoSvg from '../../assets/bradesco-logo.svg';
import CaixaEconomicaSvg from '../../assets/cef-logo.svg';
import ItauSvg from '../../assets/itau-logo.svg';
import NubankSvg from '../../assets/nubank-logo.svg';
import SantanderSvg from '../../assets/santander-logo.svg';

export const Container = styled.View`
  flex: 1;
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

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 8px;

  border-radius: 8px;

  margin-bottom: 16px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ImageContainer = styled.View`
  margin-right: 16px;
`;

export const ImageBank = styled.Image`
  height: ${RFValue(40)}px;
  width: ${RFValue(40)}px;
`;

export const OptionDetail = styled.View``;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const BancoBrasilLogo = styled(BancoBrasilSvg)``;

export const BradescoLogo = styled(BradescoSvg)``;

export const CaixaEconomicaLogo = styled(CaixaEconomicaSvg)``;

export const ItauLogo = styled(ItauSvg)``;

export const NubankLogo = styled(NubankSvg)``;

export const SantanderLogo = styled(SantanderSvg)``;
