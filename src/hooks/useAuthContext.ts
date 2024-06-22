import React from 'react';

import { AuthContext} from '../contexts/authContext';

export function useAuthContext() {
  return React.useContext(AuthContext);
}
