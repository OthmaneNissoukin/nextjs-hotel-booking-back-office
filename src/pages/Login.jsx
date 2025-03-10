import { useForm } from "react-hook-form";
import supabase from "../services/supabase/db";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faSpinner } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [session, setSession] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    // await new Promise((res) => setTimeout(res, 5000));
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: "/",
      },
    });

    if (authData.session?.access_token) {
      localStorage.setItem("sp_access_tkn", authData.session.access_token);
    }

    if (error) toast.error("Wrong email or password!", { duration: 5000 });
  }

  async function authAnounymous() {
    toast.loading("Please wait...");
    const { data, error } = await supabase.auth.signInAnonymously({});

    if (data.session?.access_token) {
      localStorage.setItem("sp_access_tkn", data.session.access_token);
    }

    toast.dismiss();
    if (error) {
      toast.error("Failed to authenticate!");
    }

    return data;
  }

  if (session) return;

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign In
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <div>
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="address@mail.com"
                  {...register("email", {
                    required: true,
                    pattern: "^[w-.]+@([w-]+.)+[w-]{2,4}$",
                  })}
                />
                {errors.email?.type === "required" && (
                  <span className="text-red-800 text-sm italic">the email is required</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-red-800 text-sm italic">invalid email address</span>
                )}
              </div>
              <div>
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-800 text-sm italic">the password is required</span>
                )}
              </div>

              <div className="space-y-3">
                <button
                  className="w-full text-white min-w-32 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <FontAwesomeIcon icon={faSpinner} spinPulse /> : "Sign In"}
                </button>
                <button
                  onClick={authAnounymous}
                  type="button"
                  className="w-full text-white min-w-32 bg-stone-600 hover:bg-stone-700 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faBan} /> <span>Sign In as Anonymous</span>
                    </>
                  ) : (
                    "Sign In as Anonymous"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </section>
  );
}

export default Login;
