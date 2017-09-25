// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import cx from 'classnames';

import Header from 'containers/Header';
import Footer from 'components/Footer';
import OverlayMenu from 'components/OverlayMenu';

import { closeOverlayMenu } from 'containers/App/sagas';

type Props = {
  children: React.Element<any>,
  replace: Function,
  location: Object,
  overlayMenuOpen: boolean,
  closeOverlayMenu: Function,
};

class App extends Component {
  props: Props
  render() {
    const { children, location, overlayMenuOpen } = this.props;
    return (
      <div className={cx({ 'no-scroll': overlayMenuOpen })}>
        <Header
          replace={this.props.replace}
          pathname={location.pathname}
        />
        {React.Children.toArray(children)}
        <Footer />
        {
          overlayMenuOpen && <OverlayMenu closeMenu={this.props.closeOverlayMenu} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  overlayMenuOpen: state.getIn(['app', 'overlayMenuOpen']),
});

const mapDispatchToProps = (dispatch) => ({
  replace: (path) => dispatch(replace(path)),
  closeOverlayMenu: () => dispatch(closeOverlayMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

