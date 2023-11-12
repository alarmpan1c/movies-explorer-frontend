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
  const [dataMovies, setDataMovies] = React.useState([]);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem("jwt") ? true : false
  );
  const [jwt, setJwt] = React.useState(localStorage.getItem("jwt") || "");
  const navigate = useNavigate();
  const [dataSavedMovies, setDataSavedMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isResultPopupOpen, setIsResultPopupOpen] = React.useState(false);
  const [isLucky, setIsLucky] = React.useState(false);
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
        console.log(res);
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
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
        console.log(res);
        login({ email, password });
      })
      .catch((err) => {
        console.log(err);
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
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const saveMovie = (movie) => {
    // setIsLoading(true);
    mainApi
      .addLikeonServer(movie, jwt)
      .then((res) => {
        console.log(res, "мы тут");
        setDataSavedMovies([...dataSavedMovies, res]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

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
      .deleteLikeonServer(_id, jwt)
      .then((res) => {
        console.log(res);
        setDataSavedMovies(
          dataSavedMovies.filter((movie) => movie._id !== _id)
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const editProfile = ({ name, email }) => {
    console.log({ name, email });
    setIsLoading(true);
    mainApi
      .editInfoOnServer({ name, email }, jwt)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        setIsLucky(true);
      })
      .catch((err) => {
        setIsLucky(false);
        console.log(err);
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
    const fetchData = async () => {
      try {
        const [moviesResponse, savedMoviesResponse, userInfoResponse] =
          await Promise.all([
            moviesApi.getMovies(),
            mainApi.getSavedMovies(jwt),
            mainApi.getInfo(localStorage.getItem("jwt")),
          ]);
        console.log(savedMoviesResponse);
        setDataMovies(moviesResponse);
        setDataSavedMovies(transformMoviesArray(savedMoviesResponse));
        setCurrentUser(userInfoResponse);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   checkLogin();
  // }, []);

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
                    dataMovies={dataMovies}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                    isMovieInSavedMovies={isMovieInSavedMovies}
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
                  <Profile logout={logout} editProfile={editProfile} />
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
