// @flow

import React from 'react';
import { generate } from 'shortid';
import { Link } from 'react-router';
import FooterLink from './FooterLink';

import './styles.scss';


const AllLinks = [
  {
    title: 'ALLOCATE.IO',
    links: [
      {
        subtitle: 'Product',
        link: '',
      },
      {
        subtitle: 'Pricing',
        link: '',
      },
      {
        subtitle: 'About Us',
        link: '',
      },
      {
        subtitle: 'Careers',
        link: '',
      },
      {
        subtitle: 'Blog',
        link: '',
      },
    ],
  },
  {
    title: 'SUPPORT',
    links: [
      {
        subtitle: 'Contact Us',
        link: '',
      },
      {
        subtitle: 'Help Center',
        link: '',
      },
      {
        subtitle: 'Terms',
        link: '',
      },
      {
        subtitle: 'Privacy policy',
        link: '',
      },
    ],
  },
  {
    title: 'STAY IN TOUCH',
    links: [
      {
        subtitle: 'Twitter',
        link: '',
      },
      {
        subtitle: 'Facebook',
        link: '',
      },
      {
        subtitle: 'Stack Overflow',
        link: '',
      },
      {
        subtitle: 'LinkedIn',
        link: '',
      },
    ],
  },
];

const Footer = () => (
  <div className="footer">
    <div className="row">
      <div className="footer__linkGroup small-12 medium-6 medium-offset-6 column hide-for-small-only">
        <div className="row">
          {
            AllLinks.map((piece) => (<FooterLink className="footer__links"
              key={generate()}
              data={piece}
            />))
          }
          <p className="footer__rights hide-for-small-only">© Allocate.ai 2016-2017. All rights reserved.</p>
        </div>
      </div>

      <div className="footer__linkGroup small-12 medium-6 column show-for-small-only">
        <div className="row">
          <FooterLink className="footer__links"
            key={generate()}
            data={AllLinks[0]}
          />
          <FooterLink className="footer__links"
            key={generate()}
            data={AllLinks[1]}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
