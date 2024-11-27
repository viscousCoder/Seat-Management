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
import loginImg from "../../assets/register.svg";
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

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
  });

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setFormErrors((prev) => ({ ...prev, email: "Invalid email" }));
    } else {
      setFormErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6 || value.length > 15) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Password must be between 6 and 15 characters",
      }));
    } else {
      setFormErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) {
      setPhone(value.replace(/[^0-9]/g, ""));
      setFormErrors((prev) => ({
        ...prev,
        phoneNumber: "phoneNumber number must be 10 digits",
      }));
    } else {
      setPhone(value);
      const phoneRegex = /^[0-9]{10}$/;
      if (value && !phoneRegex.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          phoneNumber: "phoneNumber number must be 10 digits",
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, phoneNumber: "" }));
      }
    }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setAge(value);
    if (value < 18 || value > 89) {
      setFormErrors((prev) => ({
        ...prev,
        age: "Age must be between 18 and 89",
      }));
    } else {
      setFormErrors((prev) => ({ ...prev, age: "" }));
    }
  };

  const handleFocus = (field) => {
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !phoneNumber || !age) {
      setFormErrors((prev) => ({
        ...prev,
        username: !username ? "Please fill the username" : "",
        email: !email ? "Please fill the email" : "",
        password: !password ? "Please fill the password" : "",
        phoneNumber: !phoneNumber ? "Please fill the phoneNumber number" : "",
        age: !age ? "Please fill the age" : "",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9001/api/user/register",
        {
          username,
          email,
          password,
          phoneNumber,
          age,
        }
      );

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message) {
          setFormErrors((prev) => ({ ...prev, email: message }));
        }
      }
      console.error("Error registering user:", error);
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
            src={loginImg}
            alt="Welcome"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "400px",
            }}
          />
          <Typography variant="h4" sx={{ mb: 2 }}>
            Welcome to The Traveling World
          </Typography>
          <Typography variant="body1">Adventure awaits, go find it!</Typography>
        </LeftSection>

        <RightSection>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={handleUsernameChange}
              onFocus={() => handleFocus("username")}
              error={!!formErrors.username}
              helperText={formErrors.username}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => handleFocus("email")}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => handleFocus("password")}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              value={phoneNumber}
              onChange={handlePhoneChange}
              onFocus={() => handleFocus("phoneNumber")}
              error={!!formErrors.phoneNumber}
              helperText={formErrors.phoneNumber}
              inputProps={{
                maxLength: 10,
                pattern: "[0-9]*",
              }}
            />

            <TextField
              label="Age"
              type="number"
              fullWidth
              margin="normal"
              value={age}
              onChange={handleAgeChange}
              onFocus={() => handleFocus("age")}
              error={!!formErrors.age}
              helperText={formErrors.age}
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
              Already have an account?{" "}
              <Link to="/login" color="primary">
                Sign in!
              </Link>
            </Typography>
          </Box>
        </RightSection>
      </LoginCard>
    </Box>
  );
}
