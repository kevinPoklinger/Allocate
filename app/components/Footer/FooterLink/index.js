// @flow

import React, { Component } from 'react';
import { generate } from 'shortid';
import { Link } from 'react-router';

import './styles.scss';

type Props = {
  data: object,
};

const FooterLink = ({ data }: Props) => {
  return (
    <div className="footerLink small-5 medium-4 column">
      <p className="footerLink__title">{data.title}</p>
      <div>
        {
          data.links.map((link) => (<div
            className="footerLink__link row"
            key={generate()}
          >
            <Link
              className="footerLink__a"
            >
              {link.subtitle}
            </Link>
          </div>))
        }
      </div>
    </div>
  );
};

export default FooterLink;
