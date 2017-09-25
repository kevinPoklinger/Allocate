// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { fromJS } from 'immutable';

import BorderedTitle from 'components/BorderedTitle';

import Img from './404.png';
import './styles.scss';

type Props = {
  replace: Function,
}

class FourOneFourPage extends Component {
  componentDidMount() { this.props.replace('/404'); }
  props: Props
  render() {
    const breadcrumbPath = fromJS([
      {
        link: '',
        title: '404',
      },
    ]);
    return (
      <div>
        <div className="row column text-center notFound">
          <img
            className="notFound__image"
            src={Img}
            alt="Lift 404 Page"
          />
          <BorderedTitle
            centered
            element="h3"
            className="c-secondary mb-lg t-capitalize notFound__title"
          >
            This is not what you are looking for.  Try one of these instead.
          </BorderedTitle>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  replace: (path) => dispatch(replace(path)),
});

export default connect(null, mapDispatchToProps)(FourOneFourPage);
