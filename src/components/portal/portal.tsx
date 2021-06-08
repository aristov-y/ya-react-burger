import React from 'react';
import usePortal from '../../hooks/use-portal';
import { createPortal } from 'react-dom';

type Props = {
  id: string;
}

function Portal({ id, children }: React.PropsWithChildren<Props>): JSX.Element {
  const target = usePortal(id);
  return createPortal(
    children,
    target
  )
}

export default Portal;
