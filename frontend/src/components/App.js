import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header  from '../components/Header.js';
import Footer from '../components/Footer.js';
import api from '../utils/api.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import ProtectedPage from './ProtectedPage.js';
import { registration, authorization, getUserData } from '../utils/auth.js';
import Login from './Login.js';
import Register from './Register.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isDeletPopupOpen, setIsDeletPopupOpen] = useState(false);
  const [isDemand, setIsDemand] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);


  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] =useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [deletCardId, setDeletCardId] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletPopupOpen(false);
    setIsImagePopup(false);
    setIsInfoTooltip(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletPopupClick(cardId) {
    setDeletCardId(cardId);
    setIsDeletPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
  }

  function handleUpdateUser(dataProfile) {
    setIsDemand(true);
    api.setInfoProfile(dataProfile, localStorage.token)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();

      })
      .catch(err => console.error('Ошибка редактирования профиля: ', err.message))
      .finally(() => setIsDemand(false));
  }

  function handleUpdateAvatar(dataAvatar) {
    console.log(dataAvatar);
    setIsDemand(true);
    api.setAvatar(dataAvatar, localStorage.token)
      .then(res => {
        console.log(res);
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.error('Ошибка редактирования аватара: ', err.message))
      .finally(() => setIsDemand(false));
  }

  function handleCardDelet(evt) {
    evt.preventDefault();
    setIsDemand(true);
    api.deletCard(deletCardId, localStorage.token)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deletCardId
        }));
        closeAllPopups();
      })
      .catch(err => console.error('Ошибка при удалении карточки: ', err.message))
      .finally(() => setIsDemand(false));
  }

  function handleLike(card) {
    console.log(card);
    const isLike = card.likes.some(item => item._id === currentUser._id);
    console.log(isLike);
    if (isLike) {
      api.deletLike(card._id, localStorage.token)
        .then(res => {
          setCards(state => state.map((c) => c._id === card._id ? res : c))
        })
        .catch(err => console.error('Ошибка при отмене лайка: ', err.message))
    } else {
      api.addLike(card._id, localStorage.token)
      .then(res => {
        setCards(state => state.map((c) => c._id === card._id ? res : c))
      })
      .catch(err => console.error('Ошибка при установке лайка: ', err.message))
    }
  }

  function handleAddPlaceSubmit(dataCard) {
    setIsDemand(true);
    console.log(dataCard);
    api.addCard(dataCard, localStorage.token)
     .then((res) => {
       setCards([res, ...cards])
       closeAllPopups();
     })
     .catch(err => console.error('Ошибка при добавлении карточки: ', err.message))
     .finally(() => setIsDemand(false));
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfo(localStorage.token), api.getInitialCards(localStorage.token)])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
      })
      .catch(err => console.error('Ошибка загрузки страницы: ', err.message))
    }
  }, [loggedIn])

  function handleRegister(email, password) {
    setIsDemand(true);
    registration(email, password)
      .then(() => {
        setIsInfoTooltip(true)
        setIsSuccess(true)
        navigate('/sign-in')
      })
      .catch((err) => {
        setIsInfoTooltip(true)
        setIsSuccess(false)
        console.error('Ошибка регистрации: ', err.message)
      })
      .finally(() => setIsDemand(false))
  }

  function handleLogin(email, password) {
    setIsDemand(true);
    authorization(email, password)
      .then(res => {
        localStorage.setItem('token', res.token)
        setLoggedIn(true)
        navigate('/')
      })
      .catch((err) => {
        setIsInfoTooltip(true)
        setIsSuccess(false)
        console.error('Ошибка авторизации: ', err.message)
      })
      .finally(() => setIsDemand(false))
  }

  useEffect(() => {
    if (localStorage.token) {
      getUserData(localStorage.token)
        .then((res) => {
          setUserEmail(res.email)
          setLoggedIn(true)
          navigate('/')
        })
        .catch((err) => console.error('Ошибка авторизации при повторном входе: ', err.message))
    } else {
      setLoggedIn(false)
    }
  }, [navigate])

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="wrapper">
          <Routes>
            <Route path='/' element={
              <ProtectedRouteElement
                element = {ProtectedPage}
                userEmail = {userEmail}
                onEditAvatar = {handleEditAvatarClick}
                onEditProfile = {handleEditProfileClick}
                onAddPlace = {handleAddPlaceClick}
                onCardClick = {handleCardClick}
                onPopupDelet = {handleDeletPopupClick}
                cards = {cards}
                onCardLike = {handleLike}
                isDemand = {isDemand}
                loggedIn = {loggedIn}
              />
            } />
            <Route path='/sign-in' element={
              <>
                <Header name='signin' />
                <Login
                  name='signin'
                  title = 'Вход'
                  titleBtn = 'Войти'
                  isDemand = {isDemand}
                  handleLogin = {handleLogin}
                  isInfoTooltip = {isInfoTooltip}
                />
              </>
            } />
            <Route path='/sign-up' element={
              <>
                <Header name='signup' />
                <Register
                  name='signup'
                  title = 'Регистрация'
                  titleBtn = 'Зарегистрироваться'
                  isDemand = {isDemand}
                  handleRegister = {handleRegister}
                  isInfoTooltip = {isInfoTooltip}
                />
              </>
            } />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
          <Footer />
        </div>

        <EditProfilePopup
          isOpen = {isEditProfilePopupOpen}
          onClose = {closeAllPopups}
          onUpdateUser = {handleUpdateUser}
          isDemand = {isDemand}
        />

        <EditAvatarPopup
          isOpen = {isEditAvatarPopupOpen}
          onClose = {closeAllPopups}
          onUpdateAvatar = {handleUpdateAvatar}
          isDemand = {isDemand}
        />

        <AddPlacePopup
          isOpen = {isAddPlacePopupOpen}
          onClose = {closeAllPopups}
          onAddPlace = {handleAddPlaceSubmit}
          isDemand = {isDemand}
        />

        <PopupWithForm
          name = 'delet'
          title = 'Вы уверены?'
          titleBtn = 'Да'
          isOpen = {isDeletPopupOpen}
          onClose = {closeAllPopups}
          onSubmit = {handleCardDelet}
          isDemand = {isDemand}
        />

        <ImagePopup
          card = {selectedCard}
          isOpen = {isImagePopup}
          onClose = {closeAllPopups}
        />

        <InfoTooltip
          isSuccess = {isSuccess}
          isOpen = {isInfoTooltip}
          onClose = {closeAllPopups}
        />
    </CurrentUserContext.Provider>
  );
}

export default App;
