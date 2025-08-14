// src/store/commentsSelectors.js
import { createSelector } from '@reduxjs/toolkit';

// базовый селектор по всем комментариям
const selectAllComments = state => state.comments.byPost;

// мемоизированный селектор, который фильтрует по postId
export const makeSelectCommentsByPost = () =>
  createSelector(
    [selectAllComments, (_state, postId) => postId],
     (byPost, postId) => byPost[postId] || []
  );
