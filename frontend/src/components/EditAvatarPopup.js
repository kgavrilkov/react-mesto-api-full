import React  from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, onCloseEsc, onCloseOverlay}) {
  const avatarRef=React.useRef();

  React.useEffect(() => {
    if (!isOpen) return;
    avatarRef.current.value='';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const avatar=avatarRef.current.value;
    onUpdateAvatar({
      avatar: avatar
    })
    avatarRef.current.value='';
  }

  return (
    <PopupWithForm isOpen={isOpen} name="edit-avatar" title="Обновить аватар" 
    onClose={onClose} onCloseEsc={onCloseEsc} onCloseOverlay={onCloseOverlay} onSubmit={handleSubmit}>
      <label className="popup__label">
        <input id="avatar-input" className="popup__input popup__input_type_link"
        type="url" name="avatar" required placeholder="Ссылка на изображение" 
        ref={avatarRef} />
        <span id="avatar-input-error" className="popup__input-error"></span>
      </label>
    </PopupWithForm> 
  );
}

export default EditAvatarPopup;