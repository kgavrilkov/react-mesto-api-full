/* eslint-disable consistent-return */
const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
    })
    .catch(next);
}

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.remove();
        res.status(200).send({ message: 'Карточка удалена' });
      }
      throw new BadRequestError('Нельзя удалить чужую карточку');
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: card });
      // res.status(200).send({ message: 'Лайк проставлен' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
      return next(new NotFoundError('Карточка не найдена'));
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: card });
      // res.status(200).send({ message: 'Лайк удалён' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
      return next(new NotFoundError('Карточка не найдена'));
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
