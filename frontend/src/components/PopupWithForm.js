import React from 'react';

function PopupWithForm({name, isOpen, title, children, onClose, buttonText='Сохранить', onSubmit, onCloseEsc, onCloseOverlay}) {
  React.useEffect(() => {
    if (isOpen) {document.addEventListener("keydown", onCloseEsc)}
    return (() => {document.removeEventListener("keydown", onCloseEsc)})
  })
  
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onCloseOverlay}>
      <div className="popup__container">
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          <h2 className="popup__heading">{title}</h2>
          {children}
          <button type="submit" className="button popup__button" 
          onClick={onClose}>{buttonText}</button>
        </form>
        <button type="button" className="button popup__close" aria-label="close" 
        onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;