import { Link, Menu, Scissors } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-5 shadow-xl flex justify-between items-center">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <Scissors className="w-8 h-8 text-indigo-500 animate-bounce" />
        <h1 className="text-3xl font-extrabold tracking-wider">Shortify</h1>
      </div>
      
    </header>
  );
};

export default Header;
