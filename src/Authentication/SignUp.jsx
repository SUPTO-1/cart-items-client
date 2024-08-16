import { CiLock } from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import image from "../assets/images/login.jpg";
import { MdPhotoCamera } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";
const SignUp = () => {
    const {createUser} = useContext(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const photo = formData.get("photo");
    // password validation here
    const passwordCheckerUpper = /^(?=.*[A-Z]).*$/;
    const passwordCheckerLower = /^(?=.*[a-z]).*$/;

    if (password.length < 6) {
      Swal.fire({
        title: "error!",
        text: "Password Length Must be more then 6",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }
    else if (!passwordCheckerUpper.test(password)) {
      Swal.fire({
        title: "error!",
        text: "Password must contain at least one uppercase letter",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }
    else if (!passwordCheckerLower.test(password)) {
      Swal.fire({
        title: "error!",
        text: "Password must contain at least one lowercase letter",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    //Authentication here
    createUser(email, password, name, photo)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        Swal.fire({
          title: "success!",
          text: "User SignUp successfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          title: "error!",
          text: "Something went wrong. Try again!",
          icon: "error",
          confirmButtonText: "Okay",
        });
      })
  }
    return (
        <div className=" p-2 lg:p-10 xl:p-0 xl:w-3/4 mx-auto mt-10 lg:mt-32 lg:flex lg:gap-32 xl:gap-64">
      <div className="hidden flex-1 md:block">
        <div>
          <div className="flex gap-2">
            <img className="w-12" src={logo} alt="Bank Logo" />
            <h1 className="text-2xl font-blackOp mt-2">
              Express Mate
            </h1>
          </div>
          <img className="h-[670px]" src={image} alt="Login Visual" />
        </div>
      </div>
      <div className="flex-1 lg:text-center">
        <p className="mb-12 lg:text-right font-montserrat">
          <CiLock className="inline text-lg" /> you are signing into a secure
          site
        </p>
        <h2 className="text-2xl lg:text-xl xl:text-2xl font-montserrat">
          Welcome to Express Mate
        </h2>
        <p className="mt-4 mb-16 font-poppins">
          If you already have an account{" "}
          <Link to={"/login"} className="font-semibold text-[#ff4f5a]" href="">
            Login
          </Link>
        </p>
        <form onSubmit={handleRegister}>
        <div className="mb-5">
          <h2 className="text-left mb-2 text-[#072d76] font-semibold font-poppins">
            Name
          </h2>
          <div className="input-container md:w-3/4 border-2 p-2 rounded-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 text-black"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow focus:outline-none input-bordered"
              placeholder="Name"
              name="name"
            />
          </div>
        </div>
        <div className="mb-5">
          <h2 className="text-left mb-2 text-[#072d76] font-semibold font-poppins">
            Email
          </h2>
          <div className="input-container md:w-3/4 border-2 p-2 rounded-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 text-black"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow focus:outline-none input-bordered"
              placeholder="Email"
              name="email"
            />
          </div>
        </div>
        <div className="mb-5">
          <h2 className="text-left mb-2 text-[#072d76] font-semibold font-poppins">
            Photo
          </h2>
          <div className="input-container md:w-3/4 border-2 p-2 rounded-sm flex items-center gap-2">
           <MdPhotoCamera className="text-lg text-[#626973]"></MdPhotoCamera>
            <input
              type="text"
              className="grow focus:outline-none input-bordered "
              placeholder="Photo"
              name="photo"
            />
            {/* <input type="file" name="photo" className="file-input file-input-bordered file-input-md w-full grow focus:outline-none input-bordered" /> */}
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
              className="h-4 w-4 opacity-70 text-black"
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
            Register
          </button>
        </div>
        </form>
      </div>
    </div>
    );
};

export default SignUp;