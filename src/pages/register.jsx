import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/",
        {
          firstName,
          lastName,
          email,
          password,
        },
      );

      toast.success("Registration successful!");
      navigate("/login");
    } catch (e) {
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
        <div className="mt-75 md:mt-65">
          <p className="font-bold text-white mb-4 VeloraHead Head3">
            Join Velora today
          </p>
        </div>
        <div className="mt-10 md:mt-13">
          <p className="text-2xl text-white text-shadow-lg text-shadow-zinc-600">
            Create your account and discover beauty made just for you.
          </p>
        </div>
      </div>
      <div className="w-[40%] h-full flex justify-center items-center">
        <div
          className="w-[400px] h-[600px]  
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
  items-center"
        >
          <img src="/logo.png" alt="Velora Logo" className="w-30 h-30 mb-4" />
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            type="text"
            placeholder="First Name"
            className="w-[300px] h-[50px] border border-pink-600 rounded-[20px] my-[10px] text-center"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            type="text"
            placeholder="Last Name"
            className="w-[300px] h-[50px] border border-pink-600 rounded-[20px] my-[10px] text-center"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-[300px] h-[50px] border border-pink-600 rounded-[20px] my-[10px] text-center"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-[300px] h-[50px] border border-pink-600 rounded-[20px] my-[10px] text-center"
          />
          <button
            onClick={handleRegister}
            className="w-[300px] h-[50px] cursor-pointer bg-pink-600 rounded-[20px] text-[20px] font-bold text-white my-[20px] mb-[20px]"
          >
            Register
          </button>

          <a
            href="/login"
            className="text-pink-500 hover:scale-105 transition-transform duration-200"
          >
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
}
