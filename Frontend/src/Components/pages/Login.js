import { useContext, useState } from "react";
import Button from "../Utils/Button";
import { Login } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../Token";
import { useFormik } from "formik";
import * as Yup from "yup"; // for schema validation

export default function LoginPage() {
  const { updateToken, hanldeUserData } = useContext(TokenContext);
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const Login = async (values) => {
    try {
      const result = await Login(values.email, values.password);
      const message = result.data?.message;
      if (result.status === 200) {
        const token = result.data?.token;
        const userData = result.data?.user;
        hanldeUserData({ userData });
        localStorage.setItem("token", token);
        updateToken(token);
        localStorage.setItem("userData", JSON.stringify(userData));
        alert(message);
        navigate("/home");
      } else {
        alert(message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const formik = useFormik({
    initialValues: isLoginMode
      ? { email: "", password: "" }
      : {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
      ...(isLoginMode
        ? {}
        : {
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Required"),
          }),
    }),
    onSubmit: async (values) => {
      if (isLoginMode) {
        Login(values);
      } else {
        // Handle registration logic here
        alert("Registration submitted!");
      }
    },
  });

  return (
    <div className="font-[sans-serif] w-full">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
        {isLoginMode ? (
          <div className="max-md:order-1 h-screen min-h-full">
            <img
              src="https://readymadeui.com/image-3.webp"
              className="w-full h-full object-cover"
              alt="login-image"
            />
          </div>
        ) : null}

        <form
          onSubmit={formik.handleSubmit}
          className="max-w-xl w-full p-6 mx-auto"
        >
          <div className="mb-12">
            <h3 className="text-gray-800 text-4xl font-extrabold">
              {isLoginMode ? "Sign in" : "Sign up"}
            </h3>
            <p className="text-gray-800 text-sm mt-6">
              {isLoginMode ? "Don't have an account?" : "Have an account?"}
              <button
                type="button"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                onClick={() => setIsLoginMode(!isLoginMode)}
              >
                {isLoginMode ? "Register here" : "Login"}
              </button>
            </p>
          </div>

          {isLoginMode ? (
            <>
              <div>
                <label className="text-gray-800 text-sm block mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="mt-8">
                <label className="text-gray-800 text-sm block mb-2">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between gap-4">
                <div>
                  <label className="text-gray-800 text-sm block">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter First Name"
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm block">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-gray-800 text-sm block">
                  Email Address
                </label>
                <input
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Email Address"
                />
              </div>
              <div className="mt-4">
                <label className="text-gray-800 text-sm block">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Repeat password"
                />
              </div>
            </>
          )}

          <div className="mt-12">
            <Button type="submit">{isLoginMode ? "Log in" : "Sign up"}</Button>
          </div>
        </form>

        {!isLoginMode ? (
          <div className="max-md:order-1 h-screen min-h-full">
            <img
              src="https://readymadeui.com/image-3.webp"
              className="w-full h-full object-cover"
              alt="login-image"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
