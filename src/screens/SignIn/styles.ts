import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View `
  padding: 0 24px;
  background-color: ${({theme}) => theme.colors.backuground_primary};
`;

export const Header = styled.View `
  width: 100%;
  margin-top: ${getStatusBarHeight() + 75}px;
`;

export const Title = styled.Text `
  font-size: ${RFValue(32)}px;
  font-family: ${({theme}) => theme.fonts.secundary_600};
  color: ${({theme}) => theme.colors.title};
`;

export const SubTitle = styled.Text `
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.text_detail};
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;

export const Form = styled.View `
  width: 100%;
  margin: 64px 0;
`

export const Footer = styled.View `
  bottom: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;

  height: ${getStatusBarHeight() + 115}px;
  justify-content: space-around;
`;