//rnfc = Atalho para criar component
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons  } from '@expo/vector-icons';

import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { Car as ModelCar } from '../../database/model/Car';
//import { CarDTO } from '../../dtos/CarDTO';
import { database } from '../../database';
import { api } from '../../services/api';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
/*import { Loading } from '../../components/Loading';*/
import { LoadingAnimation } from '../../components/LoadingAnimation';

import { useTheme } from 'styled-components';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  //withTiming
} from 'react-native-reanimated';

import {
  Container,
  Header,
  HeaderContent,
  CarList,
  TotalCars,
} from './styles';

export function Home() {
  const theme = useTheme();
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [ loading, setLoading ] = useState(false);
  const [ cars, setCars ] = useState<ModelCar[]>([]) //Sem uso do sincronismo => useState<CarDTO[]>([]);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform:[
        {translateX: positionX.value},
        {translateY: positionY.value},
      ]
    }
  });

  /*Capturando movimento do item na view */
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      //positionX.value = withTiming(0);
      //positionY.value = withTiming(0);
    }
  })

  function handleCarDetails(car: ModelCar) { //CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  /*function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }*/

  /**Sincronizando dados do dispositivo com banco dados server - API*/
  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
          
          const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
          const { changes, latestVersion } = response.data;   
                          console.log('>>>>>>>>CHANGES BACK PAR APP<<<<<<<<<<<<<<<<<')
                          console.log(changes)
                          console.log('>>>>>>>>CHANGES<<<<<<<<<<<<<<<<<')
          //const change = changes.cars.created                          
          return { changes, timestamp: latestVersion }                

      },
      pushChanges: async ({ changes }) => {
        console.log('>>>>>>>>CHANGES APP PARA BACK<<<<<<<<<<<<<<<<<')
        console.log(changes)
        console.log('>>>>>>>>CHANGES<<<<<<<<<<<<<<<<<')
          const user = changes.users;
          await api.post('/users/sync', user);
      }
    });
  }

  /*Buscando direto da API - sem sinconização */
  /*useEffect(() => {
    let isMounted = true; //garntindo que os componente sofra atualizações somente se estiver montado na interface para não crachear
    console.log(new Date().getTime());
    async function fetchCar(){
      try{
        const res = await api.get('/cars');
        if(isMounted ) {
           setCars(res.data)
        }
      }catch(err){
        //Alert.alert('Error: Falha ao carregar dados veículos!');
        console.log(err);
      }finally{
        if(isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCar();
    // Garantindo a limpeza de memoria para carchear 
    return () => {
      isMounted = false
    }
  },[])*/

  /*Função foi usada apenas para teste no DEV-APP*/
 /* useEffect(() => {
    if(netInfo.isConnected){
      Alert.alert('Info: Conexão on-line!')
      return
    }

    Alert.alert('Info: Conexão off-line!')
  },[netInfo.isConnected])*/
  // handleOpenMyCars}
  

  /** Carregando dados sincronizados no dispositivo APP */
  useEffect(() => {
    let isMounted = true; //garntindo que os componente sofra atualizações somente se estiver montado na interface para não crachear
    
    async function fetchCar(){
      try{
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch(); //Carrega todos

        console.log(cars)

        if(isMounted) {
           setCars(cars)
        }
      }catch(err){
        Alert.alert('Error: Falha ao carregar dados veículos!');
        console.log(err);
      }finally{
        if(isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCar();
    //Garantindo a limpeza de memoria para carchear 
    return () => {
      isMounted = false
    }
  },[]);

  /*useEffect(() => {
    if(netInfo.isConnected === true){
      offlineSynchronize();
    }
  },[netInfo.isConnected])*/


  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent /*Para deixar o heade atras da statusbar */
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(18)} />

         { !loading &&  <TotalCars>Total de {cars.length} Carros</TotalCars> }
        </HeaderContent>

      </Header>
      <Button title="Sincronizar" onPress={offlineSynchronize}/>
      { loading ? 
        <LoadingAnimation/> 
      :
        <CarList 
          data={cars} 
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => 
              <Car data={item} onPress={() => handleCarDetails(item)}
          />}
        />
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
        style={[
          myCarsButtonStyle,
          {
            position: 'absolute',
            bottom: 13,
            right: 13
          }
        ]}
      >
        {/*<ButtonAnimated 
          onPress={ handleOpenMyCars } 
          style={[styles.button, { backgroundColor: theme.colors.main}]}
        
        >
          <Ionicons name="ios-car-sport" size={34} color={theme.colors.shape} />
        </ButtonAnimated>*/}
      </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create ({
  button: {
    width: 60,
    height: 60,
  
    alignItems: 'center',
    justifyContent: 'center',
  
    borderRadius: 30,
  }
})