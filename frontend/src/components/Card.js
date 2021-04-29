import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardDelete, onCardLike}) {
  const currentUser=React.useContext(CurrentUserContext);
  
  const isOwn=card.owner===currentUser._id;

  const cardDeleteButtonClassName=(
    `card__delete ${isOwn ? 'card__delete_visible' : 'card__delete_invisible'}`
  );

  const isLiked=card.likes.some(item => item._id===currentUser._id);

  const cardLikeButtonClassName=(
    `card__like ${isLiked ? 'card__like_active' : 'card__like'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <article className="card">
      <div className="card__image" style={{backgroundImage: `url(${card.link})`}} 
      onClick={handleClick}></div>
      <div className="card__item">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__item-like">
          <button type="button" className={cardLikeButtonClassName} aria-label="score" 
          onClick={handleLikeClick}></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button type="button" className={cardDeleteButtonClassName} aria-label="delete" 
      onClick={handleDeleteClick}></button>
    </article>
  );    
}

export default Card;