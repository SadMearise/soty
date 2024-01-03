import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Error from "./pages/Error";
import { LINKS } from "./utils/constants";
import Search from "./pages/Search";
import RequireAuth from "./hocs/RequireAuth";
import HomeLayout from "./layout/HomeLayout";
import useLogin from "./utils/hooks/useLogin";

const App = () => {
  const handleLogin = useLogin();

  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<HomeLayout />}>
          <Route
            element={<Home />}
            path={LINKS.home.route}
          />
          <Route
            element={<Search />}
            path={LINKS.search.route}
          />
        </Route>
      </Route>

      <Route
        element={<Login handleLogin={handleLogin} />}
        path={LINKS.login.route}
      />
      <Route
        element={<Error />}
        path={LINKS.error.route}
      />
    </Routes>
  );
};

export default App;
