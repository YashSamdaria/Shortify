import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Twitter, Mail, Link } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ShortifyCard = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);

  const shortify = async () => {
    setShortUrl(null);
    const response = await fetch(process.env.REACT_APP_API_URL + "/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url }),
    });

    const data = await response.json();
    setShortUrl(data.shortUrl);
    setUrl("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast("Copied to clipboard!");
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-3">
        Welcome to <span className="text-blue-500">Shortify</span> 🔥
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Transform long URLs into short & smart links 🚀.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="url"
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-700"
          placeholder="Enter your URL here 🔗"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <motion.button
          className="w-full sm:w-auto px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md hover:from-indigo-500 hover:to-blue-500 transition-all"
          whileHover={{ scale: 1.08, boxShadow: "0px 0px 15px rgba(0, 128, 255, 0.6)" }}
          whileTap={{ scale: 0.92 }}
          onClick={shortify}
        >
          🚀 Shorten URL
        </motion.button>
      </div>

      {shortUrl && (
       <motion.div
       className="mt-6 p-4 bg-gray-100 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left"
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}
     >
       
       {/* Shortened URL Input */}
       <input
         type="text"
         value={shortUrl}
         readOnly
         className="mt-2 sm:mt-0 w-full sm:w-min p-2 pr-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 text-center sm:flex-1"
       />
     
       {/* Action Buttons: Stack on small screens, row on large screens */}
       <div className="pl-3 flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 sm:mt-0">
         <button
           onClick={copyToClipboard}
           className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition w-auto sm:w-fit"
         >
           <Copy size={18} /> Copy
         </button>
     
         <a
  href={`https://twitter.com/intent/tweet?text=Shorten%20your%20long%20URLs%20instantly%20with%20Shortify!%20Try%20it%20now%20🚀%20${shortUrl}`}
  target="_blank"
           rel="noopener noreferrer"
           className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500 transition"
         >
           <Twitter size={18} />
         </a>
        
         <a
           href={shortUrl}
           target="_blank"
           rel="noopener noreferrer"
           className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-800 transition"
         >
           <Link size={18} />
         </a>
       </div>
     </motion.div>
     
      )}

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: { background: "green", color: "white", fontWeight: "bold" },
        }}
      />
    </motion.div>
  );
};

export default ShortifyCard;
