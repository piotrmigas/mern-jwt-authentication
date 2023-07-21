import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <ToastContainer hideProgressBar />
      <div className='my-2'>
        <Outlet />
      </div>
    </>
  );
}

export default App;
