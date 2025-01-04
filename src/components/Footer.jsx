import {} from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => (
  <footer className="absolute bottom-0 left-0 right-0 py-4 border-t border-gray-200 bg-gray-50">
    <div className="flex flex-col items-center justify-between px-6 mx-auto max-w-7xl md:flex-row">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} <a href="https://anthonybekoebankah.netlify.app/" target='_blank'  className="hover:underline">Bankah</a>. All rights reserved.
      </p>
      <div className="items-center hidden mt-4 md:mt-0">
        <a
          href="https://github.com/bankah-junior"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 transition-colors hover:text-gray-900"
        >
          <FaGithub className="w-6 h-6" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;