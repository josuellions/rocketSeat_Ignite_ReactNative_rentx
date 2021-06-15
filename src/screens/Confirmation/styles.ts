import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View `
  flex: 1;
  background-color: ${({theme}) => theme.colors.header};
  padding-top: 96px;
`;

export const Content = styled.View `
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: ${RFValue(50)}px;
`;

export const Title = styled.Text `
  font-size: ${RFValue(30)}px;
  font-family: ${({theme}) => theme.fonts.secundary_600};
  color: ${({theme}) => theme.colors.shape};
`;

export const Message = styled.Text `
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.text_detail};
  line-height: ${RFValue(25)}px;
  text-align: center;
  margin-top: 16px;
`;

export const Footer = styled.View `
  width: 100%;
  align-items: center;
  margin: ${RFValue(80)}px 0;
`
