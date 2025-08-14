// src/redux/slices/commentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// получить комментарии к конкретному посту
export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetchByPost',
  async (postId, thunkAPI) => {
    try {
      const { data } = await api.get(`/comments/post/${postId}`);
      // контроллер возвращает массив comment
      return { postId, comments: data };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// создать новый комментарий
export const createComment = createAsyncThunk(
  'comments/create',
  async ({ postId, content }, thunkAPI) => {
    try {
      // бэкенд в addComment ожидает { post, content } в body
      const { data } = await api.post(`/comments`, { post: postId, content });
      return { postId, comment: data };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    byPost: {},      // хранит массивы комментариев по key=postId
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // загрузка
      .addCase(fetchCommentsByPost.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.byPost[payload.postId] = payload.comments;
      })
      .addCase(fetchCommentsByPost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // создание
      .addCase(createComment.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const prev = state.byPost[payload.postId] || [];
        state.byPost[payload.postId] = [...prev, payload.comment];
      })
      .addCase(createComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  }
});

export default commentsSlice.reducer;
