import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import ImageLogin from "../../assets/register.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginCard = styled(Card)(() => ({
  display: "flex",
  flexDirection: "row",
  maxWidth: 800,
  margin: "auto",
}));

const LeftSection = styled(Box)(() => ({
  flex: 1,
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));

const RightSection = styled(CardContent)(() => ({
  flex: 1,
}));

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For displaying login errors

  // Email validation using regex
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Handle email change and validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };

  // Handle password change and validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length > 0 && (value.length < 6 || value.length > 15)) {
      setPasswordError("Password must be between 6 and 15 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setErrorMessage("");

    if (email === "") {
      setEmailError("Please fill the field");
    }
    if (password === "") {
      setPasswordError("Please fill the field");
    }

    if (email === "" || password === "") {
      return;
    }

    try {
      // Send login request to backend
      const response = await axios.post(
        "https://seat-management.onrender.com/api/user/login",
        {
          email,
          password,
        }
      );

      console.log(response);
      if (response.status === 200) {
        const { token, userId } = response.data;
        localStorage.setItem("token", token);
        navigate("/");
        localStorage.setItem("userId", userId);
      } else {
        // Handle failed login
        setErrorMessage("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred, please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <LoginCard>
        <LeftSection>
          <img
            src={ImageLogin}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "400px",
            }}
            alt="Login"
          />
          <Typography variant="h4" sx={{ mb: 2 }}>
            Welcome to The Traveling World
          </Typography>
          <Typography variant="body1">Adventure awaits, go find it!</Typography>
        </LeftSection>

        <RightSection>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError} // Turns the input red if there is an error
              helperText={emailError} // Displays the error message below the input
              onFocus={() => setEmailError("")} // Remove error on focus
              sx={{
                marginBottom: 2,
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              onFocus={() => setPasswordError("")}
              sx={{
                marginBottom: 2,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Don&apos;t have an account?{" "}
              <Link to="/register" color="primary">
                Sign up!
              </Link>
            </Typography>
          </Box>
        </RightSection>
      </LoginCard>
    </Box>
  );
}
