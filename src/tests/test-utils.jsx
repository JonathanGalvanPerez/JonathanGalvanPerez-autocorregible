// test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './../app/store';
import { BrowserRouter as Router} from 'react-router-dom';

function render(ui, renderOptions = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}><Router>{children}</Router></Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render }