import React from "react";

const Form = () => {
  const passwordToggle = document.querySelector(".js-password-toggle");

  passwordToggle.addEventListener("change", function () {
    const password = document.querySelector(".js-password"),
      passwordLabel = document.querySelector(".js-password-label");

    if (password.type === "password") {
      password.type = "text";
      passwordLabel.innerHTML = "hide";
    } else {
      password.type = "password";
      passwordLabel.innerHTML = "show";
    }

    password.focus();
  });

  return (
    <form className="p-4 max-w-md mx-auto bg-white border-t-8 border-indigo-700 mt-10 rounded align-center justify-center shadow-2xl">
      <h1 className="font-medium text-3xl text-center py-4 text-gray-800">
        Sign Portal
      </h1>
      <label
        className="font-medium block mb-1 mt-6 text-gray-700"
        for="username"
      >
        Email
      </label>
      <input
        className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono"
        id="username"
        type="text"
        autocomplete="off"
        autofocus
      />

      <label
        className="font-medium block mb-1 mt-6 text-gray-700"
        for="password"
      >
        Password
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <input
            className="hidden js-password-toggle"
            id="toggle"
            type="checkbox"
          />
          <label
            className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
            for="toggle"
          >
            show
          </label>
        </div>
        <input
          className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password"
          id="password"
          type="password"
          autocomplete="off"
        />
      </div>

      <button
        className="w-full bg-indigo-700 hover:bg-indigo-900 text-white font-medium py-3 px-4 mt-10 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Sign in
      </button>
    </form>
  );
};

export default Form;
