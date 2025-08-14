import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Thunk для получения полного профиля по ID
export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.statusText    ||
        err.message                 ||
        'Неизвестная ошибка';
        
      console.error('Ошибка входа:', err);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  thunk для обновления профиля пользователя
export const updateUser = createAsyncThunk(
  'user/update',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(
        `/users`,      // или просто '/users', если вы без :id
        data,                // сюда приходит FormData
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message || 'Неизвестная ошибка'
      );
    }
  }
);

//  thunk для смены пароля пользователя
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ currentPassword, newPassword }, thunkAPI) => {
    try {
      const response = await api.put('/users/update-password', {
        password: currentPassword,
        newPassword
      });
      return response.data.message; // например строка «Password updated»
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

//  thunk для подписки на юзера 
export const followUser = createAsyncThunk(
  'user/follow',
  async (userId, thunkAPI) => {
    try {
      const response = await api.put(`/users/followers/${userId}`);
      return response.data; // возвращает обновлённый профиль текущего юзера
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Ошибка при подписке';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  thunk для отписки на юзера 
export const unfollowUser = createAsyncThunk(
  'user/unfollow',
  async (userId, thunkAPI) => {
    try {
      const response = await api.delete(`/users/followers/${userId}`);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Ошибка при отписке';
      return thunkAPI.rejectWithValue(message);
    }
  }
);



const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    isLoading: false,
    error: null,

    isUpdating: false,
    updateError: null,

    isChangingPassword: false,
    changePasswordError: null,
    changePasswordSuccess: null,
  },
  reducers: {
    clearProfile: state => {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      // Получение профиля пользователя
      .addCase(fetchUserById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Обновление профиля пользователя
      .addCase(updateUser.pending, state => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.profile = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload;
      })

      // Смена пароля пользователя
      .addCase(changePassword.pending, state => {
        state.isChangingPassword = true;
        state.changePasswordError = null;
        state.changePasswordSuccess = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isChangingPassword = false;
        state.changePasswordSuccess = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isChangingPassword = false;
        state.changePasswordError = action.payload;
      })

      // ——— подписка
      .addCase(followUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.profile = payload;
      })
      .addCase(followUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // ——— отписка
      .addCase(unfollowUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.profile = payload;
      })
      .addCase(unfollowUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  }
});

export const { clearProfile } = userSlice.actions;
export default userSlice.reducer;