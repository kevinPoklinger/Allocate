/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import FontFaceObserver from 'fontfaceobserver';

import store from 'createStore';

// Import styles
import 'styles/all.scss';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/App/selectors';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';
import 'file-loader?name=[name].[ext]!./robots.txt';
import 'file-loader?name=[name].[ext]!pace-js/pace.min.js';
/* eslint-enable import/no-unresolved, import/extensions */

// Import root routes
import createRoutes from './routes';

// Observe loading of web font (to remove it, remove the <link> tag in
// the index.html file and this observer)
const primaryFontObserver = new FontFaceObserver('Lato', {});
// When the font is loaded, add a font-family to the body
primaryFontObserver.load().then(() => {
  document.body.classList.add('primaryFontLoaded');
}, () => {
  document.body.classList.remove('primaryFontLoaded');
});

const secondaryFontObserver = new FontFaceObserver('Gentium Basic', {});
secondaryFontObserver.load().then(() => {
  document.body.classList.add('secondaryFontLoaded');
}, () => {
  document.body.classList.remove('secondaryFontLoaded');
});

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router
        history={history}
        routes={createRoutes(store)}
        render={
          // Scroll to top when going to a new page, imitating default browser
          // behaviour
          applyRouterMiddleware(useScroll())
        }
      />
    </div>
  </Provider>,
  document.getElementById('app')
);

if (navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
    });
    if (registrations && registrations.length) {
      window.location.reload(true);
    }
  });
}
