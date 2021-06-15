import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { InputPassword } from '../../../components/InputPassword';
import { Button } from '../../../components/Button';

import { useTheme } from 'styled-components';

import { api } from '../../../services/api';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles'

interface Params {
  user: {
    name: string,
    email: string,
    driverLicense: string
  }
}

export function SecondStep(){
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const [ password, setPassword ] = useState('');
  const [ passwordConfirm, setPasswordConfirm ] = useState('');

  const { user  } = route.params as Params

  function handleBack(){
    navigation.goBack();
  }

  async function handleRegister(){

    if(!password || !passwordConfirm){
      return Alert.alert('Info: Senha e confirmação da senha são obrigatórios!')
    }

    if(password !== passwordConfirm){
     return Alert.alert('Info: Senha e confirmação da senha devem ser iguais!')
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    }).then(() =>{
      
      navigation.navigate('Confirmation', {
        title: 'Cadastro', 
        message: `Seu cadastro foi realizado com sucesso.\nDesfrute do benefícios de alugar um veículo com\nsegurança e tranquilidade.`,
        nextScreenRoute: 'SignIn',
      });

    }).catch(() => {
      Alert.alert('Error: Falha ao realizar o cadastro, tente novamente!');
    });

  }
    
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet active/>
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de {'\n'}forma rápida e fácil</SubTitle>
          
          <Form>
            <FormTitle>2. Senha</FormTitle>

            <InputPassword 
              iconName="lock" 
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />

            <InputPassword 
              iconName="lock" 
              placeholder="Confirme sua senha" 
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />

          </Form>

          <Button title="Confirmar" color={theme.colors.success} onPress={handleRegister} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}