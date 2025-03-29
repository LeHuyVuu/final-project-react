import React from 'react'
import { FaFacebook, FaInstagram, FaEnvelope, FaWhatsapp, FaYoutube, FaPhone } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800">
      {/* Subscription Section */}
      <div className="bg-slate-500 text-white py-10 px-6 md:px-20 rounded-t-lg">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
          {/* Left - Image */}
          <div className="mb-6 md:mb-0">
            <img src="  " alt="Fitness" className="w-80" />
          </div>

          {/* Right - Subscription */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">
              Subscribe to our newsletter and get exclusive gym offers!
            </h2>
            <p className="mt-2 text-sm">
              Get 20% off on your first membership just by subscribing to our newsletter.
            </p>
            <div className="mt-4 flex justify-center md:justify-start">
              <input
                type="email"
                placeholder="Enter your Email"
                className="p-2 w-60 rounded-l-lg text-gray-700"
              />
              <button className="bg-white text-blue-600 px-4 py-2 rounded-r-lg font-semibold">
                Subscribe
              </button>
            </div>
            <p className="mt-2 text-xs">
              You will be able to unsubscribe at any time. Read our privacy & policy{" "}
              <a href="#" className="underline">
                here
              </a>.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold flex items-center">
            <span className="mr-2 text-2xl">💪</span> AlphaFitness
          </h3>
          <p className="mt-2 text-sm">
            Lorem ipsum dolor sit amet consectetur. Eget tellus posuere blandit.
          </p>
          <div className="flex space-x-4 mt-4 text-gray-600">
            <FaFacebook className="text-2xl cursor-pointer hover:text-blue-600" />
            <FaInstagram className="text-2xl cursor-pointer hover:text-pink-500" />
            <FaEnvelope className="text-2xl cursor-pointer hover:text-red-500" />
            <FaWhatsapp className="text-2xl cursor-pointer hover:text-green-500" />
            <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
          </div>
        </div>

        {/* Links Sections */}
        <div>
          <h3 className="font-bold">Company</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Community</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Testimonials</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">Support</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Websites</a></li>
            <li><a href="#" className="hover:underline">Feedback</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Plans</a></li>
            <li><a href="#" className="hover:underline">Membership</a></li>
            <li><a href="#" className="hover:underline">Become a Trainer</a></li>
            <li><a href="#" className="hover:underline">Diet Plan</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="col-span-1 md:col-span-4 mt-6">
          <div className="flex items-center space-x-4">
            <FaPhone className="text-xl text-blue-600" />
            <span>(+977) 9800000000</span>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <FaEnvelope className="text-xl text-blue-600" />
            <span>support@mail.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t py-4 text-center text-sm text-gray-500">
        <p>©Copyright 2025 by Leo-UI. All rights reserved</p>
        <div className="mt-2 flex justify-center space-x-6">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Use</a>
          <a href="#" className="hover:underline">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}
