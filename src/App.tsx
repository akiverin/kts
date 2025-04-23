import { Outlet } from 'react-router';
import Header from './components/Header/Header';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
