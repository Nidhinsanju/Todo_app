import { SignUp } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // for schema validation

export default function SignUpPage() {
  const navigate = useNavigate();
  const hanldeSignup = async (values, resetForm) => {
    try {
      const result = await SignUp(values);
      if (result.status === 201) {
        const message = result.data.message;
        alert(message);
        navigate("/");
        resetForm();
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
      firstName: "",
      lastName: "",
      email: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is Required"),
      lastName: Yup.string().required("Last Name is Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email ID is required"),
      confirmPassword: Yup.string()
        .min(8, "Minium password length should be 8")
        .required("Password is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        hanldeSignup(values, resetForm);
      } catch (err) {
        alert(err.message);
      }
    },
  });

  return (
    <div className="font-[sans-serif] w-full">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-xl w-full p-6 mx-auto"
        >
          <div className="mb-12">
            <h3 className="text-gray-800 text-4xl font-extrabold">
              {"Sign up"}
            </h3>
            <p className="text-gray-800 text-sm mt-6">
              {"Have an account?"}
              <button
                onClick={() => navigate("/")}
                type="button"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                {"Login"}
              </button>
            </p>
          </div>
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
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.firstName}
                  </div>
                )}
              </div>
              <div>
                <label className="text-gray-800 text-sm block">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter Last Name"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.lastName}
                  </div>
                )}
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
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600 text-sm">
                  {formik.errors.email}
                </div>
              )}
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
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
          </>
          <div className="mt-12">
            <button
              className="w-full py-2.5 px-4 text-sm my-2 tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none active:scale-95 transition duration-150 ease-in-out"
              type="submit"
            >
              {"Sign up"}
            </button>
          </div>
        </form>
        <div className="max-md:order-1 h-screen min-h-full">
          <img
            src="https://readymadeui.com/image-3.webp"
            className="w-full h-full object-cover"
            alt="login-image"
          />
        </div>
      </div>
    </div>
  );
}
