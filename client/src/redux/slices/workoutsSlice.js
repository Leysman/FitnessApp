import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';


// POST /api/workouts
export const addWorkout = createAsyncThunk(
  "workouts/add",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/workouts");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Thunk для получения всех тренировок для вошедшего в систему пользователя
export const fetchWorkouts = createAsyncThunk(
  "workouts/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/workouts");
      return data; // array of { _id, user, date }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const workoutsSlice = createSlice({
  name: "workouts",
  initialState: {
    items: [],       // array of workout records
    isLoading: false,
    error: null,
  },
  reducers: {
    clearWorkouts: state => {
      state.items = null;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      // addWorkout
      .addCase(addWorkout.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addWorkout.fulfilled, (state, { payload }) => {
        state.items.unshift(payload);
        state.isLoading = false;
      })
      .addCase(addWorkout.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // fetchWorkouts
      .addCase(fetchWorkouts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWorkouts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(fetchWorkouts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
export const { clearWorkouts } = workoutsSlice.actions;
export default workoutsSlice.reducer;