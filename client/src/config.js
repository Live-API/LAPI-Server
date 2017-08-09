import React from 'react';
import { render } from 'react-dom';
//import 'semantic-ui-css/semantic.min.css';
import App from './components/config/app.jsx';

const randomGradient = () => {
  return 'background: #FFAFBD; background: -webkit-linear-gradient(to right, #ffc3a0, #FFAFBD);background: linear-gradient(to right, #ffc3a0, #FFAFBD);'
}
document.getElementById('root').setAttribute('style', randomGradient());

render(
  <App firstTime={firstTime} />,
  document.getElementById('root')
);
