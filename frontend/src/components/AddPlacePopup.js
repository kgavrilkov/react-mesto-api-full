import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName]=React.useState('');
  const [link, setLink]=React.useState('');

  React.useEffect(() => {
    if (!isOpen) return;
      setName('');
      setLink('');
  }, [isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link
    })
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm isOpen={isOpen} name="add-card" title="Новое место" 
    onClose={onClose} onSubmit={handleSubmit}>
      <label className="popup__label">
        <input id="title-input" className="popup__input popup__input_type_place"
        type="text" name="name" value={name} onChange={handleNameChange} 
        required placeholder="Название" minLength="2" maxLength="30" />
        <span id="title-input-error" className="popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input id="link-input" className="popup__input popup__input_type_link"
        type="url" name="link" value={link} onChange={handleLinkChange} 
        required placeholder="Ссылка на картинку" />
        <span id="link-input-error" className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;