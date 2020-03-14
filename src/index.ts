import { createElement } from 'react';
import { render } from 'react-dom';
import App from './App';

const element = document.querySelector('main');

if (element) {
  render(createElement(App), element);
}
