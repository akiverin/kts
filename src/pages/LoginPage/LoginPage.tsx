import React, { useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Text from 'components/Text';
import Button from 'components/Button';
import styles from './LoginPage.module.scss';
import { UserStore } from 'entities/user/stores/UserStore';
import Input from 'components/Input';
import { Link, useNavigate } from 'react-router';

const LoginPage: React.FC = observer(() => {
  const userStore = useLocalObservable(() => new UserStore());
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await userStore.login(identifier, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-page__wrapper']}>
        <form onSubmit={handleSubmit} className={styles['login-page__form']}>
          <Text view="title" tag="h1" weight="bold">
            Login
          </Text>
          <Text view="p-18">
            If you don't have an account, please{' '}
            <Link to="/register" className={styles['login-page__link']}>
              register
            </Link>
            .
          </Text>
          <div className={styles['login-page__form-group']}>
            <label htmlFor="identifier">Username or email</label>
            <Input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(value) => setIdentifier(value)}
              placeholder="Enter your email or username"
            />
          </div>
          <div className={styles['login-page__form-group']}>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(value) => setPassword(value)}
              placeholder="Enter your password"
            />
          </div>
          {userStore.meta === 'error' && (
            <Text view="p-16" color="accent">
              {userStore.error}
            </Text>
          )}
          <Button type="submit" loading={userStore.meta === 'loading'}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
});

export default LoginPage;
