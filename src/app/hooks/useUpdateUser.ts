import { useMutation, useQuery } from '@apollo/client/react';
import { UPDATE_ME, UPDATE_USER } from '../graphql/mutations';
import { GET_ME } from '../graphql/queries';
import { UpdateUserInput, UpdateMeResponse, UpdateUserResponse } from '../types/graphql';
import { useIsClient } from './useIsClient';

// Хук для получения данных текущего пользователя
export const useMe = () => {
  const isClient = useIsClient();
  return useQuery(GET_ME, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    skip: !isClient,
  });
};

// Хук для обновления данных текущего пользователя
export const useUpdateMe = () => {
  const [updateMeMutation, { loading, error }] = useMutation<UpdateMeResponse>(UPDATE_ME, {
    refetchQueries: [GET_ME],
    errorPolicy: 'all',
  });

  const updateMe = async (input: UpdateUserInput) => {
    try {
      const result = await updateMeMutation({
        variables: { input },
      });
      return result.data?.updateMe || null;
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  };

  return {
    updateMe,
    loading,
    error,
  };
};

// Хук для обновления пользователя (админ)
export const useUpdateUser = () => {
  const [updateUserMutation, { loading, error }] = useMutation<UpdateUserResponse>(UPDATE_USER, {
    errorPolicy: 'all',
  });

  const updateUser = async (id: string, input: UpdateUserInput) => {
    try {
      const result = await updateUserMutation({
        variables: { id, input },
      });
      return result.data?.updateUser || null;
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  };

  return {
    updateUser,
    loading,
    error,
  };
};
