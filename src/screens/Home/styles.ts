//rnsc = Atalho para criar style component
import { FlatList } from 'react-native';
//import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

//import { CarDTO } from '../../dtos/CarDTO'; //sem sicronização
import { Car  } from '../../database/model/Car';

export const Container = styled.View `
flex: 1;
background-color: ${({theme}) => theme.colors.backuground_primary};
`;

export const Header = styled.View `
  width: 100%;
  height: 113px;
  background-color: ${({theme}) => theme.colors.header};
  justify-content: flex-end;

  padding: 32px 24px;
`;

export const HeaderContent = styled.View `
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
`;

export const TotalCars = styled.Text `
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.primary_400};

  justify-content: flex-end;
`;

export const CarList = styled(FlatList as new () => FlatList<Car>).attrs({
  contentContainerStyle: {
    padding: 24
  },
  showsVerticalSctollIndicator: false
}) ``;