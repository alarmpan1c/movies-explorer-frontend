// const search = () => {
  //   const findShortMovies = dataMovies
  //     .filter((movie) => {
  //       return movie.duration < 40;
  //     })
  //     .filter((movie) => {
  //       return movie.nameRU
  //         .toLowerCase()
  //         .includes(localStorage.getItem("search").toLowerCase());
  //     });
  //   localStorage.setItem("shortMovies", JSON.stringify(findShortMovies));
  //   const findMovies = dataMovies.filter((movie) => {
  //     return movie.nameRU
  //       .toLowerCase()
  //       .includes(localStorage.getItem("search").toLowerCase());
  //   });
  //   const filteredMovies = filterCheckbox ? findShortMovies : findMovies;
  //   setMovies(filteredMovies.length === 0 ? [notFoundItem] : filteredMovies);
  //   localStorage.setItem("movies", JSON.stringify(findMovies));
  // };

  // const changeShortMovie = (isFilterCheckbox) => {
  //   const gettedShortMovies = JSON.parse(localStorage.getItem("shortMovies"));
  //   const gettedMovies = JSON.parse(localStorage.getItem("movies"));
  //   isFilterCheckbox &&
  //     setMovies(
  //       gettedShortMovies.length === 0 ? gettedShortMovies : [notFoundItem]
  //     );
  //   !isFilterCheckbox &&
  //     setMovies(gettedMovies.length === 0 ? gettedMovies : [notFoundItem]);
  // };

  // useEffect(() => {
  //   console.log(text, "текст");
  //   // if (localStorage.getItem("filterCheckbox")) {
  //   //   const filterCheck =
  //   //     localStorage.getItem("filterCheckbox") === "true" ? true : false;
  //   //   setFilterCheckbox(filterCheck);
  //   filterCheckbox &&
  //     setMovies(
  //       JSON.parse(localStorage.getItem("shortMovies")) || [notFoundItem]);
  //   !filterCheckbox &&
  //     setMovies(JSON.parse(localStorage.getItem("shortMovies")) || text
  //     ? [notFoundItem]
  //     : []);
  //   console.log(JSON.parse(localStorage.getItem("shortMovies")));
  //   console.log(JSON.parse(localStorage.getItem("movies")));
  //   // }
  // }, [filterCheckbox]);

  // useEffect(() => {
  //   if (localStorage.getItem("search")) {
  //     setText(localStorage.getItem("search"));
  //   }
  //   const filterCheck =
  //     localStorage.getItem("filterCheckbox") === "true" ? true : false;
  //   setFilterCheckbox(filterCheck);
  // }, []);


  