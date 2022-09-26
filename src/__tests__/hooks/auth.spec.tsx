import { renderHook, act } from '@testing-library/react-hooks';
import { startAsync } from "expo-auth-session";
import fetchMock from 'jest-fetch-mock';
import * as mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import { AuthProvider, useAuth } from '../../hooks/auth';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('expo-auth-session');

fetchMock.enableMocks();

const userTest = {
  id: 'any_id',
  email: 'john.doe@email.com',
  name: 'John Doe',
  photo: 'any_photo.png',
 };

describe('Auth Hook', () => {
  
  it('should be able to sign in with Google account existing', async () => {
    const googleMocked = jest.mocked(startAsync as any);
    googleMocked.mockResolvedValueOnce({
      type: 'success',
      params: {
        accessToken: 'any_token',
      }
    });

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });
  
  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = jest.mocked(startAsync as any);
    googleMocked.mockResolvedValueOnce({
      type: 'cancel',
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('any_id');
  });

  it('should be error with incorrectly Google parameters', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });
    
    try {
      await act(() => result.current.signInWithGoogle());
    } catch (error) {
      expect(result.current.user).toEqual({});
    }
  });
});
