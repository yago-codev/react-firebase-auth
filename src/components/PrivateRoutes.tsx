import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';

type PrivateRoutesProps = {
  children: React.ReactNode;
}

export function PrivateRoutes({ children }: PrivateRoutesProps) {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children;
}
