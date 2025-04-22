export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  foods: {
    mask: '/foods',
    create: () => '/foods',
  },
  food: {
    mask: '/foods/:documentId',
    create: (documentId: string) => `/foods/${documentId}`,
  },
  categories: {
    mask: '/categories',
    create: () => '/categories',
  },
  products: {
    mask: '/products',
    create: () => '/products',
  },
  favorites: {
    mask: '/favorites',
    create: () => '/favorites',
  },
  login: {
    mask: '/login',
    create: () => '/login',
  },
  register: {
    mask: '/register',
    create: () => '/register',
  },
  profile: {
    mask: '/profile',
    create: () => '/profile',
  },
};
