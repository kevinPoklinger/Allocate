// @flow

import React from 'react';
import { Link } from 'react-router';

import Button from 'components/Button';

import './styles.scss';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner__inner row">
        <div className="banner__content small-12 large-6 column align-self-middle">
          <p className="banner__title hide-for-small-only">Inteligent Time Keeping and Project Analytics</p>
          <p className="banner__title show-for-small-only">Inteligent Time Keeping<br />&amp;<br />Project Analytics</p>
          <p className="banner__subTitle">Allocate is the easiest way to track time, view project health, and act on insights to drive a more efficient, profitable organization</p>
          <div className="row hide-for-small-only">
            <div className="shrink column">
              <Button
                className="banner__button secondary shadow t-capitalize"
                element={Link}
                to="/how-it-works"
              >
                Get Started!
              </Button>
            </div>
            <p className="banner__or shrink column">or</p>
            <div className="banner__requestContainer column">
              <Link className="banner__request"
                to="/"
              >Request a demo</Link>
            </div>
          </div>
          <div className="show-for-small-only">
            <Button className="banner__button secondary shadow t-capitalize" element={Link} to="/how-it-works">
                Get Started!
            </Button>
            <p className="banner__or row">or</p>
            <Link className="banner__request" to="/">Request a demo</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
