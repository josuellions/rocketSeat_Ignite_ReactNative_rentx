import * as Yup from 'yup';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native'
import { StatusBar, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Alert } from 'react-native';

import { useTheme } from 'styled-components';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { Button } from '../../components/Button';

import { database } from '../../database';
import { useAuth } from '../../hooks/auth'

import {
 Container,
 Header,
 Title,
 SubTitle,
 Form,
 Footer
} from './styles';

export function SignIn(){
  const theme = useTheme();
  const  navigation =  useNavigation();
  const [ email, setEmail ] = useState('josuel@email.com');
  const [ password, setPassword ] = useState('123');

  const { signIn } = useAuth();

  async function handleSingIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um email válido'),
        password: Yup.string()
          .required('A senha é obrigatória.')
      });
  
      await schema.validate({email, password});

      signIn({ email, password })

      //Alert.alert('Tudo certo')

    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert(error.message)
        return
      }

      Alert.alert('Error: Falha ao realizar login!')
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep')
  }

  useEffect(() => {
    async function loadData() {
      const userCollection = database.get('users');
      const users = await userCollection.query().fetch();

      console.log(users);
    }
    loadData
  })

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Header>
          <Title>Alugue seu veículo {`\n`}com segurança e tranquilidade.</Title>
          <SubTitle>Faça seu login para começar {`\n`}um experiencia incrível.</SubTitle>
        </Header>

        <Form>
          <Input 
            iconName="mail" 
            placeholder="seuemail@email.com.br" 
            keyboardType="email-address" 
            autoCorrect={false} 
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
            />
          <InputPassword 
            iconName="lock" 
            placeholder="seu senha" 
            autoCorrect={false} 
            autoCapitalize="none"
            onChangeText={setPassword}
            value={password}
          />
        </Form>

        <Footer>
          <Button
            title="Login"
            color={theme.colors.main}
            onPress={handleSingIn}
            enabled={true}
            loading={false}
          />

          <Button
            title="Cria Conta Gratuita"
            color={theme.colors.shape}
            onPress={handleNewAccount}
            enabled={true}
            loading={false}
            light={true}
          />
        </Footer>
      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
 );
}