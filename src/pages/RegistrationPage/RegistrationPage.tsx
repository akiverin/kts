import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Text from 'components/Text';
import Button from 'components/Button';
import styles from './RegistrationPage.module.scss';
import { userStore } from 'entities/user/stores/userStoreInstance';
import Input from 'components/Input';
import { Link, useNavigate } from 'react-router';
import { RegisterFormStore } from 'entities/user/stores/RegisterFormStore';
import toast from 'react-hot-toast';

const RegistrationPage: React.FC = observer(() => {
  const form = useLocalObservable(() => new RegisterFormStore());
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validateAll()) return;
    const success = await userStore.register(form.username, form.email, form.password);
    if (success) {
      toast.success('Welcome!');
      navigate('/');
      navigate(0);
    } else {
      toast.error(userStore.error || 'Registration failed');
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
              value={form.username}
              onChange={(v) => form.setField('username', v)}
              placeholder="Enter your username"
            />
            {form.errors.username && <Text color="accent">{form.errors.username}</Text>}
          </div>
          <div className={styles['registration-page__form-group']}>
            <label htmlFor="identifier">Email</label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(v) => form.setField('email', v)}
              placeholder="Enter your email"
            />
            {form.errors.email && <Text color="accent">{form.errors.email}</Text>}
          </div>
          <div className={styles['registration-page__form-group']}>
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
            Register
          </Button>
        </form>
      </div>
    </div>
  );
});

export default RegistrationPage;
