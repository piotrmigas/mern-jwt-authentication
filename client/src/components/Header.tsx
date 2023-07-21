import { useNavigate } from 'react-router-dom';
import { selectUserInfo, logout } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../redux/api';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const userInfo = useSelector(selectUserInfo);
  const { pathname } = useLocation();

  const navigation = [
    ...(userInfo
      ? [{ name: 'User Profile', href: '/profile', current: pathname === '/profile' }]
      : [
          { name: 'Register', href: '/register', current: pathname === '/register' },
          { name: 'Login', href: '/login', current: pathname === '/login' },
        ]),
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall(undefined).unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                    alt='avatar'
                  />
                </div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`${
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        } rounded-md px-3 py-2 text-sm font-medium`}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {userInfo && (
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 text-gray-300'>
                  <div>
                    Logged as <span className='text-white'>{userInfo.name}</span>
                  </div>
                  <ArrowLeftOnRectangleIcon className='h-7 w-7 ml-5 cursor-pointer' onClick={logoutHandler} />
                </div>
              )}
            </div>
          </div>
          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={`${
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } block rounded-md px-3 py-2 text-base font-medium`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
