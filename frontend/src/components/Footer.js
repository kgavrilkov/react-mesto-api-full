import React from 'react';
import {Route} from 'react-router-dom';

function Footer() {
  return (
    <Route path="/main">
      <footer className="footer page__footer">
        <p className="footer__paragraph">&copy; 2021 Mesto Russia</p>
      </footer>
    </Route>
    
  );
}

export default Footer;