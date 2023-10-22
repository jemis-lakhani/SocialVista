import React, { useState } from "react";
import {
  Box,
  TextField,
  useMediaQuery,
  useTheme,
  Link,
  Button,
  CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import CustomScnackbar from "components/CustomScnackbar";
// import { Password } from "@mui/icons-material";
// import { isRejectedWithValue } from "@reduxjs/toolkit";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const SignIn = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const [apiResponse, setApiSeponse] = useState({ isLoading: false, msg: "" });
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInResponse.json();
    if (!loggedIn?.msg) {
      onSubmitProps.resetForm();
    }

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
    return loggedIn;
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    setApiSeponse({ isLoading: true, msg: "" });
    const res = await login(values, onSubmitProps);
    setApiSeponse({ isLoading: false, msg: res?.msg || "" });
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesLogin}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          handleBlur,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  display: "flex",
                  gap: 1,
                  m: "2rem 0",
                  p: "1rem 0",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": {
                    color: palette.primary.main,
                    background: palette.primary.light,
                  },
                }}
              >
                {apiResponse?.isLoading ? (
                  <CircularProgress color="inherit" size={14} />
                ) : null}
                {"LOGIN"}
              </Button>
              <Link
                underline="none"
                onClick={() => {
                  navigate("/signup");
                  resetForm();
                }}
                sx={{
                  textDecoration: "undefined",
                  color: palette.primary.main,
                  cursor: "pointer",
                }}
              >
                Don't have an acocunt? Sign Up here.
              </Link>
            </Box>
          </form>
        )}
      </Formik>
      <CustomScnackbar
        open={!!apiResponse?.msg}
        message={apiResponse?.msg}
        variant={"error"}
        handleClose={() => setApiSeponse({ isLoading: false, msg: "" })}
      />
    </>
  );
};

export default SignIn;
