import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import { userStore } from 'entities/user/stores/userStoreInstance';
import Text from 'components/Text';
import Button from 'components/Button';
import styles from './Profile.module.scss';

const Profile: React.FC = observer(() => {
  const navigate = useNavigate();
  const user = userStore.user;

  if (!user) {
    return (
      <div className={styles.profile}>
        <Text view="title" weight="bold">
          You are not logged in.
        </Text>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <div className={styles['profile__wrapper']}>
        <Text view="title" tag="h1" weight="bold">
          Profile
        </Text>
        <div className={styles['profile__details']}>
          <div className={styles['profile__field']}>
            <Text view="p-16" weight="bold">
              Username:
            </Text>
            <Text view="p-16">{user.username}</Text>
          </div>
          <div className={styles['profile__field']}>
            <Text view="p-16" weight="bold">
              Email:
            </Text>
            <Text view="p-16">{user.email}</Text>
          </div>
          <div className={styles['profile__field']}>
            <Text view="p-16" weight="bold">
              Provider:
            </Text>
            <Text view="p-16">{user.provider}</Text>
          </div>
          <div className={styles['profile__field']}>
            <Text view="p-16" weight="bold">
              Account Created:
            </Text>
            <Text view="p-16">{new Date(user.createdAt).toLocaleDateString()}</Text>
          </div>
        </div>
        <div className={styles['profile__actions']}>
          <Button onClick={() => userStore.logout()}>Logout</Button>
        </div>
      </div>
    </div>
  );
});

export default Profile;
