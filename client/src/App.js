import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register/Register";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./context/AuthContext";
import { Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home/Home";
import Sell from "./pages/Sell/Sell";
import List from "./pages/List/List";
import { useState, useEffect } from "react";
import Item from "./pages/Item/Item";
import Footer from "./components/Footer/Footer";
import ReactGA from "react-ga";

const theme = createTheme({
  typography: {
    fontFamily: ["Zen Maru Gothic", "sans-serif"].join(","),
  },
});

function usePageViews() {
  let location = useLocation();
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize("UA-223100136-2");
      window.GA_INITIALIZED = true;
    }
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location]);
}

function App() {
  usePageViews();

  const [list, setList] = useState(null);
  const [original, setOriginal] = useState(null);
  const [change, setChange] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("authTokens");
    if (token) {
      token = JSON.parse(token).access;
    }
    let url;
    if (token) {
      // access = JSON.parse(access).access;
      url = `https://trabify.herokuapp.com/books/?access=${token}/`;
    } else {
      url = `https://trabify.herokuapp.com/books/`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        setOriginal(data);
      });
    // .catch(err => console.log('Some error occurred'))
  }, [change]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Navbar list={list} setList={setList} original={original} />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="/sell"
              element={
                <PrivateRoute>
                  <Sell change={change} setChange={setChange} />
                </PrivateRoute>
              }
            />
            <Route
              path="/list"
              element={<List list={list} setList={setList} />}
            />
            <Route
              path="/list/:id"
              element={<Item change={change} setChange={setChange} />}
            />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
