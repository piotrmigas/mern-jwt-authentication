import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../redux/authSlice';

export default function PrivateRoute() {
  const userInfo = useSelector(selectUserInfo);

  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
}
