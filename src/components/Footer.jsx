import React from "react";
import { FaTwitter, FaGithub, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100  border-t border-gray-500  text-gray-700 dark:text-gray-300 py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            Jobs
          </a>
          <a href="#" className="hover:underline">
            Press Kit
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-xl">
          <a href="#" aria-label="Twitter" className="hover:text-blue-500 transition">
            <FaTwitter />
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-gray-800 dark:hover:text-white transition">
            <FaGithub />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-700 transition">
            <FaFacebookF />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Dev Tinder — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
