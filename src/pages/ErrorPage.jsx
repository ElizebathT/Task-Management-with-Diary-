import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-500 text-center">
      <h1 className="text-6xl font-bold text-gray-800">Oops!</h1>
      <p className="mt-4 text-xl text-gray-800">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 px-6 py-3 bg-gray-800 text-white font-bold rounded-lg">
        Go Back to Home
      </Link>
    </div>
  )
}

export default ErrorPage
