import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// 1) Получить все шаблоны наград (публичные)
export const fetchAwardTemplates = createAsyncThunk(
  'awards/fetchTemplates',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/awards');
      return data;  // array of Award documents
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// 2) Получить награды, полученные текущим пользователем
export const fetchUserAwards = createAsyncThunk(
  'awards/fetchUser',
  async (_, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.id;
      const { data } = await api.get(`/users/${userId}`);
      return data.awards;  // populated Award array
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// 3) Добавить награду текущему пользователю
export const addUserAward = createAsyncThunk(
  'awards/addUser',
  async (awardId, thunkAPI) => {
    try {
      const { data } = await api.put(`/users/awards/${awardId}`);
      return data.awards;  // updated award list
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// 4) Удалить награду у текущего пользователя
export const removeUserAward = createAsyncThunk(
  'awards/removeUser',
  async (awardId, thunkAPI) => {
    try {
      const { data } = await api.delete(`/users/awards/${awardId}`);
      return data.awards;  // updated award list
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const awardsSlice = createSlice({
  name: 'awards',
  initialState: {
    templates: [],    // все доступные шаблоны наград
    items: [],        // награды, полученные пользователем
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // получить шаблоны
      .addCase(fetchAwardTemplates.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAwardTemplates.fulfilled, (state, { payload }) => {
        state.templates = payload;
        state.isLoading = false;
      })
      .addCase(fetchAwardTemplates.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // получить награды пользователя
      .addCase(fetchUserAwards.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserAwards.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(fetchUserAwards.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // добавить награду
      .addCase(addUserAward.fulfilled, (state, { payload }) => {
        state.items = payload;
      })

      // удалить награду
      .addCase(removeUserAward.fulfilled, (state, { payload }) => {
        state.items = payload;
      });
  },
});

export default awardsSlice.reducer;
