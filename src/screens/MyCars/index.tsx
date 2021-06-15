import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, FlatList, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


/*import { Loading } from '../../components/Loading';*/
import { LoadingAnimation } from '../../components/LoadingAnimation';

import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Container, 
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWarpper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps {
  id: number,
  use_id: number,
  startDate: string,
  endDate: string,
  car: CarDTO
}

export function MyCars(){
  const theme = useTheme();
  const navigation = useNavigation();
  const [ loading, setLoading ] = useState(true);
  const [ cars, setCars ] = useState<CarProps[]>([]);

  function handleHome() {
    navigation.goBack(); //Volta para tela anterios
  }

  useEffect(() => {
    async function fetchCars() {
      try{
        const res = await api.get(`/schedules_byuser/?user_id=${7}`);
        setCars(res.data);
      } catch(err) {
        Alert.alert('Error: Falha ao listar dados veículos alugados!');
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  },[])

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Header>
        <BackButton color={theme.colors.shape} onPress={ handleHome } />
        <Title>
          Seus Agendamentos, {'\n'}
          estão aqui  
        </Title>
        <SubTitle>
          Conforto, segurança e praticidade
        </SubTitle>
      </Header>
      
      {loading ? 
        <LoadingAnimation />
        :
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList 
            data={cars}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWarpper>
                
                <Car data={item.car} onPress={() => {}}/>

                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>

                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{marginHorizontal: 10}}
                    />

                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWarpper>
            )}
          />
        </Content>
      }
    </Container>
  );
}