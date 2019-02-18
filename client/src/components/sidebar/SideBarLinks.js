import React from 'react';
import { Link } from 'react-router-dom';

export const SideBarLink = ({ target, name, user, icon }) => {
  return (
    <li className="nav-item  mt-1 mb-1">
      <Link to={target}>
        <i className={icon} />
        <span className="text-uppercase">{name}</span>
      </Link>
    </li>
  );
};
