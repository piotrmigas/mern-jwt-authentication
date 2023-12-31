import { useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, setCredentials } from '../redux/authSlice';
import { useUpdateProfileMutation } from '../redux/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector(selectUserInfo);

  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo?.name && userInfo?.email) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo?.email, userInfo?.name]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo?._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
        navigate('/');
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
          className='mx-auto h-10 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt='Your Company'
        />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Update Profile</h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={submitHandler}>
          <div>
            <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>
              Name
            </label>
            <div className='mt-2'>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id='name'
                name='name'
                autoComplete='name'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
              Email address
            </label>
            <div className='mt-2'>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
              Password
            </label>
            <div className='mt-2'>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
              Confirm password
            </label>
            <div className='mt-2'>
              <input
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                autoComplete='current-confirmPassword'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
