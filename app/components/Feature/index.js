// @flow

import React, { Component } from 'react';
import { generate } from 'shortid';

import icon1 from './icon1.png';
import icon2 from './icon2.png';
import icon3 from './icon3.png';
import icon4 from './icon4.png';
import icon5 from './icon5.png';
import icon6 from './icon6.png';
import micon1 from './micon1.png';
import micon2 from './micon2.png';
import micon3 from './micon3.png';
import micon4 from './micon4.png';
import micon5 from './micon5.png';
import micon6 from './micon6.png';

import './styles.scss';

const features: Array<Object> = [
  {
    icon: icon1,
    micon: micon1,
    title: 'Accurate timesheets. On Time.',
  },
  {
    icon: icon2,
    micon: micon2,
    title: 'Make better decisions.',
  },
  {
    icon: icon3,
    micon: micon3,
    title: 'Log Time. From Anywhere.',
  },
  {
    icon: icon4,
    micon: micon4,
    title: 'Act when the time is right.',
  },
  {
    icon: icon5,
    micon: micon5,
    title: 'Constantly improving.',
  },
  {
    icon: icon6,
    micon: micon6,
    title: 'Works with the tools you use.',
  },
];

class Feature extends Component {
  render() {
    return (
      <div className="feature">
        <div className="row">
          <div className="small-12 column text-center">
            <p className="feature__title">The Intelligent Time<br /><span className="feature__titleSymbol">&amp;</span><br />Project Management Platform</p>
          </div>
          {features.map((feature) => (
            <div
              className="feature__card small-6 medium-4 column text-center"
              key={generate()}
            >
              <img
                className="feature__icon hide-for-small-only"
                src={feature.icon}
                alt={feature.title}
              />
              <img
                className="feature__icon show-for-small-only"
                src={feature.micon}
                alt={feature.title}
              />
              <p className="feature__cardTitle">{feature.title}</p>
            </div>
          ))}

        </div>
      </div>
    );
  }
}

export default Feature;
