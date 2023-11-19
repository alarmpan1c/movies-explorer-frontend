import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { transformMoviesArray } from "../../utils/helpers";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
// import Footer from '../Footer/Footer';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Layout from "../Layout/Layout";
import Menu from "../Menu/Menu";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../context/CurrentUserContexts";
import ResultPopup from "../ResultPopup/ResultPopup";

import lucky from "../../images/lucky.png";
import unlucky from "../../images/unlucky.png";

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem("jwt") ? true : false
  );
  const navigate = useNavigate();
  const [dataSavedMovies, setDataSavedMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isResultPopupOpen, setIsResultPopupOpen] = React.useState(false);
  const [isLucky, setIsLucky] = React.useState(null);
  const [shortDataSavedMovies, setShorDataSavedMovies] = React.useState([]);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const login = ({ email, password }) => {
    setIsLoading(true);
    mainApi
      .authorization({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
        if (err === '401') {
          setIsLucky(false);
          setIsResultPopupOpen(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const register = ({ email, password, name }) => {
    setIsLoading(true);
    mainApi
      .registration({ email, password, name })
      .then((res) => {
        login({ email, password });
      })
      .catch((err) => {
        console.log(err);
        if (err === '409') {
          setIsLucky(false);
          setIsResultPopupOpen(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
    setIsLoggedIn(false);
  };

  const checkLogin = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi
        .getInfo(token)
        .then((res) => {
          console.log(res);
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          if (err === '401') {
            logout();
            setIsLucky(false);
            setIsResultPopupOpen(true);
          }
        });
    }
  };

  const saveMovie = (movie, reLike, likes) => {
    // setIsLoading(true);
    mainApi
      .addLikeonServer(movie, localStorage.getItem("jwt"))
      .then((res) => {
        reLike([...likes, res]);
      })
      .catch((err) => {
        console.log(err);
        if (err === '401') {
          logout();
          setIsLucky(false);
          setIsResultPopupOpen(true);
        }
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  // function reLike(makeNewArrey, res) {
  //   makeNewArrey([...dataSavedMovies, res]);
  // }

  function findMovieId(movie) {
    const foundMovie = dataSavedMovies.find(
      (item) => item.movieId === movie.id
    );
    return foundMovie ? foundMovie._id : null;
  }

  const deleteMovie = (movie) => {
    // setIsLoading(true);
    const _id = movie._id || findMovieId(movie);
    mainApi
      .deleteLikeonServer(_id, localStorage.getItem("jwt"))
      .then((res) => {
        console.log(res);
        setDataSavedMovies(
          dataSavedMovies.filter((movie) => movie._id !== _id)
        );
        setShorDataSavedMovies(
          shortDataSavedMovies.filter((movie) => movie._id !== _id)
        );
      })
      .catch((err) => {
        console.log(err);
        if (err === '401') {
          logout();
          setIsLucky(false);
          setIsResultPopupOpen(true);
        }
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const editProfile = ({ name, email }) => {
    setIsLoading(true);
    mainApi
      .editInfoOnServer({ name, email }, localStorage.getItem("jwt"))
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        setIsLucky(true);
      })
      .catch((err) => {
        setIsLucky(false);
        console.log(err);
        if (err === '401') {
          logout();
        }
      })
      .finally(() => {
        setIsLoading(false);
        setIsResultPopupOpen(true);
      });
  };

  const closeResultPopup = () => {
    setIsResultPopupOpen(false);
  };

  function isMovieInSavedMovies(movie) {
    const idToCheck = movie.id || movie.movieId;

    return dataSavedMovies.some(
      (savedMovie) => savedMovie.movieId === idToCheck
    );
  }

  useEffect(() => {
    setIsLoading(true);
    isLoggedIn &&
    Promise.all([
      mainApi.getSavedMovies(localStorage.getItem("jwt")),
    ])
      .then(([
        savedMoviesResponse, 
      ]) => {
        setDataSavedMovies(savedMoviesResponse);
        setShorDataSavedMovies(savedMoviesResponse.filter((film) => film.duration < 40))
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLucky(false);
        console.error(error);
        if (error === '401') {
          logout();
        }
        setIsResultPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    checkLogin();
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {/* <Header isLoggedIn = {false}  /> */}
        <Routes>
          <Route
            element={
              <Layout
                openMenu={openMenu}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
              />
            }
          >
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies
                    // dataMovies={dataMovies}
                    // setDataMovies={setDataMovies}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                    isMovieInSavedMovies={isMovieInSavedMovies}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    dataSavedMovies={dataSavedMovies}
                    setDataSavedMovies={setDataSavedMovies}
                    // shortDataMovies={shortDataMovies}
                    // setShorDataMovies={setShorDataMovies}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                    dataSavedMovies={dataSavedMovies}
                    isMovieInSavedMovies={isMovieInSavedMovies}
                    isLoading={isLoading}
                    shortDataSavedMovies={shortDataSavedMovies}
                    setDataSavedMovies={setDataSavedMovies}
                  />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} /> */}
          <Route
            path="/signin"
            element={<Login onLogin={login} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header isLoggedIn={isLoggedIn} openMenu={openMenu} />
                  <Profile logout={logout} editProfile={editProfile} isLoggedIn={isLoggedIn} />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Register onRegister={register} isLoggedIn={isLoggedIn} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {isMenuOpen && <Menu isOpen={isMenuOpen} onClose={closeMenu} />}
        <ResultPopup
          isOpen={isResultPopupOpen}
          onClose={closeResultPopup}
          lucky={isLucky ? lucky : unlucky}
          title={isLucky ? "Вы успешно изменили данные!" : "Что-то пошло не так"}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
