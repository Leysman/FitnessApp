import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Thunk для получения всех пользователей
export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/users');
      return data; // ожидаем массив пользователей
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message || 'Ошибка загрузки пользователей'
      );
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],        // список пользователей
    isLoading: false, // флаг загрузки
    error: null       // сообщение об ошибке
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = Array.isArray(payload.users)
          ? payload.users
          : [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default usersSlice.reducer;