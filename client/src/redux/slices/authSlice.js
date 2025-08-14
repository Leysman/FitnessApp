import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { jwtDecode } from 'jwt-decode';
// Инициализация из localStorage для поддержки сохранённого состояния
let userFromStorage = null;

// Пытаемся прочитать и распарсить user из localStorage.
// Используем try/catch, чтобы избежать падения приложения,
// если localStorage пуст, ключ 'user' отсутствует,
// или данные испорчены (например, вручную отредактированы в DevTools).
try {
  const rawUser = localStorage.getItem('user');
  if (rawUser) userFromStorage = JSON.parse(rawUser);
} catch (e) {
  console.error('Ошибка парсинга user из localStorage:', e.message);
}

const tokenFromStorage = localStorage.getItem('token') || null;

const initialState = {
  user: userFromStorage,
  token: tokenFromStorage,
  isLoading: false,
  isError: false,
   error: null,
  isRegister: false,
  awards: [],
}

// Асинхронный thunk для регистрации
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await api.post('/users', userData);
      // response.data — это сразу user
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      return { user };
    } catch (err) {
      const message =
        err.response?.data?.message   ||  // если сервер вернул { message: '...' }
        err.response?.statusText      ||  // если есть только статусText, напр. "Bad Request"
        err.message                   ||  // например "Network Error"
        'Неизвестная ошибка';
      console.error('Ошибка регистрации:', err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Асинхронный thunk для логина
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/users/login', credentials);

      // Извлекаем полезную нагрузку из JWT:
      let rawToken = data.token;
      if (rawToken.startsWith('Bearer ')) {
        rawToken = rawToken.slice(7);         // убираем "Bearer "
      }
      const user = jwtDecode(rawToken);  // user = { id, login, email, … }

      // Сохраняем в localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', rawToken);
      
      return { user, token: rawToken };

    } catch (err) {
      // определяем текст на основе HTTP-статуса
      let message;
      const status = err.response?.status;
      if (status === 400) {
        message = 'Incorrect request. Check the login and password format.';
      } else if (status === 404) {
        message = 'Login or password is incorrect.';
      } else {
        message = err.response?.data?.message
                || err.response?.statusText
                || err.message
                || 'Неизвестная ошибка';
      }
      console.error('Ошибка логина:', err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // регистрация
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })

      // логин
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state) => Boolean(state.auth.token);