import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, onCloseEsc, onCloseOverlay}) {
  const [name, setName]=React.useState('');
  const [description, setDescription]=React.useState('');
  const currentUser=React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);}
    return;
  }, [isOpen, currentUser]);
  
  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    })
    setName('');
    setDescription('');
  }

  return (
    <PopupWithForm isOpen={isOpen} name="edit-profile" title="Редактировать профиль" 
    onClose={onClose} onCloseEsc={onCloseEsc} onCloseOverlay={onCloseOverlay} onSubmit={handleSubmit}>
      <label className="popup__label">
        <input id="name-input" className="popup__input popup__input_type_name"
        type="text" name="name" value={name} onChange={handleNameChange} 
        required placeholder="Имя" minLength="2" maxLength="40" />
        <span id="name-input-error" className="popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input id="job-input"className="popup__input popup__input_type_job"
        type="text" name="about" value={description} onChange={handleDescriptionChange} 
        required placeholder="О себе" minLength="2" maxLength="200" />
        <span id="job-input-error" className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;