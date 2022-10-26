import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import * as Google from 'expo-auth-session/providers/google';
// import * as AuthSession from 'expo-auth-session';

import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  userStorageLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [ user, setUser ] = useState<User>({} as User);
  const [ userStorageLoading, setUserStorageLoading ] = useState(true);

  const [_, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI
  });

  const userStorageKey = '@gofinances:user';

  async function signInWithGoogle() {
    try {
      await promptAsync();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function getGoogleUser(googleCredential: string) {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleCredential}`);

        const userInfo = await response.json();
        console.log(userInfo);
        
        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        });
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
    } catch (error) {
      throw error;
    }
  }

  async function signInWithApple(){
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if(credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if(userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, []);

  useEffect(() => {    
    if(response && response.type === 'success') {
      const { access_token } = response.params;
      getGoogleUser(access_token);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{
      user,
      userStorageLoading,
      signInWithGoogle,
      signInWithApple,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }
