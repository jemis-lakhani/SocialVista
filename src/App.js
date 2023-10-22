import "./App.css";
import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import AnauthWrapper from "components/AnauthWrapper";
import SignIn from "scenes/loginPage/SignIn";
import Register from "scenes/registerPage/Register";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(isAuth);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <HomePage />
            ) : (
              <AnauthWrapper>
                <SignIn />
              </AnauthWrapper>
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuth ? (
              <HomePage />
            ) : (
              <AnauthWrapper>
                <Register />
              </AnauthWrapper>
            )
          }
        />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route
          path="/*"
          element={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography variant="h1">Page Not Found</Typography>
            </Box>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
