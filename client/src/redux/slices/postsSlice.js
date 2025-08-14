// src/redux/slices/postsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Загрузка всех постов (ленты)
export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAll',
  /**
   * @param {{ page?: number, limit?: number, search?: string }} params
   */
  async ({ page = 1, limit = 5, search = '' } = {}, thunkAPI) => {
    try {
      const response = await api.get('/posts', {
        params: {
          startPage: page,
          perPage: limit,
          ...(search ? { search } : {})
        },
      });
      // console.log(response.data.posts.reverse())
      return response.data; // { posts, postsQuantity }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.statusText ||
        err.message ||
        'Неизвестная ошибка';
      console.error('Ошибка загрузки постов:', err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Создание нового поста
export const createPost = createAsyncThunk(
  'posts/create',
  // теперь payload — FormData
  async (formData, thunkAPI) => {
    try {
      const response = await api.post('/posts', formData, {
        headers: {
          // Не забудьте: axios сам подставит нужный boundary  
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Тоггл лайка
export const toggleLikePost = createAsyncThunk(
  'posts/toggleLikePost',
  async (postId, thunkAPI) => {
    try {
      const response = await api.patch(`/posts/${postId}`);
      return response.data; // обновлённый пост
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.statusText ||
        err.message ||
        'Неизвестная ошибка';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Загрузка постов конкретного пользователя
export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async ({ userId, page = 1, limit = 5 }, thunkAPI) => {
    try {
      const { data } = await api.get('/posts', {
        params: {
          startPage: page,
          perPage: limit,
          user: userId,
        },
      });
      // data = { posts: Post[], postsQuantity: number }
      return { ...data, page };
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Неизвестная ошибка';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    isPosting: false,
    isError: false,
    error: null,

    userItems: [],
    userTotal: 0,
    isUserLoading: false,
    userError: null,
  },
  reducers: {
    // здесь можно добавить sync-экшены
  },
  extraReducers: builder => {
    builder
      // fetchAllPosts
      .addCase(fetchAllPosts.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        const { page = 1 } = action.meta.arg || {};
        state.isLoading = false;
        state.isError = false;
        state.error = null;

        if (page === 1) {
          state.items = action.payload.posts;
        } else {
          state.items = [...state.items, ...action.payload.posts];
        }
        state.total = action.payload.postsQuantity;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })

      // createPost
      .addCase(createPost.pending, state => {
        state.isPosting = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.isPosting = false;
        state.items.unshift(payload);
        state.total += 1;

        state.userItems.unshift(payload);
        state.userTotal += 1;
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.isPosting = false;
        state.isError = true;
        state.error = payload;
      })

      // toggleLikePost
      .addCase(toggleLikePost.fulfilled, (state, { payload: updatedPost }) => {
        const patch = (arr) => {
          const i = arr.findIndex(p => p._id === updatedPost._id);
          if (i !== -1) arr[i] = { ...arr[i], ...updatedPost };
        };
        patch(state.items);      // фид
        patch(state.userItems);  // профиль
      })
      .addCase(toggleLikePost.rejected, (state, { payload }) => {
        state.isError = true;
        state.error = payload;
      })

      // fetchUserPosts
      .addCase(fetchUserPosts.pending, state => {
        state.isUserLoading = true;
        state.userError = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, { payload }) => {
        const { posts, postsQuantity, page } = payload;
        const ordered = posts.slice().reverse();
        state.isUserLoading = false;

        if (page === 1) {
          state.userItems = ordered;
        } else {
          state.userItems = [...state.userItems, ...ordered];
        }
        state.userTotal = postsQuantity;
      })
      .addCase(fetchUserPosts.rejected, (state, { payload }) => {
        state.isUserLoading = false;
        state.userError = payload;
      });
  },
});

export default postsSlice.reducer;

