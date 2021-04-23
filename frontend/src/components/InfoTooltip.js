import React from 'react';
import failPicPath from '../images/failPic.svg';
import successPicPath from '../images/successPic.svg';

function InfoTooltip({isOpen, onClose, isRegistered}) {
  const infoTooltipPic=isRegistered ? successPicPath : failPicPath;
  const infoTooltipText=isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div className={`popup popup_type_tooltip ${isOpen && 'popup_opened'}`}>
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