// @flow

import React, { Component } from 'react';
import cx from 'classnames';

import './styles.scss';

type Props = {
  number: number,
  children?: React.Element<any>,
};

class NumberedTitle extends Component {
  props: Props
  render() {
    const { number, children } = this.props;
    return (
      <div className={cx(`numberedTitle numberedTitle--${number} row align-middle`)}>
        <div className="column">
          {children}
        </div>
      </div>
    );
  }
}

export default NumberedTitle;
