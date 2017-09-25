// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openNavbar, closeNavbar, openOverlayMenu } from 'containers/App/sagas';

import Header from 'components/Header';

type Props = {
  replace: Function,
  openOverlayMenu: Function,
}

class HeaderContainer extends Component {
  props: Props
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToPtops = (state) => ({
  navbarOpen: state.getIn(['app', 'navbarOpen']),
});

const mapDispatchToProps = (dispatch) => ({
  openNavbar: () => dispatch(openNavbar()),
  closeNavbar: () => dispatch(closeNavbar()),
  openOverlayMenu: () => dispatch(openOverlayMenu()),
});

export default connect(mapStateToPtops, mapDispatchToProps)(HeaderContainer);
