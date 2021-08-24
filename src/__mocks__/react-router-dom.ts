import * as React from 'react';

const useHistory = jest.fn();
const useLocation = jest.fn();
const useRouteMatch = jest.fn();

const NavLink = ({children}) => React.createElement('div', { 'data-id': 'NavLink'}, children)

export {
  useHistory,
  useLocation,
  useRouteMatch,
  NavLink
}
