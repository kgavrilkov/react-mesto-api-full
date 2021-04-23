import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import logoPath from '../images/logo.svg';

function Header({userEmail, onSignOut, loggedIn}) {
  const [isHeaderContainerOpen, setIsHeaderContainerOpen]=React.useState();
  const [isHeaderContainerMobileClose, setIsHeaderContainerMobileClose]=React.useState();

  function open() {
    setIsHeaderContainerOpen(true);
    setIsHeaderContainerMobileClose(true);
  }

  function close() {
    setIsHeaderContainerOpen(false);
    setIsHeaderContainerMobileClose(false);
  }

  return (
    <Switch>
      <Route path="/main">
        <header className="header page__header">
          <div className={`header__container ${isHeaderContainerOpen && 'header__container_opened'}`}>
            <img className="logo header__logo" src={logoPath} alt="Логотип" />
            <ul className="header__list">
              {loggedIn && <li className="header__list-item">{userEmail}</li>} 
              <li className="header__list-item">
                <button type="button" className="button header__button" onClick={onSignOut}>Выйти</button>
              </li>
            </ul>
            <button type="button" className="button header__close-menu" 
            onClick={close} aria-label="close"></button>
          </div>
          <div className={`header__container header__container-mobile ${isHeaderContainerMobileClose && 'header__container-mobile_closed'}`}>
            <img className="logo header__logo" src={logoPath} alt="Логотип" />
            <button type="button" className="button header__open-menu" 
            onClick={open} aria-label="open"></button>
          </div>
        </header>
      </Route>
      <Route path="/signin">
        <header className="header page__header">
          <div className="header__container header__container_type_login">
            <img className="logo header__logo" src={logoPath} alt="Логотип" />
            <ul className="header__list header__list_type_login"> 
              <li className="header__list-item header__list-item_type_login">
                <Link className="header__link" to="/signup">Регистрация</Link>
              </li>
            </ul>
          </div>
        </header>
      </Route>
      <Route path="/signup">
        <header className="header page__header">
          <div className="header__container header__container_type_login">
            <img className="logo header__logo" src={logoPath} alt="Логотип" />
            <ul className="header__list header__list_type_login"> 
              <li className="header__list-item header__list-item_type_login">
                <Link className="header__link" to="/signin">Войти</Link>
              </li>
            </ul>
          </div>
        </header>
      </Route>
    </Switch>  
  );
}

export default Header;