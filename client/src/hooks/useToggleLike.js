// src/hooks/useToggleLike.js
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLikePost } from '../redux/slices/postsSlice';

export function useToggleLike(postId) {
  const dispatch = useDispatch();

  // ищем пост в обоих массивах
  const post = useSelector(s =>
    s.posts.items.find(p => p._id === postId) ||
    s.posts.userItems.find(p => p._id === postId)
  );

  // id текущего пользователя (может быть _id или id)
  const currentUserId = useSelector(s => s.auth.user?._id || s.auth.user?.id);

  const likesArr = Array.isArray(post?.likes) ? post.likes : [];

  // поддержка строк и объектов вида { _id }
  const likedByMe = useMemo(
    () => likesArr.some(x => String(x?._id || x) === String(currentUserId)),
    [likesArr, currentUserId]
  );

  const likesCount = likesArr.length;

  const toggle = useCallback(() => dispatch(toggleLikePost(postId)), [dispatch, postId]);

  return { likesCount, likedByMe, toggle };
}
