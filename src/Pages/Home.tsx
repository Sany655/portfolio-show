import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div
        className="h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk5NDc4MDkzNjQyNTQwNDQ2/react-hero-section.jpg')`,
        }}
      >
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Create Your Professional Online Presence
          </h1>
          <p className="text-lg text-white mb-8">
            Showcase your skills, experience, and achievements with a stunning portfolio website.
          </p>
          <Link to="/signup" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded shadow">
            Get Started
          </Link>
        </div>
      </div>
      <div className="p-24">
        <p className="text-lg">
          This project is designed to help professionals create a beautiful and effective online portfolio website. Whether you're a designer, developer, writer, or any other professional, a strong portfolio can help you showcase your work, attract new clients, and advance your career.
        </p>
        <div className="flex md:flex-row flex-col justify-evenly items-middle gap-4 my-6">
          <div className="max-w-md text-lg bg-orange-500 text-white p-6">
            <p>Showcase your best work: Add your projects, skills, and experience with easy-to-use tools.</p>
          </div>
          <div className="max-w-md text-lg bg-orange-500 text-white p-6">
            <p>Connect with potential clients: Share your website with clients and employers to showcase your talent and expertise.</p>
          </div>
        </div>
        <p className="text-lg">
          Build your professional presence online today!
        </p>
      </div>
    </>
  )
}

export default Home