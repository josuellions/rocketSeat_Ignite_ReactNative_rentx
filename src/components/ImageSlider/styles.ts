import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View `
  width: 100%;
`;

export const ImageIndexes = styled.View `
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const CarImageWrapper = styled.View `
  padding: 0;
  height: ${RFValue(100)}px;
  margin-top: ${getStatusBarHeight() + 0}px;
  width: ${Dimensions.get('window').width}px; /*Pega largura exata do dispositivo*/
  
  justify-content: center;
  align-items: center;
`;

export const CarImage = styled.Image `
  width: 280px;
  height: 132px;
`;
