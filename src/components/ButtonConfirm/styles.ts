import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton) `
  width: 80px;
  height: 56px;
  background-color: ${({theme}) => theme.colors.shape_dark};
  justify-content: center;
  align-items: center;

  border-radius: 4px;
`;

export const Title = styled.Text `
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(16)}px;
`;