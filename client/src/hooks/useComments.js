// src/hooks/useComments.js
import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchCommentsByPost, createComment } from '../redux/slices/commentsSlice';
import { makeSelectCommentsByPost } from '../redux/selector/commentsSelectors';

export function useComments(postId) {
  const dispatch = useDispatch();
  const selectCommentsByPost = useMemo(makeSelectCommentsByPost, []);
  const comments = useSelector(
    state => selectCommentsByPost(state, postId),
    shallowEqual
  );
  const isLoading = useSelector(state => state.comments.isLoading);
  const error     = useSelector(state => state.comments.error);

  // вместо эффекта — экпортируем лоадер  
  const loadComments = useCallback(() => {
    dispatch(fetchCommentsByPost(postId));
  }, [dispatch, postId]);

  const [newComment, setNewComment] = useState('');
  const submit = useCallback(async e => {
    e.preventDefault();
    if (!newComment.trim()) return;
    await dispatch(createComment({ postId, content: newComment })).unwrap();
    setNewComment('');
    // по желанию можно обновить список сразу после создания
    dispatch(fetchCommentsByPost(postId));
  }, [dispatch, newComment, postId]);

  return { comments, isLoading, error, newComment, setNewComment, submit, loadComments };
}
