import {
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/flexBetween";
import { Formik } from "formik";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CustomScnackbar from "components/CustomScnackbar";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
  location: yup.string().required("Locations is required"),
  occupation: yup.string().required("Occupation is required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const Register = () => {
  const { palette } = useTheme();
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const [apiResponse, setApiSeponse] = useState({ isLoading: false, msg: "" });

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    if (!savedUser?.error) {
      onSubmitProps.resetForm();
    }
    return savedUser;
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    setApiSeponse({ isLoading: true, msg: "" });
    const res = await register(values, onSubmitProps);
    setApiSeponse({ isLoading: false, msg: res?.error || "" });
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 4" }}
              />
              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                p="1rem"
                borderRadius="5px"
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{
                        "&:hover": { cursor: "pointer" },
                      }}
                    >
                      <input {...getInputProps()}></input>
                      {!values.picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{values.picture.name}</Typography>
                          <EditOutlinedIcon />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
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
            {/* Buttons */}
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
                {"REGISTER"}
              </Button>
              <Link
                underline="none"
                onClick={() => {
                  navigate("/");
                  resetForm();
                }}
                sx={{
                  textDecoration: "undefined",
                  color: palette.primary.main,
                  cursor: "pointer",
                }}
              >
                Already have an account? Login here.
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

export default Register;
