import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
// @mui

import {
  Stack,
  IconButton,
  InputAdornment,
  styled,
  Button,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

// components
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { APIHttp } from "../helper/API";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

// ----------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${APIHttp}/register/login`, data)
      .then((y) => {
        localStorage.setItem("AdminData", JSON.stringify(y.data.data || 0));
        toast("login successfully");
        navigate("/dashboard");
        window.location.reload();
      })
      .catch((y) => {
        toast("Invalid Username/Password");
      });
  };

  return (
    <div className="main">
      <div className="container mt-5  login">
        <Stack spacing={3}>
          <ValidatorForm
            onSubmit={handleSubmit}
            onError={() => null}
            autocomplete="off"
          >
            <TextField
              type="email"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
              errorMessages={["Email is required"]}
              validators={["required"]}
              label="Email address"
            />

            <TextField
              name="password"
              label="Password"
              value={data.password || ""}
              onChange={handleChange}
              errorMessages={["Password is required"]}
              validators={["required"]}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <FaEye className="fs-4" />
                      ) : (
                        <FaEyeSlash className="fs-4" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button fullWidth size="large" type="submit" variant="contained">
              Login
            </Button>
          </ValidatorForm>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <p className="mb-0">
            Don't Have Account ?<Link to="/register"> SignUp</Link>
          </p>
        </Stack>
      </div>
    </div>
  );
}
