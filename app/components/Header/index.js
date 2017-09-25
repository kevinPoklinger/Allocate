// @flow

import React from 'react';
import Link from 'components/Link';

import Button from 'components/Button';

import MainMenu from './MainMenu';
import Logo from './logo.png';
import MLogo from './mlogo.png';
import Hamburger from './hamburger.png';

import './styles.scss';

type Props = {
  openOverlayMenu: Function,
}
const Header = ({ openOverlayMenu }: Props) => ((
  <div className="header">
    <div className="header__inner row align-middle hide-for-small-only">
      <div className="medium-expand column">
        <img
          src={Logo}
          alt="logo"
        />
      </div>
      <div className="column">
        <MainMenu />
      </div>
      <Link className="header__login">
        Login
      </Link>
      <Button
        element="button"
        className="header__getstarted"
      >Get Started!</Button>
    </div>
    <div className="header__inner row align-middle show-for-small-only">
      <div className="header__logo medium-expand column">
        <img
          src={MLogo}
          alt="logo"
        />
      </div>
      <div className="header__overlayMenu shrink column">
        <Link
          onClick={() => openOverlayMenu()}
        >
          <img
            src={Hamburger}
            alt="hamburger"
          />
        </Link>
      </div>
    </div>
  </div>
));

export default Header;
