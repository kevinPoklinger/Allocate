// @flow

import React, { Component } from 'react';
import { generate } from 'shortid';
import cx from 'classnames';

import Link from 'components/Link';
import DropdownMenu from 'components/DropdownMenu';
import MenuItem from 'components/Header/MainMenu/MenuItem';
import line from '../line.png';

import './styles.scss';

type Props = {
  data: Array<Object>,
  text: string,
  link: string,
  className?: string,
}

class HeaderDropdownMenu extends Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
    };
  }

  state: Object
  props: Props

  render() {
    const { data, text, link, className } = this.props;
    const mergedClassName = cx('headerDropdownMenu', className);
    return (
      <DropdownMenu
        toggle={
          <MenuItem
            onMouseOver={() => {
              this.setState({ isMenuOpen: !this.state.isMenuOpen });
            }}
            text={text}
            link={link}
            containerClassName={false}
          />
        }
        isOpen={this.state.isMenuOpen}
        close={() => this.setState({ isMenuOpen: false })}
        textAlign="left"
        menuAlign="center"
        size="md"
        className={mergedClassName}
      >
        { data.map(({ link: itemLink, text: itemText, icon: itemIcon }) => (
          <li key={generate()}>
            <Link
              to={itemLink}
              className="headerDropdownMenu__link"
              activeClassName="headerDropdownMenu__link--active"
            >
            <img className="headerDropdownMenu__link--icon" src={itemIcon}/>{itemText}</Link>
          </li>
        ))}
      </DropdownMenu>
    );
  }
}

export default HeaderDropdownMenu;
