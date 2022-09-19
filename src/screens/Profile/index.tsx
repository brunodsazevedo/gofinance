import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export function Profile() {
  return (
    <View>
      <Text testID="text-title">
        Perfil
      </Text>

      <TextInput
        testID="input-name"
        placeholder='Nome'
        autoCorrect={false}
        value="Bruno"
      />

      <TextInput
        testID="input-surname"
        placeholder='SobreNome'
        autoCorrect={false}
        value="Azevedo"
      />

      <Button
        title="Salvar"
        onPress={() => {}}
      />
    </View>
  );
}
