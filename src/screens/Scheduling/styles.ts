import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface DateValueProps {
  selected: boolean
}

export const Container = styled.View `
  flex: 1;
  background-color: ${({theme}) => theme.colors.backuground_secundary};
`;

export const Header = styled.View `
  width: 100%;
  height: 325px;

  background-color: ${({theme}) => theme.colors.header};

  justify-content: center;
  padding: ${RFValue(25)}px;
  
  padding-top: ${getStatusBarHeight() + 18}px;

`;

export const Title = styled.Text `
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secundary_600};
  font-size: ${RFValue(44)}px;
  margin-top: 24px;
`;

export const RentalPeriod = styled.View `
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 32px 0px;
`;

export const DateInfo = styled.View `
  width: 30%;
`;

export const DateTitle = styled.Text `
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.secundary_500};
  font-size: ${RFValue(16)}px;
`;

export const DateValue = styled.Text<DateValueProps> `
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secundary_500};
  font-size: ${RFValue(18)}px;

  ${({selected, theme}) => !selected && css `
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.text};
    padding-bottom: 5px;
  ` }
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle:{
    paddingBottom: 24
  },
  showsVerticalScrollIndicator: false
}) ``;

export const Footer = styled.View `
  padding: 24px;
`;