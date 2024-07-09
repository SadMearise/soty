import { Route, Routes } from "react-router-dom";
import { LINKS } from "./utils/constants";
import { RequireAuth } from "./hocs";
import { HomeLayout } from "./layout";
import { useHistoryStack, useLogin } from "./utils/hooks";
import { Album, ContentRestricted, Error, Home, Login, Playlist, Search, SearchWithQuery, Section } from "./pages";
import { CATEGORY_FILTERS } from "./pages/SearchWithQuery/constants";

const initSessionHistoryLength = () => {
  if (!sessionStorage.getItem("startedHistoryLength")) {
    sessionStorage.setItem("startedHistoryLength", `${window.history.length}`);
  }
};

const App = () => {
  const handleLogin = useLogin();
  useHistoryStack();

  initSessionHistoryLength();

  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route
          element={<HomeLayout />}
          path={LINKS.home.route}
        >
          <Route
            element={<Home />}
            path={LINKS.home.route}
          />
          <Route
            element={<Search />}
            path={LINKS.search.route}
          />
          <Route
            element={<SearchWithQuery />}
            path={`${LINKS.search.route}/:query`}
          />
          {CATEGORY_FILTERS.map((filter, index) => (
            <Route
              key={index}
              element={<SearchWithQuery categoryName={filter.name} />}
              path={`${LINKS.search.route}/:query${filter.path}`}
            />
          ))}
          <Route
            element={<Section />}
            path={`${LINKS.section.route}/*`}
          />
          <Route
            element={<Album />}
            path={`${LINKS.album.route}/:id`}
          />
          <Route
            element={<Playlist />}
            path={`${LINKS.playlist.route}/:id`}
          />
          <Route
            element={<ContentRestricted />}
            path={`${LINKS.contentRestricted.route}`}
          />
        </Route>
      </Route>

      <Route
        element={
          <Login
            handleLogin={handleLogin}
            title={LINKS.login.title}
          />
        }
        path={LINKS.login.route}
      />
      <Route
        element={
          <Error
            title="Страница не найдена"
            text="Мы не нашли нужную страницу."
            link={{ route: LINKS.home.route, text: "Главная" }}
          />
        }
        path={LINKS.error.route}
      />
    </Routes>
  );
};

export default App;
