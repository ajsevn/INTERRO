import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to <span className="text-indigo-600">Interro</span> 🚀
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Your AI-powered interview assistant. Practice, improve, and get
        real-time feedback — whether you're a candidate or an admin.
      </p>
      <div className="space-x-4">
        <Link to="/login">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
            Get Started
          </button>
        </Link>
        <Link to="/about">
          <button className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-200 transition">
            Learn More
          </button>
        </Link>
      </div>
      <div className="text-3xl font-bold text-blue-600">
        Tailwind is working! 🚀
      </div>
    </section>
  );
};

export default Home;
