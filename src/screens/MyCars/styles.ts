import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View `
  flex: 1;
  align-items: center;
  background-color: ${({theme}) => theme.colors.backuground_primary};
`;

export const Header = styled.View `
  width: 100%;
  height: 225px;

  background-color: ${({theme}) => theme.colors.header};

  justify-content: center;
  padding: ${RFValue(25)}px;
  
  padding-top: ${getStatusBarHeight() + 18}px;

`;

export const Title = styled.Text `
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secundary_600};
  font-size: ${RFValue(30)}px;
  margin-top: 24px;
`;

export const SubTitle = styled.Text `
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secundary_400};
  font-size: ${RFValue(15)}px;
  margin-top: 24px;
`;

export const Content = styled.View `
  flex: 1;
  width: 100%;
  padding: 0 16px;
`;

export const Appointments = styled.View `
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text `
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled.Text `
  color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

export const CarWarpper = styled.View `
  margin-bottom: 16px;
`;

export const CarFooter = styled.View `
  width: 100%;
  padding: 12px;
  margin-top: -10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.backuground_secundary};
`;

export const CarFooterTitle = styled.Text `
  color: ${({theme}) => theme.colors.text_detail};
  font-family: ${({theme}) => theme.fonts.secundary_500};
  font-size: ${RFValue(15)}px;
`;

export const CarFooterPeriod = styled.View `
  flex-direction: row;
  align-items: center;
`;

export const CarFooterDate = styled.Text `
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.secundary_400};
  font-size: ${RFValue(17)}px;
`;
