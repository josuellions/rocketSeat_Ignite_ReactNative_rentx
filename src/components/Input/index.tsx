import React, {useState} from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import {
 Container,
 IconContainer,
 InputText
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'] //Retorna só tipagem nome
  value?: string
}

export function Input({ iconName, value, ...rest }: InputProps ){
  const theme = useTheme();
  const [ isFocused, setIsFocused ] = useState(false);
  const [ isFilled, setIsFilled ] = useState(false);

  function handleInputFocus(){
    setIsFocused(true);
  }
  
  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value); //transforma em boolean e verifica se tem conteudo
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
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  );
}