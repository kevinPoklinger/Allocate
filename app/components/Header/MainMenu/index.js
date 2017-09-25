// @flow

import React from 'react';
import { generate } from 'shortid';

import DropdownMenu from './DropdownMenu';
import SubMenu from './SubMenu';
import MenuItem from './MenuItem';

import overviewIcon from './overview.png';
import intelligentIcon from './intelligent.png';
import projectIcon from './project.png';

import './styles.scss';

const items: Array<Object> = [
  {
    text: 'Product',
    children: [
      {
        text: 'Overview',
        link: '/overview',
        icon: overviewIcon,
      },
      {
        text: 'Intelligent Timekeeping',
        link: '/intelligent',
        icon: intelligentIcon,
      },
      {
        text: 'Project Management & Analytics',
        link: '/project',
        icon: projectIcon,
      },
    ],
  },
  {
    text: 'Pricing',
    link: '/pricing',
  },
  {
    text: 'About',
    link: '/about',
  },
];

const MainMenu = () => (
  <div className="mainMenu">
    {items.map(({ text, link, children }) => (
      children ?
        <div
          key={generate()}
          className="mainMenu__item"
        >
          <DropdownMenu
            data={children}
            text={text}
            link={link}
            className="hide-for-small-only"
          />
          <SubMenu
            data={children}
            text={text}
            className="show-for-small-only"
          />
        </div>
      :
        <MenuItem
          text={text}
          link={link}
          linkClassName="mainMenu__link--topLevel"
          key={generate()}
        />
    ))}
  </div>
);

export default MainMenu;
