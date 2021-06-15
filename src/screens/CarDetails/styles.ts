import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View `
  flex: 1;
  background-color: ${({theme}) => theme.colors.backuground_secundary};
`;

export const Header = styled.View `
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
`;

export const CarImage = styled.View `
  margin-top: ${getStatusBarHeight() + 18}px;
`;

export const Details = styled.View `
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 38px;
`;

export const Desctiption = styled.View `
`;

export const Brand = styled.Text `
  font-family: ${({theme}) => theme.fonts.secundary_500};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(14)}px;
  text-transform: uppercase;
`;

export const Name = styled.Text `
  font-family: ${({theme}) => theme.fonts.secundary_500};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(25)}px;
`;

export const Rent = styled.View `
`;

export const Period = styled.Text `
  font-family: ${({theme}) => theme.fonts.secundary_500};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(14)}px;

  text-transform: capitalize;
`;

export const Prince = styled.Text `
  font-family: ${({theme}) => theme.fonts.secundary_500};
  color: ${({theme}) => theme.colors.main};
  font-size: ${RFValue(25)}px;
`;

export const Accessories = styled.View `
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
`;

export const About = styled.Text `
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(15)}px;
  text-align: justify;
  line-height: ${RFValue(25)}px;
  margin-top: 23px;
`;

export const Footer = styled.View `
  width: 100%;
  padding: ${RFValue(24)}px ${RFValue(24)}px ${getBottomSpace() + 24}px;
`
export const OfflineInfo = styled.Text `
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.main};
  font-size: ${RFValue(15)}px;
  text-align: center;
  margin-top: 5px;
`