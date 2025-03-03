import { Twitter, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Branding and Description */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Shortify</h2>
          <p className="text-gray-400">
            Your modern URL shortener—fast, simple, and smart.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="mailto:yashsamdaria@gmail.com"
            className="hover:text-indigo-400 transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Shortify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
