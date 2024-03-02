import React from 'react';
import useRoles from '@/hooks/useRoles';

const Authorize = ({ permission, children }) => {
  const { userCan } = useRoles();
  return (
    <>{(userCan(permission) && children)}</>
  );
}

export default Authorize;
