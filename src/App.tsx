import './App.css';
import { Outlet } from 'react-router';
import TheHeader from './components/TheHeader/TheHeader';

function App() {
  return (
    <>
      <TheHeader />
      <Outlet />
    </>
  );
}

export default App;
