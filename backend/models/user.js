// имеет ли смысл в данном файле и в card проводить
// проверки параметров, если валидация происходит
// через celebrate?

const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const UnautorizedError = require('../errors/UnautorizedError');
const { urlRegAvatar } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина имени - 2 символа'],
    maxlength: [30, 'Максимальная длина имени - 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Информация о пользователе должна быть длиной не менее 2 символов'],
    maxlength: [30, 'Информация о пользователе должна быть длиной не более 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(url) {
        return (urlRegAvatar.test(url));
      },
      message: 'Ссылка на аватар должна начинаться с http:// или с https://',
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator: (email) => isEmail(email),
      message: 'Введите правильный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnautorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnautorizedError('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
