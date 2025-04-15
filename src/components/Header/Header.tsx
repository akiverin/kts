import { userStore } from 'entities/user/stores/userStoreInstance';
import styles from './Header.module.scss';
import Text from 'components/Text';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';
import { useLocation } from 'react-router';

const Header: React.FC = observer(() => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__map}>
          <Link className={styles['header__link-logo']} to="/">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_38_1439)">
                <path
                  d="M17.8586 0.50616C27.521 0.50616 35.3521 8.33832 35.3521 18C35.3521 27.6628 27.521 35.4938 17.8586 35.4938C8.19691 35.4938 0.364746 27.6628 0.364746 18C0.364746 8.33832 8.19691 0.50616 17.8586 0.50616Z"
                  fill="white"
                />
                <path
                  d="M17.7688 33.4343C26.4389 33.4343 33.4674 26.4058 33.4674 17.7358C33.4674 9.06571 26.4389 2.03724 17.7688 2.03724C9.09878 2.03724 2.07031 9.06571 2.07031 17.7358C2.07031 26.4058 9.09878 33.4343 17.7688 33.4343Z"
                  fill="url(#paint0_linear_38_1439)"
                />
                <path
                  d="M18.1897 30.3613C16.3901 28.1578 15.4422 27.0086 15.3479 26.915C14.9918 26.4884 14.3878 25.8966 13.5356 25.1388C13.9144 23.1008 14.4119 21.5143 15.0282 20.3767C15.2647 19.9739 16.2479 18.6473 17.9773 16.3969C18.9252 18.3629 20.2046 19.6895 21.8149 20.3767C22.1695 20.5189 23.6977 20.839 26.3974 21.3368C28.3882 21.7382 29.9876 22.4852 31.1947 23.5753C32.9004 25.114 34.3804 27.6728 35.6357 31.2494C30.5431 28.3831 26.9068 27.3769 24.7284 28.2294C23.7092 28.8457 22.8326 29.331 22.099 29.6863C20.9858 30.2544 19.6826 30.4798 18.1897 30.3613Z"
                  fill="white"
                />
                <path
                  d="M18.7586 12.5953C18.5452 13.9457 18.084 15.0476 17.373 15.8998C16.9698 16.3973 16.1882 17.0845 15.0276 17.9608C12.7056 19.6657 11.0244 21.8689 9.98219 24.5693C8.96375 27.1278 8.70311 29.722 9.20099 32.3518L8.45507 32.4216C7.88591 29.7698 8.12351 27.1516 9.16535 24.5696C10.2313 21.8218 12.0317 19.5232 14.5661 17.6767C15.964 16.6342 16.8762 15.2485 17.3024 13.5198C17.634 12.0989 17.598 10.5466 17.1955 8.86464C16.8881 7.4196 16.378 6.34176 15.6684 5.63148C14.9808 4.9446 14.2939 4.6962 13.6067 4.88556C11.996 5.3118 11.3797 7.3494 11.7595 10.9969C12.1148 14.4554 12.7783 16.6349 13.7489 17.5345C12.778 17.6062 11.9374 16.2796 11.2264 13.5551C10.5391 10.8547 10.4441 8.50932 10.9416 6.51996C11.1551 5.52528 11.617 4.779 12.3272 4.28148C13.417 3.52332 14.6845 3.61836 16.1299 4.56552C17.0771 5.18184 17.7758 6.14088 18.2251 7.44372C18.7705 8.86464 18.9491 10.5822 18.7586 12.5953ZM11.8657 32.6041C10.5157 26.532 11.4276 22.149 14.6021 19.4522C12.4464 24.1394 11.878 28.5473 12.8964 32.6768L11.8657 32.6041Z"
                  fill="white"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_38_1439"
                  x1="15.0424"
                  y1="2.27336"
                  x2="20.4954"
                  y2="33.1986"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#B5460F" />
                  <stop offset="1" stopColor="#B5460F" />
                </linearGradient>
                <clipPath id="clip0_38_1439">
                  <rect width="36" height="36" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <Text view="p-20" weight="bold">
              Food Client
            </Text>
          </Link>
          <nav className={styles.header__navigate}>
            <ul className={styles['header__nav-list']}>
              <li className={styles['header__nav-item']}>
                <Link className={styles.header__link} to="/">
                  <Text
                    view="p-16"
                    color={location.pathname == '/' ? 'accent' : 'primary'}
                    weight={location.pathname == '/' ? 'bold' : 'normal'}
                  >
                    Recipes
                  </Text>
                </Link>
              </li>
              <li className={styles['header__nav-item']}>
                <Link className={styles.header__link} to="/categories">
                  <Text
                    view="p-16"
                    color={location.pathname == '/categories' ? 'accent' : 'primary'}
                    weight={location.pathname == '/categories' ? 'bold' : 'normal'}
                  >
                    Meals Categories
                  </Text>
                </Link>
              </li>
              <li className={styles['header__nav-item']}>
                <Link className={styles.header__link} to="/products">
                  <Text
                    view="p-16"
                    color={location.pathname == '/products' ? 'accent' : 'primary'}
                    weight={location.pathname == '/products' ? 'bold' : 'normal'}
                  >
                    Products
                  </Text>
                </Link>
              </li>
              <li className={styles['header__nav-item']}>
                <Link className={styles.header__link} to="/">
                  <Text view="p-16">Menu Items</Text>
                </Link>
              </li>
              <li className={styles['header__nav-item']}>
                <Link className={styles.header__link} to="/">
                  <Text view="p-16">Meal Planning</Text>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.header__actions}>
          <Link to="/favorites">
            <p className="visuallyHidden">Список сохраненных рецептов</p>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.50001 3.09586C7.80057 0.863387 4.96079 0.173456 2.8315 2.21773C0.702197 4.26201 0.402421 7.67991 2.07457 10.0977C3.46485 12.1079 7.67232 16.3476 9.0513 17.7199C9.20553 17.8734 9.28269 17.9502 9.3727 17.9803C9.45118 18.0066 9.53712 18.0066 9.6157 17.9803C9.70571 17.9502 9.78277 17.8734 9.9371 17.7199C11.3161 16.3476 15.5235 12.1079 16.9138 10.0977C18.586 7.67991 18.3227 4.2405 16.1568 2.21773C13.9909 0.19496 11.1994 0.863387 9.50001 3.09586Z"
                stroke="#B5460F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <Link to="/login">
            <p className="visuallyHidden">Авторизация</p>
            <svg
              id="a5b81eaf-55c4-41bd-86f3-06b0f5373971"
              height={24}
              width={24}
              viewBox="0 0 35 35"
              xmlns="http://www.w3.org/2000/svg"
              fill="#B5460F"
            >
              <path d="M17.052,34.75a1.25,1.25,0,0,1,0-2.5,14.75,14.75,0,0,0,0-29.5,1.25,1.25,0,0,1,0-2.5,17.25,17.25,0,0,1,0,34.5Z" />
              <path d="M19.626,18.75H1.947a1.25,1.25,0,1,1,0-2.5H19.626a1.25,1.25,0,1,1,0,2.5Z" />
              <path d="M13.234,26.438A1.25,1.25,0,0,1,12.35,24.3l6.384-6.385a.593.593,0,0,0,0-.839L12.35,10.7a1.25,1.25,0,1,1,1.767-1.768L20.5,15.313a3.1,3.1,0,0,1,0,4.374l-6.385,6.385A1.246,1.246,0,0,1,13.234,26.438Z" />
            </svg>
          </Link>
          {userStore.user && (
            <Link to="/profile">
              <p className="visuallyHidden">Профиль</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_38_1453)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 13C14.3955 13 16.5753 13.6937 18.1777 14.6715C18.9786 15.1602 19.6621 15.7363 20.156 16.3615C20.642 16.9767 21 17.713 21 18.5C21 19.3449 20.5889 20.0111 19.9973 20.4859C19.4368 20.9359 18.6982 21.2336 17.9128 21.4416C16.3353 21.8593 14.229 22 12 22C9.77101 22 7.66466 21.8593 6.08716 21.4416C5.30182 21.2336 4.56324 20.9359 4.00266 20.4859C3.41114 20.0111 3 19.3449 3 18.5C3 17.713 3.35805 16.9767 3.84397 16.3615C4.33788 15.7363 5.02143 15.1602 5.82227 14.6715C7.42467 13.6937 9.60453 13 12 13ZM12 15C9.97719 15 8.15705 15.5898 6.86402 16.3788C6.21714 16.7735 5.72913 17.2015 5.41339 17.6013C5.08967 18.0111 5 18.3206 5 18.5C5 18.6216 5.03657 18.7512 5.2547 18.9263C5.50376 19.1262 5.93676 19.3328 6.59914 19.5082C7.91706 19.8572 9.81071 20 12 20C14.1893 20 16.0829 19.8572 17.4009 19.5082C18.0632 19.3328 18.4962 19.1262 18.7453 18.9263C18.9634 18.7512 19 18.6216 19 18.5C19 18.3206 18.9103 18.0111 18.5866 17.6013C18.2709 17.2015 17.7829 16.7735 17.136 16.3788C15.8429 15.5898 14.0228 15 12 15ZM12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2ZM12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4Z"
                    fill="#B5460F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_38_1453">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
