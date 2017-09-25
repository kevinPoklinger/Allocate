// @flow

// Rules on how to organize this file: https://github.com/erikras/ducks-modular-redux

import { fromJS } from 'immutable';
import type { Action, State } from 'types/common';

// ------------------------------------
// Constants
// ------------------------------------
const OPEN_NAVBAR = 'Allocate/App/OPEN_NAVBAR';
const CLOSE_NAVBAR = 'Allocate/App/CLOSE_NAVBAR';
const OPEN_OVERLAYMENU = 'Allocate/App/OPEN_OVERLAYMENU';
const CLOSE_OVERLAYMENU = 'Allocate/App/CLOSE_OVERLAYMENU';
// ------------------------------------
// Actions
// ------------------------------------
export const openNavbar = () => ({
  type: OPEN_NAVBAR,
});

export const closeNavbar = () => ({
  type: CLOSE_NAVBAR,
});

export const openOverlayMenu = () => ({
  type: OPEN_OVERLAYMENU,
});

export const closeOverlayMenu = () => ({
  type: CLOSE_OVERLAYMENU,
});
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  navbarOpen: false,
  overlayMenuOpen: false,
});

export const reducer = (state: State = initialState, { type }: Action) => {
  switch (type) {
    case OPEN_NAVBAR:
      return state
        .set('navbarOpen', true);

    case CLOSE_NAVBAR:
      return state
        .set('navbarOpen', false);

    case OPEN_OVERLAYMENU:
      return state
        .set('overlayMenuOpen', true);

    case CLOSE_OVERLAYMENU:
      return state
        .set('overlayMenuOpen', false);

    default:
      return state;
  }
};

export default [];
