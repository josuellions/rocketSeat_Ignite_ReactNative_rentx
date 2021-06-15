import React, {useState} from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
 Container,
 IconContainer,
 InputText,
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'] //Retorna só tipagem nome
  value?: string 
}

export function InputPassword({ iconName, value, ...rest }: InputProps ){
  const theme = useTheme();
  const [ isFilled, setIsFilled ] = useState(false);
  const [ isFocused, setIsFocused ] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function handleInputFocus(){
    setIsFocused(true);
  }
  
  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value); //transforma em boolean e verifica se tem conteudo
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState =>  !prevState);
  }

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={isFilled || isFocused ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>
      <InputText 
        secureTextEntry={isPasswordVisible} 
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
      <IconContainer>
        <BorderlessButton onPress={handlePasswordVisibilityChange}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </BorderlessButton>
      </IconContainer>
    </Container>
  );
}