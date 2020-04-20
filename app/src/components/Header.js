// @flow

import React, {
  useContext,
} from 'react';
import { Link } from 'react-router-dom';

import { Store } from 'store';

import logo from 'images/logo.png';
import metamaskLogo from 'images/metamask-logo.png';
import 'styles/Header.scss';

const Header = () => {
  const [{ activeAccount }] = useContext(Store);
  const wording = activeAccount && `Metamask connected !` || 'No wallet connected !';

  return (
    <div className='header'>
      <Link to='/' className='header-logo'>
        <img src={logo} className='logo' alt='drizzle' />
        <h1 className='title' title='Cryptomon'>Drizzle Cryptomon</h1>
      </Link>
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
