import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, 
onCardLike, onCardDelete}) {
  const currentUser=React.useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__avatar" onClick={onEditAvatar} 
        style={{backgroundImage: `url(${currentUser.avatar})`}}></div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" className="button button_type_edit" aria-label="edit" 
          onClick={onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="button button_type_add" aria-label="add" 
        onClick={onAddPlace}></button>
      </section>
      <section className="cards content__cards">
        {cards.map((card) => {
          return (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete} 
          />)
        })}
      </section>
    </main>
  );
}

export default Main;