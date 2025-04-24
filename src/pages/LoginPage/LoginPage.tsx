import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Text from 'components/Text';
import Button from 'components/Button';
import styles from './LoginPage.module.scss';
import Input from 'components/Input';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { userStore } from 'entities/user/stores/userStoreInstance';

import { LoginFormStore } from 'entities/user/stores/LoginFormStore';

const LoginPage: React.FC = observer(() => {
  const form = useLocalObservable(() => new LoginFormStore());
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validateAll()) {
      const firstError = Object.values(form.errors).find(Boolean);
      if (firstError) toast.error(firstError);
      return;
    }

    const success = await userStore.login(form.identifier, form.password);
    if (success) {
      toast.success('Welcome back!');
      navigate('/');
      // navigate(0);
    } else {
      toast.error(userStore.error || 'Login failed');
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
              value={form.identifier}
              onChange={(v) => form.setField('identifier', v)}
              placeholder="Enter your email or username"
            />
            {form.errors.identifier && <Text color="accent">{form.errors.identifier}</Text>}
          </div>
          <div className={styles['login-page__form-group']}>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(v) => form.setField('password', v)}
              placeholder="Enter your password"
            />
            {form.errors.password && <Text color="accent">{form.errors.password}</Text>}
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
