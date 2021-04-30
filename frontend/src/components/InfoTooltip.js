import React from 'react';
import failPicPath from '../images/failPic.svg';
import successPicPath from '../images/successPic.svg';

function InfoTooltip({isOpen, onClose, isRegistered}) {
  const infoTooltipPic=isRegistered ? successPicPath : failPicPath;
  const infoTooltipText=isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";

  React.useEffect(() => {
    if (isOpen) {document.addEventListener("keydown", handleEscClose)}
    return (() => {document.removeEventListener("keydown", handleEscClose)})
  })

  function handleEscClose(evt) {
    if (evt.key==="Escape") {
      onClose();
    }
  }

  function onOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  return (
    <div className={`popup popup_type_tooltip ${isOpen && 'popup_opened'}`} onClick={onOverlayClose}>
      <div className="popup__container popup__container_type_tooltip">
        <div className="popup__form popup__form_type_tooltip">
          <img className="popup__image-tooltip" src={infoTooltipPic} alt="#" />
          <p className="popup__caption-tooltip">{infoTooltipText}</p>
        </div>
        <button type="button" className="button popup__close popup__close_type_tooltip" aria-label="close" 
        onClick={onClose}></button> 
      </div>
    </div>
  );
}

export default InfoTooltip;