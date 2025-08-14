import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchGoals = createAsyncThunk(
  'goals/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/goals');
      return data;  // [{ _id, title, completed, date }, …]
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Thunk для смены булингого значения completed
export const toggleGoal = createAsyncThunk(
  'goals/toggle',
  async ({ id,  completed }, { dispatch, rejectWithValue }) => {
    try {
      await api.patch(`/goals/${id}`, { completed });
      // перезагрузим список после обновления
      dispatch(fetchGoals());
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// thunk для добавления
export const addGoal = createAsyncThunk(
  'goals/add',
  async (title, { dispatch, rejectWithValue }) => {
    try {
      await api.post('/goals', { title });
      // обновим список
      dispatch(fetchGoals());
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// thunk для удаления цели
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/goals/${id}`);
      // обновим список после удаления
      dispatch(fetchGoals());
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const goalsSlice = createSlice({
  name: 'goals',
  initialState: { 
    items: [], 
    loading: false, 
    error: null 
  },
  reducers: {
    clearGoals: state => {
      state.items = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: builder => builder
    .addCase(fetchGoals.pending, state => {
      state.loading = true; 
      state.error = null;
    })
    .addCase(fetchGoals.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.items = payload;
    })
    .addCase(fetchGoals.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })
});
export const { clearGoals } = goalsSlice.actions;
export default goalsSlice.reducer;
