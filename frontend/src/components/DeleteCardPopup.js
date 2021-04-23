import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({isOpen, onClose}) {
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <PopupWithForm isOpen={isOpen} name="remove-card" title="Вы уверены?" 
    onClose={onClose} buttonText='Да' onSubmit={handleSubmit}></PopupWithForm>
  );
}

export default DeleteCardPopup;