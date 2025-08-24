import { useContext, useState } from "react";
import { ShopContext } from "./context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import axiosInstance from "./axiosInstance";
import Button from "./components/Button";
import Input from "./components/Input";


function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, BASE_URL } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {setUsername, setUserEmail} = useContext(ShopContext);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateName = (name) => {
    return name.trim().length > 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (currentState === "Sign Up" && !validateName(name)) {
      toast.error("Name is required and cannot be empty.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      if (currentState === "Sign Up") {
        console.log(name, email, password);

        console.log(BASE_URL + "/auth/register -------------------");
        const response = await axiosInstance.post("/auth/register", {
          username: name,
          email,
          password,
        });

        if (response.status === 201) {
          setName("");
          setEmail("");
          setPassword("");
          setCurrentState("Login");

          toast.success("Account Registered Successfully");
        } else {
          toast.error(response.data.message || "Registration failed");
        }
      } else {
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        console.log(response, "from login");

        if (response.status === 201) {
          console.log("setting token", token);
          setToken(response.data.token);
          console.log("after setting token", token);
          localStorage.setItem("token", response.data.token);
          setUsername(response.data.name)
          setUserEmail(response.data.email)
          toast.success("Login successful!");
        } else {
          toast.error(response.data.message || "Login failed");
        }
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("token is there", token);
    if (token) {
      console.log("navigating to /");
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {currentState}
          </h2>
          <p className="text-gray-600">
            {currentState === "Login" 
              ? "Welcome back to European Luxury" 
              : "Join our exclusive furniture collection"
            }
          </p>
          <div className="h-1 w-12 bg-primary-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          {currentState === "Login" ? null : (
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              Forgot your password?
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail("");
                setPassword("");
                setName("");
                setCurrentState(currentState === "Login" ? "Sign Up" : "Login");
              }}
              className="text-sm text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              {currentState === "Login" ? "Create account" : "Already have an account?"}
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            {currentState === "Login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        {/* Additional Info */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
