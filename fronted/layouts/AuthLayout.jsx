"use client";

import Head from "next/head";

export default function AuthLayout({ children }) {
  return (
    <>
      <Head>
        <title>Chat App - Authentication</title>
        <meta name="description" content="Chat application authentication" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex flex-col-reverse lg:flex-row">
        {/* Left side: form content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 bg-gray-50 dark:bg-gray-800">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center mb-6">
              <div className="mt-3 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                C
              </div>
            </div>

            <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Welcome to Chat App
            </h1>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" role="main">
            <div className="px-4 py-8 sm:px-10 bg-white dark:bg-gray-700 shadow-md rounded-lg">
              {children}
            </div>
          </div>
        </div>

        {/* Right side: decorative image */}
        <div className="lg:flex lg:w-1/2 bg-blue-100 dark:bg-gray-800 items-center justify-center p-10 relative">
          <div className="max-w-md text-center">
            <img
              src="/chatImage.png"
              alt="Chat Illustration"
              className="w-full h-auto mx-auto drop-shadow-lg rounded-lg"
              onError={(e) => (e.target.src = "/fallback.png")} // Optional fallback
            />
            <h2 className="mt-6 text-2xl font-bold text-gray-700 dark:text-white">
              Stay connected with your friends
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Join the conversation, share your moments, and explore a modern
              chat experience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
