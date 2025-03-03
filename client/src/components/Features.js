import React from "react";
import { motion } from "framer-motion";
import { Bolt, Link, Shield, BarChart, CheckCircle, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Bolt className="text-yellow-500 w-10 h-10" />,
    title: "Easy",
    description: "Shortify is easy and fast, enter the long link to get your shortened link.",
  },
  {
    icon: <Link className="text-blue-500 w-10 h-10" />,
    title: "Shortened",
    description: "Use any link, no matter what size, Shortify always shortens.",
  },
  {
    icon: <Shield className="text-green-500 w-10 h-10" />,
    title: "Secure",
    description: "It is fast and secure, our service has HTTPS protocol and data encryption.",
  },
  {
    icon: <BarChart className="text-purple-500 w-10 h-10" />,
    title: "Statistics",
    description: "Check the number of clicks that your shortened URL received.",
  },
  {
    icon: <CheckCircle className="text-teal-500 w-10 h-10" />,
    title: "Reliable",
    description: "All links that try to disseminate spam, viruses, and malware are deleted.",
  },
  {
    icon: <Smartphone className="text-pink-500 w-10 h-10" />,
    title: "Devices",
    description: "Compatible with smartphones, tablets, and desktop.",
  },
];

const Features = () => {
  return (
    <div className="p-6">
      {/* Feature Heading */}
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Features
      </h2>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg opacity-10"></div>

            <div className="relative flex items-center gap-4">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            </div>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
