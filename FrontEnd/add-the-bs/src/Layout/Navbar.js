import React from "react";

const Navbar = () => {
  return (
    <>
      <div>
        <nav className="bg-gray-900">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
            <a href="/home" className="flex items-center">
              <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </a>
            <div className="flex items-center">
              <a
                href="/login"
                className="text-xl font-medium text-blue-600 p-3 dark:text-blue-500 hover:underline"
              >
                Login
              </a>
              <p className="text-3xl dark:text-zinc-100"> | </p>
              <a
                href="/signup"
                className="text-xl font-medium text-blue-600 p-3 dark:text-blue-500 hover:underline"
              >
                Sign Up
              </a>
            </div>
          </div>
        </nav>
        <nav className="bg-gray-50 dark:bg-gray-700">
          <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
            <div className="flex items-center">
              <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                <li>
                  <a
                    href="/home"
                    className="text-gray-900 dark:text-white hover:underline"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/movie"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Movie Search
                  </a>
                </li>
                <li>
                  <a
                    href="/actors"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Actor Search
                  </a>
                </li>
                <li>
                  <a
                    href="/genre"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Genre Search
                  </a>
                </li>
                <li>
                  <a
                    href="/admin"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Admin Testing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
