import { CiLock } from "react-icons/ci";
import logo from "../assets/images/logo.png";
import image from "../assets/images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import Swal from "sweetalert2";
import { GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Login = () => {
    const { logIn, googleSignIn} = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);
    logIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        Swal.fire({
          title: "success!",
          text: "User logged in successfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
        navigate(location?.state ? location.state: "/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "error!",
          text: "Password and E-mail doesn't Match",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };
  const handleGoogle = () => {
    googleSignIn(googleProvider)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        Swal.fire({
          title: "success!",
          text: "User logged in successfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
        navigate(location?.state ? location.state: "/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "error!",
          text: "Something went wrong!Try Again.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  return (
    <div className=" p-2 lg:p-10 xl:p-0 xl:w-3/4 mx-auto mt-10 lg:mt-32 lg:flex lg:gap-32 xl:gap-64">
      <div className="hidden md:block">
        <div>
          <div className="flex gap-2">
            <img className="w-12" src={logo} alt="Bank Logo" />
            <h1 className="text-2xl font-blackOp mt-2">
              Express Mate
            </h1>
          </div>
          <img className="h-[500px]" src={image} alt="Login Visual" />
        </div>
      </div>
      <div className="flex-1 lg:text-center">
        <p className="mb-12 lg:text-right font-montserrat">
          <CiLock className="inline text-lg" /> you are logged into a secure
          site
        </p>
        <h2 className="text-2xl font-montserrat">
          Welcome to Express Mate
        </h2>
        <p className="mt-4 mb-16 font-poppins">
          If you don't have an account{" "}
          <Link to={"/signup"} className="font-semibold text-[#ff4f5a]" href="">
            Register
          </Link>
        </p>
       <form onSubmit={handleLogin}>
       <div className="mb-5">
          <h2 className="text-left mb-2 text-[#072d76] font-semibold font-poppins">
            Email
          </h2>
          <div className="input-container md:w-3/4 border-2 p-2 rounded-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow focus:outline-none input-bordered "
              placeholder="Phone or Email"
              name="email"
            />
          </div>
        </div>
        <label className="">
          <h2 className="text-left text-[#072d76] mb-2 font-semibold font-poppins">
            Password
          </h2>
          <div className="input-container mb-2 md:w-3/4 border-2 p-2 rounded-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow focus:outline-none input-bordered "
              placeholder="Password"
              name="password"
            />
          </div>
        </label>
        <div className="text-left mt-8">
          <button className="btn bg-[#ff4f5a] font-roboto text-white text-xl w-full md:w-3/4">
            Log In
          </button>
        </div>
       </form>
       <div className="w-full">
       <div className="flex gap-5 mt-5">
            <button onClick={handleGoogle}>
              <FcGoogle className="text-3xl"></FcGoogle>
            </button>
            <button disabled>
              <FaGithub className=" text-3xl"></FaGithub>
            </button>
            <FaFacebook className="text-[#0866ff] text-3xl"></FaFacebook>
            <FaTwitter className=" text-[#1da1f2] text-3xl"></FaTwitter>
          </div>
       </div>
      </div>
    </div>
  );
};

export default Login;
