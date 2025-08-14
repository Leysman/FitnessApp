import styles from './AccountPage.module.scss';
import { useState } from 'react';
import usePostUser from '../../hooks/usePostUser';
import PostCardsList from '../../components/PostCardList/PostCardList';
import HeaderProfile from '../../components/Profile/HeaderProfile/HeaderProfile';
import classNames from 'classnames';
import AchievementsContainer from '../../components/AchievementsContainer/AchievementsContainer';
import { FiPlusCircle } from "react-icons/fi";
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';

const AccountPage = () => {
  const [tab, setTab] = useState('Overview');
  const { userPosts, loadMore, isLoading, hasMore} = usePostUser();
  const [showForm, setShowForm] = useState(false);

  
  return (
    <div className={styles.accountPage}>
      <div className={styles.accountCard}>
        <HeaderProfile />

        <nav className={styles.tabs}>
          {['Overview', 'Achievements', 'Posts'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={classNames(styles.btnNavigation, { [styles.active]: tab === t })}
            >
              {t}
            </button>
          ))}
        </nav>

        {tab === 'Overview' && (
        <div className={styles.tabContainer}>
          <section className={styles.achievements}>
            <h2 className={styles.achievementsTitle}>Achievements</h2>
            <AchievementsContainer />
          </section>

          <section className={styles.posts}>

          {showForm  && (<CreatePostForm />)}

          <div className={styles.postTitleWrapper}>
            <h2 className={styles.achievementsTitle}>Posts</h2>

            <button 
                onClick={() => setShowForm(v => !v)}
                aria-label="New post"
              >
                <FiPlusCircle className={styles.openFormBtn}/>
              </button>
          </div>
      

          <div>
            {userPosts.length === 0
            ? <p className={styles.noPosts}>Looks a bit quiet here - why not be the first to share something?</p>
            : <PostCardsList posts={userPosts} profilePosts="profile"/>
            }
          </div>

          
          
          </section>
          
          {/* кнопка «Load More» */}
          {hasMore && (
            <div className={styles.loadMoreWrapper}>
              <button
                type="button"
                onClick={loadMore}
                disabled={isLoading}
                className={styles.loadMoreButton}
              >
                {isLoading ? 'Loading…' : 'Load more'}
              </button>
            </div>
          )}
        </div>
        )}

        {tab === 'Achievements' && 

        <div className={styles.tabContainer}>
          <section className={styles.achievements}>
            <AchievementsContainer />
         </section>
        </div>
          
        }

        {tab === 'Posts' &&
        <div className={styles.tabContainer}>
            <section className={styles.posts}>

              {showForm  && (<CreatePostForm />)}

              <div className={styles.postTitleWrapper}>
                <h2 className={styles.achievementsTitle}>Posts</h2>

                <button 
                    onClick={() => setShowForm(v => !v)}
                    aria-label="New post"
                >
                    <FiPlusCircle className={styles.openFormBtn}/>
                </button>
              </div>
          

              <div>
                {userPosts.length === 0
                ? <p className={styles.noPosts}>Looks a bit quiet here - why not be the first to share something?</p>
                : <PostCardsList posts={userPosts} profilePosts="profile"/>
                }
              </div>
            </section>

            {/* кнопка «Load More» */}
              {hasMore && (
                <div className={styles.loadMoreWrapper}>
                  <button
                    type="button"
                    onClick={loadMore}
                    disabled={isLoading}
                    className={styles.loadMoreButton}
                  >
                    {isLoading ? 'Loading…' : 'Load more'}
                  </button>
                </div>
              )}
        </div>
         

        
        }
                
      </div>
    </div>
    )
};

export default AccountPage;