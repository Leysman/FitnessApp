import styles from './HeaderProfile.module.scss';
import avatarSrc from '../../../assets/icons/avatars.svg';
import { useSelector } from 'react-redux';


const HeaderProfile = () => {

  const { firstName, lastName, avatarUrl, email, followers, followedBy } = useSelector(state => state.user.profile);


  return (
    <section className={styles.header}>
      <img
        className={styles.avatar}
        src={avatarUrl || avatarSrc}
        alt="User avatar"
      />
      <div className={styles.info}>
        <h1 className={styles.name}>{`${firstName} ${lastName}`}</h1>

        <p className={styles.email}>{email}</p>
        <div className={styles.stats}>
          <div className={styles.wrapperFollowers}>
            <span className={styles.label}>Followers</span>
            <span className={styles.number}>{followers.length}</span>
          </div>
          <div className={styles.wrapperFollowers}>
            <span className={styles.label}>Following</span>
            <span className={styles.number}>{followedBy.length}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeaderProfile;