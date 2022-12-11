import styled from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
  rounded: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  border-radius: ${({ rounded }) => rounded ? '28px' : '5px'};

  padding: 18px;

  align-items: center;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.shape};
`;
