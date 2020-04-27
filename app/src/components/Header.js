// @flow

import React, {
  useContext,
} from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Store } from 'store';

import classnames from 'utils/classnames';

import words from 'constants/wording';

import logo from 'images/logo.png';
import metamaskLogo from 'images/metamask-logo.png';

import 'styles/Header.scss';

const Header = () => {
  const { pathname } = useLocation();
  const [{ activeAccount }] = useContext(Store);
  const wording = (activeAccount && words.metamask_connected) || words.no_wallet;
  const headerClassnames = classnames('header');
  (pathname === '/' && headerClassnames.add('yellow')) || headerClassnames.remove('yellow');

  const renderHomeLink = () => {
    if (pathname !== '/') {
      return (
        <Link to='/' className='header-logo'>
          <img src={logo} className='logo' alt='drizzle' />
          <h1 className='title' title='Cryptomon'>Cryptomon</h1>
        </Link>
      );
    }
    return null;
  };

  return (
    <div className={headerClassnames.build()}>
      {renderHomeLink()}
      <div className='header-wallet'>
        <img src={metamaskLogo} className='status-badge' alt='metamask' />
        <p>{wording}</p>
      </div>
      <div className='header-nav'>
        <Link to='/my-cryptos'>
          Mes Cryptomons
        </Link>
        <Link to='/me'>
          Mon profil
        </Link>
      </div>
    </div>
  );
};

export default Header;
