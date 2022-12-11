import React, { ReactNode } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Title,
} from './styles';

interface Props extends RectButtonProps {
  title?: string;
  rounded?: boolean;
  children?: ReactNode;
  onPress?: () => void;
}

export function Button({ title, onPress, rounded = false, children, ...rest }: Props) {
  return (
    <Container
      rounded={rounded}
      onPress={onPress}
      {...rest}
    >
      {title && (
        <Title>
          {title}
        </Title>
      )}

      {children}
    </Container>
  );
}
