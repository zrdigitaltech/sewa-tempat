'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserFromSession } from '@/redux/action/auth/creator';

export default function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginUserFromSession());
  }, []);

  return null;
}
