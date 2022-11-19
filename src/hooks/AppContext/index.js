import React from "react";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [selectMovie, setSelectMovie] = React.useState();
  const [visibleMovieModal, setvisibleMovie] = React.useState();

  return (
    <AppContext.Provider
      value={{
        selectMovie: {
          get: selectMovie,
          set: setSelectMovie,
        },
        visibleMovieModal: {
          get: visibleMovieModal,
          set: setvisibleMovie,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
