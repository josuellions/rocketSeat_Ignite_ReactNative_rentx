import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableNativeFeedback  } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'; //Captura altura do menu tab

import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';

import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles';


export function Profile(){
  const theme = useTheme();
  const netInfo = useNetInfo(); 
  const navigation = useNavigation();
  const { user, signOut, updatedUser } = useAuth();
  const [ name, setName ] = useState(user.name);
  const [ avatar, setAvatar ] = useState(user.avatar);
  const [ driverLicense, setDriverLicense ] = useState(user.driver_license);
  const [ option, setOption ] = useState<'dataEdit' | 'passwordEdit'>('passwordEdit')

  function handleBack() {
    navigation.goBack()  
  }

  async function handleProfileUpdate(){
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória!'),
        name: Yup.string().required('Nome é obrigatório!'),
      });

      const data = { name, driverLicense };

      await schema.validate(data);

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token
      });

      Alert.alert('Sucesso: Seu perfil foi atualizado!')

    } catch (error) {
      if(error instanceof Yup.ValidationError ) {
      
        Alert.alert('Info:', error.message);
      
      }else{
        Alert.alert('Error: Falha ao atualiza os dados!');
      }
    }
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){

    if(netInfo.isConnected === false && optionSelected === 'passwordEdit'){
      Alert.alert('Você está off-line', 'Para atualiza a senha, conecte-se a Internet!');
    }else{
      setOption(optionSelected);
    }
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [ 4, 4 ],
      quality: 1
    });

    if(result.cancelled) {
      return;
    }

    if(result.uri){
      setAvatar(result.uri);
    }
  }

  async function handleSignOut(){
    Alert.alert(
      'Confirmar',
      'Se sair, será necessário esta conecta do internet para acessar novamente! ',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => {}
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => signOut()
        }
      ]
    )
  }
  
//'https://avatars.githubusercontent.com/u/28610102?v=4'
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack}/>

              <HeaderTitle>Editar Perfil</HeaderTitle>

              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            
            <PhotoContainer>
              {!!avatar &&
                <Photo source={{uri: avatar}} />
              }

              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name="camera" size={24} color={theme.colors.shape}/>
              </PhotoButton>
            </PhotoContainer>

          </Header>      
      
          <Content style={{ marginBottom: useBottomTabBarHeight()}}>
            <Options>
                <Option 
                  active={option === 'dataEdit'}
                  onPress={() => handleOptionChange('dataEdit')}
                >
                  <OptionTitle 
                    active={option === 'dataEdit'}
                  >Dados</OptionTitle>
                </Option>
                
                <Option 
                  active={option === 'passwordEdit'}
                  onPress={() => handleOptionChange('passwordEdit')}
                >
                  <OptionTitle 
                    active={option === 'passwordEdit'}
                  >Trocar Senha</OptionTitle>
                </Option>

              </Options>

            { option === 'dataEdit' ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={driverLicense}
                  onChangeText={setDriverLicense}
                />
              </Section>
             ) : ( 
              <Section style={{height: 125}}>
                <InputPassword
                  iconName="lock"
                  placeholder="Senha"
                />
                <InputPassword
                  iconName="lock"
                  placeholder="Confirme senha"
                />
              </Section>
            )}

            <Button 
              title="Salvar alterações"
              color={theme.colors.main}
              style={{marginTop: 15}}
              onPress={handleProfileUpdate}
            />

          </Content>
        </Container>
        </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
}