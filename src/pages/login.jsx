import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";
import '../App.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const accessToken = response.access_token;
        console.log("Access token:", accessToken);

        const res = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/api/users/login/google",
          { accessToken: accessToken },
        );

        console.log("Backend response:", res.data);
        toast.success("Login Successful");
        localStorage.setItem("token", res.data.token);

        if (res.data.role === "admin") {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Google login error:", error);
        const message =
          error.response?.data?.message ||
          "Google login failed. Please try again.";
        toast.error(message);
      }
    },
    onError: (error) => {
      console.error("Google OAuth error:", error);
      toast.error("Google login failed. Please try again.");
    },
  });

  async function handleLogin() {
    // console.log(email);
    // console.log(password);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        {
          email: email,
          password: password,
        },
      );
      toast.success("Login successful!");
      console.log(response.data);
      localStorage.setItem("token", response.data.token);

      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (e) {
      // console.log(e.response.data.message );
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
        console.error(e);
      }
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex items-center justify-evenly">
      <div className="w-[60%] h-full pl-55">
        <div className="mt-60 md:mt-50">
          <p className="font-bold text-white mb-4 VeloraHead Head1">
            Welcome
          </p>
          <p className="text-6xl font-bold text-white mb-4 VeloraSubHead Head2">
            Back to Velora
          </p>
        </div>
        <div className="mt-10">
          <p className="text-2xl text-white text-shadow-lg text-shadow-zinc-600">
            Experience the best of online shopping with Velora. <br/>Log in to explore
            our wide range of products, exclusive deals, and personalized.
          </p>  
        </div>
      </div>
      <div className="w-[40%] h-full flex justify-center items-center">
        <div
          className="
  w-[400px] 
  h-[600px] 
  bg-cover 
  bg-center 
  bg-no-repeat
  bg-pink-100
  rounded-[20px] 
  shadow-pink-500
  shadow-2xl
  flex 
  flex-col 
  justify-center 
  items-center
"
        >
          <img src="/logo.png" alt="Velora Logo" className="w-30 h-30 mb-4" />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            value={email}
            type="email "
            className="w-[300px] h-[50px] border border-pink-600 rounded-[20px] my-[10px] text-center"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="******"
            value={password}
            className="w-[300px] h-[50px] border border-pink-600 rounded-[20px] my-[20px] text-center"
            type="password"
          />
          <button
            onClick={handleLogin}
            className="w-[300px] h-[50px] cursor-pointer  bg-pink-600 rounded-[20px] text-[20px] font-bold text-white my-[20px] mb-[20px]"
          >
            Login
          </button>
          <button
            onClick={googleLogin}
            className="w-[300px] cursor-pointer h-[50px] flex justify-center items-center bg-pink-600 rounded-[20px] my-[20px] text-[20px] font-bold text-white"
          >
            <GrGoogle className="text-xl text-white cursor-pointer hover:text-gray-800 ml-2 mr-3" />
            <span className="text-white text-xl font-semibold">
              Login with Google
            </span>
          </button>
          <a href="/signup" className="text-pink-500 hover:scale-105 transition-transform duration-200">
            Are you new? Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
