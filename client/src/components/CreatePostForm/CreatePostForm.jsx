// src/components/CreatePostForm/CreatePostForm.jsx
import { useRef } from 'react';
import { FiCamera, FiX } from 'react-icons/fi';
import styles from './CreatePostForm.module.scss';
import useCreatePost from '../../hooks/useCreatePost';

const CreatePostForm = () => {
  const {
    content,
    setContent,
    files,
    setFiles,
    previews,
    removeFile,
    canSubmit,
    isPosting,
    isError,
    error,
    handleSubmit,
  } = useCreatePost();

  const fileInputRef = useRef(null);

  const handleFilesChange = e => {
    setFiles(Array.from(e.target.files));
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form className={styles.postForm} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        placeholder="What’s on your mind?"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={3}
      />

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={triggerFileSelect}
          aria-label="Select images"
        >
          <FiCamera size={20} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          className={styles.fileInput}
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          style={{ display: 'none' }}
        />

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!canSubmit || isPosting}
        >
          {isPosting ? 'Posting…' : 'Post'}
        </button>
      </div>

      {isError && <p className={styles.error}>{error}</p>}

      {previews.length > 0 && (
        <div className={styles.previewsWrapper}>
          {previews.map(({ id, url }) => (
            <div key={id} className={styles.preview}>
              <img src={url} alt="File preview" className={styles.previewImg} />
              <button
                type="button"
                className={styles.removeFileBtn}
                onClick={() => removeFile(id)}
              >
                <FiX size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default CreatePostForm;