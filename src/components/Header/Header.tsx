import { userStore } from 'entities/user/stores/userStoreInstance';
import styles from './Header.module.scss';
import Text from 'components/Text';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';
import { useLocation } from 'react-router';
import Profile from 'components/icons/Profile';
import Favorite from 'components/icons/Favorite';
import Auth from 'components/icons/Auth';
import Logo from 'components/icons/Logo';
import { useState } from 'react';

const Header: React.FC = observer(() => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__map}>
          <Link className={styles['header__link-logo']} to="/" onClick={closeMenu}>
            <Logo height={36} width={36} />
            <Text view="p-20" weight="bold">
              Food Client
            </Text>
          </Link>
          <button
            className={`${styles.burger} ${isMenuOpen ? styles.burger_open : ''}`}
            onClick={toggleMenu}
            aria-label="Открыть меню"
          >
            <span className={styles.burger__line} />
            <span className={styles.burger__line} />
            <span className={styles.burger__line} />
          </button>
        </div>

        <nav className={`${styles.header__navigate} ${isMenuOpen ? styles.active : ''}`}>
          <ul className={styles['header__nav-list']}>
            {[
              { to: '/', label: 'Recipes' },
              { to: '/categories', label: 'Meals Categories' },
              { to: '/products', label: 'Products' },
            ].map(({ to, label }) => (
              <li key={to} className={styles['header__nav-item']}>
                <Link className={styles.header__link} to={to} onClick={closeMenu}>
                  <Text
                    view="p-16"
                    color={location.pathname === to ? 'accent' : 'primary'}
                    weight={location.pathname === to ? 'bold' : 'normal'}
                  >
                    {label}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.header__actions}>
          <Link className={styles['header__icon-link']} to="/favorites">
            <p className="visuallyHidden">Список сохраненных рецептов</p>
            <Favorite />
          </Link>
          {userStore.user ? (
            <Link className={styles['header__icon-link']} to="/profile">
              <p className="visuallyHidden">Профиль</p>
              <Profile />
            </Link>
          ) : (
            <Link className={styles['header__icon-link']} to="/login">
              <p className="visuallyHidden">Авторизация</p>
              <Auth />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
