import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Container,
  Link,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const steps = ["Create Account", "Verify Email"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signup", {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success(
        "Signup successful! Please check your email for verification."
      );
      setActiveStep(1);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              Account created successfully!
            </Alert>
            <Typography variant="h6" gutterBottom>
              Verify Your Email
            </Typography>
            <Typography variant="body1" paragraph>
              We've sent a verification link to{" "}
              <strong>{formData.email}</strong>.
            </Typography>
            <Typography variant="body1" paragraph>
              Please check your inbox and click the link to activate your
              account. If you don't see the email, check your spam folder.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
              sx={{ mt: 2 }}
            >
              Go to Login
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Create Your Account
        </Typography>

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ width: "100%", mb: 4 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStep()}
      </Paper>
    </Container>
  );
};

export default Signup;
