import React, { createContext,  useState, useContext, ReactNode, useEffect } from 'react';

import { api } from '../services/api';

import { database } from '../database';
import { User as ModelUser } from '../database/model/User';
//import { Car as ModelCar } from '../database/model/Car';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthContexData {
  user: User;
  signOut: () => Promise<void>;
  signIn: ( credencials: SignInCredencials ) => Promise<void>,
  updatedUser: (user: User) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContexData>({} as AuthContexData);

function AuthProvider({ children }: AuthProviderProps){
  const [ data, setData ] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredencials) {

    try {
      const response = await api.post('/sessions',{
        email,
        password
      });
  
      const { token, user } = response.data;
    
      api.defaults.headers.authorization = `Bearer ${token}`;

      /**Salvando dados no banco dados do smatphone */
      const userCollection = database.get<ModelUser>('users') 
      
      await database.action(async () => {
        await userCollection.create((newUser) => {
          newUser.token = token,
          newUser.user_id = user.id,
          newUser.name = user.name,
          newUser.email = user.email,
          newUser.avatar = user.avatar,
          newUser.driver_license = user.driver_license
        });
      });

      setData({ ...user, token });

    } catch (error) {
      console.log('ERROS')
      console.log(error.message)
      throw new Error(error)
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>('users');
      
      await database.action(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User);

    } catch (error) {
      throw new Error(error);
    }
  }

  async function updatedUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>('users');

      await database.action(async () => {
        const userSelected = await userCollection.find(user.id);

        await userSelected.update((userData) => {
          userData.name = user.name,
          userData.driver_license = user.driver_license,
          userData.avatar = user.avatar
        });
      });

      setData(user);

    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      
      //const carsCollection = database.get<ModelCar>('cars');
      //carsCollection.query().destroyAllPermanently();
      //userCollection.query().destroyAllPermanently();*/
      
      const userCollection = database.get<ModelUser>('users');

      const response = await userCollection.query().fetch();

      if(response.length > 0) {
        const userData = response[0]._raw as unknown as User; //forçando a typagem - atribuindo null e depois a typagem

        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData)
      }
    }

    loadUserData();
  },[]);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
        updatedUser
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth}
