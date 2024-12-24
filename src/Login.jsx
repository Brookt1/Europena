import { useContext, useState } from "react";
import { ShopContext } from "./context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import axiosInstance from "./axiosInstance";


function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, BASE_URL } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (currentState === "Sign Up" && !validateName(name)) {
      toast.error("Name is required and cannot be empty.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long.");
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

          toast.success("Account Regiterd Successfully");
        } else {
          toast.error(response.data.message);
          toast.error("error");
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
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
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
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-[90%] sm:w-96 m-auto mt-14 mb-12 gap-6 text-gray-800 bg-white shadow-md rounded-lg p-6"
    >
      <div className="flex flex-col items-center gap-2 mb-4">
        <p className="text-3xl font-semibold text-gray-800">{currentState}</p>
        <div className="h-1 w-8 bg-gray-800 rounded-full"></div>
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => {
              setEmail("");
              setPassword("");
              setCurrentState("Sign Up");
            }}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => {
              setName("");
              setEmail("");
              setPassword("");

              setCurrentState("Login");
            }}

            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-1/2 px-4 py-3 bg-green-900 text-white font-semibold hover:bg-gray-700 transition-all duration-300"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
