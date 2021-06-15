import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';

import { format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { useTheme } from 'styled-components';
import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlatFormDate } from '../../utils/getPlatFormDate';

import { api } from '../../services/api';

import {
  Container,
  Header,
  CarImage,
  Content,
  Details,
  Desctiption,
  Brand,
  Name,
  Rent,
  Period,
  Prince,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLable,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer
} from './styles';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails(){
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const [ loading, setLoading ] = useState(false);
  const { car, dates } = route.params as Params;
  const [ rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod);
  
  const rentTotal = Number(dates.length * car.rent.price);

  async function handleSchedulingComplete() {
    setLoading(true);
    
    /* Verificar se já possui agendamento do veiculo para data selecionada */
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    /* Agendamento veiculo Por Usuário*/
    await api.post('/schedules_byuser',{
      user_id: String(7),
      startDate: format(getPlatFormDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlatFormDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
      car
    });

    /* Agendamento do veiculo */
    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
    .then(() => 
      navigation.navigate('Confirmation', {
        title: 'Carro alugado!', 
        message: `Agora você só precisa ir\naté a concessionária da RENTX\ne retirar o seu automóvel.`,
        nextScreenRoute: 'Home',
      })
    )
    .catch((err) => {
      Alert.alert('Error: Falha ao realizar o agendamento!');
      setLoading(false);
      console.log(err);
    })
  }

  function handleScheduling() {
    navigation.goBack(); //Volta para tela anterios
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatFormDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatFormDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  },[])

  return (
    <Container>
      <Header>
        <BackButton onPress={handleScheduling} />
      </Header>
      <CarImage>
        <ImageSlider imagesUrl={car.photos}/>
      </CarImage>

      <Content>
        <Details>
          <Desctiption>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Desctiption>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Prince>R$ {car.rent.price}</Prince>
          </Rent>
        </Details>

        <Accessories>
          { car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type} 
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)}/>
            ))
          }
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
            
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(15)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
    
        <RentalPrice>
          <RentalPriceLable>Total</RentalPriceLable>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button 
          title={"Alugar agora"} 
          color={theme.colors.success} 
          enabled = {!loading}
          loading = {loading}
          onPress={handleSchedulingComplete} 
        />
      </Footer>
    </Container>
  );
}