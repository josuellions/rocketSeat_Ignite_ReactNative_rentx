import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { format } from 'date-fns';

import { Calendar, MarkedDateProps,  DayProps, generateInterval } from '../../components/Calendar';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';

import { useTheme } from 'styled-components';

import { CarDTO } from '../../dtos/CarDTO';
import { getPlatFormDate } from '../../utils/getPlatFormDate';

import ArrowSvg from '../../assets/arrow.svg'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';

interface RentalPeriod {
  //start: number;
  startFormated: string;
  //end: number;
  endFormated: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling(){
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { car } = route.params as Params;
  const [ lastSelectedDate, setLastSelectedDate ] = useState<DayProps>({} as DayProps);
  const [ rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod);
  const [ markedDates, setMarkedDates ] = useState<MarkedDateProps>({} as MarkedDateProps);
  
  function handleSchedulingDetails() {

    if(!rentalPeriod.startFormated || !rentalPeriod.endFormated){
      Alert.alert('Selecione uma data ou período para alugar!');
      return;
    }

    navigation.navigate('SchedulingDetails', {
      car, 
      dates: Object.keys(markedDates)
    });
  }
  
  function handleCarDetails() {
    navigation.goBack(); //Volta para tela anterios
  }

  function handleChangeDate(date: DayProps) {

    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date; 

    //Inverter as datas caso usuario selecionar data invertidas inicio e fim
    if(start.timestamp > end.timestamp){
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length -1];

    setRentalPeriod({
      //start: start.timestamp,
      //end: end.timestamp,
      startFormated: format(getPlatFormDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormated: format(getPlatFormDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={theme.colors.shape} onPress={ handleCarDetails } />
        <Title>
          Escolha uma data {'\n'}
          de início e fim {'\n'}
          para aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormated}>{rentalPeriod.startFormated}</DateValue>
          </DateInfo>

          <ArrowSvg />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormated}>{rentalPeriod.endFormated}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>
      
      <Footer>
        <Button 
          title="Confirmar" 
          color={theme.colors.main} 
          enabled={!!rentalPeriod.startFormated}
          onPress={handleSchedulingDetails}/>
      </Footer>
      
    </Container>
  );
}