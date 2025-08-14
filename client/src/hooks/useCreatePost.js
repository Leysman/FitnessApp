import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/slices/postsSlice';

const useCreatePost = () => {
  const dispatch = useDispatch();
  const { isPosting, isError, error } = useSelector(state => state.posts);

  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [files, setFiles] = useState([]);

  // Генерируем preview URL для выбранных файлов
  const previews = useMemo(
    () => files.map(file => ({ id: file.name, url: URL.createObjectURL(file) })),
    [files]
  );

  const canSubmit =
    content.trim().length > 0 || imageUrl.trim().length > 0 || files.length > 0;

  const reset = useCallback(() => {
    setContent('');
    setImageUrl('');
    setShowUrlInput(false);
    setFiles([]);
  }, []);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      if (!canSubmit) return;

      const formData = new FormData();
      formData.append('content', content.trim());
      if (imageUrl) {
        formData.append('images', imageUrl.trim());
      }
      files.forEach(file => formData.append('images', file));

      try {
        await dispatch(createPost(formData)).unwrap();
        reset();
      } catch (err) {
        console.error('Ошибка при создании поста:', err);
      }
    },
    [dispatch, content, imageUrl, files, canSubmit, reset]
  );

  const removeFile = useCallback(id => {
    setFiles(prev => prev.filter(f => f.name !== id));
  }, []);

  return {
    content,
    setContent,
    imageUrl,
    setImageUrl,
    showUrlInput,
    setShowUrlInput,
    files,
    setFiles,
    previews,
    removeFile,
    canSubmit,
    isPosting,
    isError,
    error,
    handleSubmit,
  };
};

export default useCreatePost;
