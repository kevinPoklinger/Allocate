// @flow

import React, { Component } from 'react';

import Banner from 'components/Banner';
import HowItWorks from 'components/HowItWorks';
import Feature from 'components/Feature';
import Testimonials from 'components/Testimonials';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Banner />
        <HowItWorks />
        <Feature />
        <Testimonials />
      </div>
    );
  }
}

export default HomePage;
