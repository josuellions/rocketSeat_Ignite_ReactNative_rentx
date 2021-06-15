import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean
}

export const Container = styled.View<ContainerProps> `
  flex-direction: row;

  ${({ isFocused, theme }) => isFocused && css `
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `
  };
`;

export const IconContainer = styled.View `
  height: 56px;
  width: 56px;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: ${({theme}) => theme.colors.backuground_secundary};
`;

export const InputText = styled(TextInput) `
  flex: 1;
  padding: 0 23px;
  font-size: ${RFValue(15)}px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.primary_400};
  background-color: ${({theme}) => theme.colors.backuground_secundary};
`