export { default } from './Content.tsx';
export * from './Content.tsx';

import React, { useCallback, useEffect, useState } from 'react';
import styles from './Content.module.scss';
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import Card from 'components/Card';
import Pagination from 'components/Paganation';
import Loader from 'components/Loader';

import timeIcon from 'assets/timeIcon.svg';
import { Link } from 'react-router';
import { Recipe } from 'entities/recipe/types';
import { getPaginatedRecipes } from 'entities/recipe/api';
