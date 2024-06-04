import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Alert,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { sendOtp, signup } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import { isLength, isEmail, contains } from "validator";
import CheckIcon from '@mui/icons-material/Check';

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const [disableEmail, setDisableEmail] = useState(false);
  const [isAlert, setIsAlert] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    otp: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0) return;

    const data = await signup(formData);

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  const validate = () => {
    const errors = {};

    if (!isLength(formData.username, { min: 4, max: 30 })) {
      errors.username = "Must be between 6 and 30 characters long";
    }

    if (contains(formData.username, " ")) {
      errors.username = "Must contain only valid characters";
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password = "Must be at least 8 characters long";
    }

    if (!isEmail(formData.email)) {
      errors.email = "Must be a valid email address";
    }

    setErrors(errors);

    return errors;
  };

  const handleOtpSend = async (e) => {
    e.preventDefault();

    if (!isEmail(formData.email)) {
      setErrors({ email: "Must be a valid email address" });
      return;
    }

    try {
      const res = await sendOtp(formData.email);
      setDisableEmail(true);
      setIsAlert(true);

      setTimeout(() => {
        setIsAlert(false);
      }, 6000);
    } catch (err) {
      console.log(err);
      setServerError("Failed to send OTP")
    }

  }

  return (
    <Container maxWidth={"xs"} sx={{ mt: { xs: 2, md: 6 } }}>
      <Stack alignItems="center">
        <Typography variant="h2" color="text.secondary" sx={{ mb: 6 }}>
          <Link to="/" color="inherit" underline="none">
            GamersTribe
          </Link>
        </Typography>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Typography color="text.secondary">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            autoFocus
            required
            id="username"
            name="username"
            onChange={handleChange}
            error={errors.username !== undefined}
            helperText={errors.username}
          />
          {isAlert ? <Alert severity="success" icon={<CheckIcon fontSize="inherit" />}>
            Otp Sent
          </Alert> : ""}
          <Grid container spacing={1} >
            <Grid item xs={10}>
              <TextField
                disabled={disableEmail}
                label="Email Address"
                fullWidth
                margin="normal"
                autoComplete="email"
                required
                id="email"
                name="email"
                onChange={handleChange}
                error={errors.email !== undefined}
                helperText={errors.email}
              />
            </Grid>
            <Grid item alignItems={"center"} xs={1}>
              <Button
                variant="contained"
                sx={{ mt: 2, fontSize: "12px" }}
                onClick={handleOtpSend}
                disabled={disableEmail}
              >
                Send OTP
              </Button>
            </Grid>
          </Grid>
          <TextField
            type="number"
            label="Otp"
            fullWidth
            margin="normal"
            autoComplete="Number"
            required={false}
            id="otp"
            name="otp"
            onChange={handleChange}
            error={errors.otp !== undefined}
            helperText={errors.otp}
          />
          <TextField
            label="Password"
            fullWidth
            required
            margin="normal"
            autoComplete="password"
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            error={errors.password !== undefined}
            helperText={errors.password}
          />
          <ErrorAlert error={serverError} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignupView;
