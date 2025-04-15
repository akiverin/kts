import React, { useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Text from 'components/Text';
import Button from 'components/Button';
import styles from './RegistrationPage.module.scss';
import { UserStore } from 'entities/user/stores/UserStore';
import Loader from 'components/Loader';
import Input from 'components/Input';
import { Link } from 'react-router';

const RegistrationPage: React.FC = observer(() => {
  const userStore = useLocalObservable(() => new UserStore());
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await userStore.register(username, email, password);
    if (success) {
      window.location.href = '/';
    }
  };

  return (
    <div className={styles['registration-page']}>
      <div className={styles['registration-page__wrapper']}>
        <form onSubmit={handleSubmit} className={styles['registration-page__form']}>
          <Text view="title" tag="h1" weight="bold">
            Registration
          </Text>
          <Text view="p-18">
            If you have an account, please{' '}
            <Link to="/login" className={styles['registration-page__link']}>
              login
            </Link>
            .
          </Text>
          <div className={styles['registration-page__form-group']}>
            <label htmlFor="identifier">Username</label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(value) => setUsername(value)}
              placeholder="Enter your username"
            />
          </div>
          <div className={styles['registration-page__form-group']}>
            <label htmlFor="identifier">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(value) => setEmail(value)}
              placeholder="Enter your email"
            />
          </div>
          <div className={styles['registration-page__form-group']}>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(value) => setPassword(value)}
              placeholder="Enter your password"
            />
          </div>
          {userStore.meta === 'loading' && <Loader />}
          {userStore.meta === 'error' && (
            <Text view="p-16" color="accent">
              {userStore.error}
            </Text>
          )}
          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
});

export default RegistrationPage;
