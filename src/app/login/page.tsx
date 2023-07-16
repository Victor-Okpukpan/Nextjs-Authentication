"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  function onChange(e: any) {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  }

  async function onLogin() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/profile");
      toast.success("Login Success!")
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if ( email.length > 0 && password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email.length, password.length]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[30%]">
        <form>
          <h1 className="text-4xl font-bold mb-10">
            {loading ? "Logging in..." : "Welcome Back"}
          </h1>
          <label htmlFor="">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            className="py-3 px-2 rounded border block w-full mb-5"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChange}
            placeholder="Enter your password"
            className="py-3 px-2 rounded border block w-full mb-5"
          />
          <button
            type="button"
            onClick={onLogin}
            className={`p-3 w-full text-center rounded text-white font-semibold ${
              buttonDisabled ? "bg-gray-400" : "bg-black"
            }`}
            disabled={buttonDisabled}
          >
            Login
          </button>
          <p className="text-center mt-2">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-gray-500 hover:text-black transition duration-200 ease-in-out"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
