import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeleteCardPopup from './DeleteCardPopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';     

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]=React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]=React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]=React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen]=React.useState(false);
  const [selectedCard, setSelectedCard]=React.useState();
  const [currentUser, setCurrentUser]=React.useState({name: '', about: ''});
  const [cards, setCards]=React.useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen]=React.useState(false);
  const [isInfoTooltipType, setIsInfoTooltipType]=React.useState(true);
  const [loggedIn, setLoggedIn]=React.useState(false);
  const initialData={email: '', password: ''};
  const [data, setData]=React.useState(initialData);
  const history=useHistory();

  const tokenCheck = React.useCallback(() => {
    const token=localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setData(res); 
            history.push('/main');
          }
        })
        .catch(() => history.push('/signin'));
    }
  }, [history])

  React.useEffect(() => {
    tokenCheck();
  }, [tokenCheck, loggedIn]);

  const handleRegister = ({email, password}) => {
    return auth.register(email, password).then(res => {
      if (!res || res.statusCode===400) {
        new Error('Что-то пошло не так!');
      }
      if (res) {
      handleInfoTooltipClick();
      setIsInfoTooltipType(true);
      history.push('/signin');
      return res;
      }
    })
    .catch((err) => {
      handleInfoTooltipClick();
      setIsInfoTooltipType(false);
    });
  }

  const handleLogin = ({email, password}) => {
    return auth.authorize(email, password).then(res => {
      if (!res || res.statusCode===400) {
        new Error('Что-то пошло не так!');
      }
      if (res.token) {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        history.push('/main');
        return res;
      }
    })
    .catch((err) => {
      handleInfoTooltipClick();
      setIsInfoTooltipType(false);
    });
  }
  
  React.useEffect(() => {
    const token=localStorage.getItem('token');
    api.getUserInfo(token)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => console.log(`Ошибка в информации о пользователе: ${err}`));
  }, [loggedIn]);

  React.useEffect(() => {
    const token=localStorage.getItem('token');
    api.getInitialCards(token)
      .then((cardData) => {
        setCards(cardData);
      })
      .catch(err => console.log(`Ошибка при загрузке карточек: ${err}`));
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked=card.likes.some(item => item===currentUser._id);

    api.changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards=cards.map((c) => c._id===newCard.data._id ? newCard.data : c);
        setCards(newCards);
      })
      .catch(err => console.log(`Ошибка в статусе лайка: ${err}`)); 
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id!==card._id));
      })
      .catch(err => console.log(`Ошибка при удалении карточки: ${err}`));
  }
   
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleInfoTooltipClick() {
    setIsInfoTooltipOpen(true);
  }

  function handleUpdateUser(info) {
    api.setUserInfo(info)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => console.log(`Ошибка обновления информации о пользователе: ${err}`));
  }

  function handleUpdateAvatar(info) {
    api.setUserAvatar(info)
      .then((data) => {
        setCurrentUser(data); 
      })
      .catch(err => console.log(`Ошибка обновления аватара: ${err}`));
  }

  function handleAddPlaceSubmit(info) {
    api.addCard(info)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch(err => console.log(`Ошибка добавления карточки: ${err}`));
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setData(initialData);
    setLoggedIn(false);
    history.push('/signin');
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard();
    setIsInfoTooltipOpen(false);
  }

  const handleEscClick = (evt) => {
    if (evt.key==="Escape") {
      closeAllPopups();
    }
  }

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
            <Header 
              loggedIn={loggedIn} 
              userEmail={data.email} 
              onSignOut={handleSignOut} 
            />
            <Switch>
              <ProtectedRoute path="/main" 
                component={Main}
                loggedIn={loggedIn} 
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                cards={cards}
              />
              <Route path="/signin">
                <Login
                  onLogin={handleLogin}
                />
              </Route>
              <Route path="/signup">
                <Register
                  onRegister={handleRegister} 
                />
              </Route>
              <Route>
                {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
              </Route>
            </Switch>
            <Footer />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              onCloseEsc={handleEscClick}
              onCloseOverlay={handleOverlayClick} 
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              onCloseEsc={handleEscClick}
              onCloseOverlay={handleOverlayClick} 
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              onCloseEsc={handleEscClick}
              onCloseOverlay={handleOverlayClick}
            />
            <ImagePopup
              isOpen={isImagePopupOpen}
              card={selectedCard} 
              onClose={closeAllPopups}
              onCloseEsc={handleEscClick}
              onCloseOverlay={handleOverlayClick}
            />
            <DeleteCardPopup
              onClose={closeAllPopups}
            />
            <InfoTooltip
              isRegistered={isInfoTooltipType}
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups} 
            />
        </div>  
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
