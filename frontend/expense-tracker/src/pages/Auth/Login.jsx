import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { userContext } from "../../context/UserContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(userContext);

  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    // Simple validation example
    if (!validateEmail(email)) {
      setError("Please Enter a valid email address");
      return;
    }
    if (!password) {
      setError("please enter the password");
      return;
    }
    setError("");

    //Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] md:h-full flex flex-col justify-center">
        <h3 className="text-xl text-black font-semibold">
          Welcome Back to all of you
        </h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="kiran@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            Log In
          </button>
          <p className="text-slate-800 text-[13px] mt-3">
            Don't have an accont? {""}
            <Link className="font-medium text-primary underline" to={"/signup"}>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
