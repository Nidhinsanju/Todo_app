import { useContext } from "react";
import { Login } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../Token";
import { useFormik } from "formik";
import * as Yup from "yup"; // for schema validation

export default function LoginPage() {
  const { updateToken, hanldeUserData } = useContext(TokenContext);
  const navigate = useNavigate();

  const hanldelogin = async (values) => {
    try {
      const result = await Login(values.email, values.password);
      if (result.status === 200) {
        const message = result.data?.message;
        const token = result.data?.token;
        const userData = result.data?.user;
        hanldeUserData({ userData });
        localStorage.setItem("token", token);
        updateToken(token);
        localStorage.setItem("userData", JSON.stringify(userData));
        alert(message);
        navigate("/home");
      } else {
        const message = result.message;
        alert(message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      hanldelogin(values);
    },
  });

  return (
    <div className="font-[sans-serif] w-full">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
        <div className="max-md:order-1 h-screen min-h-full">
          <img
            src="https://readymadeui.com/image-3.webp"
            className="w-full h-full object-cover"
            alt="login-image"
          />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-xl w-full p-6 mx-auto"
        >
          <div className="mb-12">
            <h3 className="text-gray-800 text-4xl font-extrabold">
              {"Sign up"}
            </h3>
            <p className="text-gray-800 text-sm mt-6">
              {"Don't have an account?"}
              <button
                onClick={() => navigate("/signup")}
                type="button"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                {"Sign up"}
              </button>
            </p>
          </div>
          <>
            <div>
              <label className="text-gray-800 text-sm block mb-2">Email</label>
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
          <div className="mt-12">
            <button
              className="w-full py-2.5 px-4 text-sm my-2 tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none active:scale-95 transition duration-150 ease-in-out"
              type="submit"
            >
              {"Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
