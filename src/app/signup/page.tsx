"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = user;

  function onChange(e: any) {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  }

  async function onSignUp() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Sign up success", response.data);
      router.push("/login");
      toast.success("Account Created!")
    } catch (error: any) {
      console.log("Sign up failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email.length, password.length, username.length]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[30%]">
        <form>
          <h1 className="text-4xl font-bold mb-10">
            {loading ? "Create Account" : "Account is being created..."}
          </h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={onChange}
            placeholder="Enter your username"
            className="py-3 px-2 rounded border block w-full mb-5"
          />
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
            onClick={onSignUp}
            className={`p-3 w-full text-center rounded text-white font-semibold ${
              buttonDisabled ? "bg-gray-400" : "bg-black"
            }`}
            disabled={buttonDisabled}
          >
            Create
          </button>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-gray-500 hover:text-black transition duration-200 ease-in-out"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
