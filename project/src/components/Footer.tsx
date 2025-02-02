import React from 'react';
import { Github, Linkedin, Twitter, Mail, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80"
          alt="Code Background"
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-purple-400" />
              <h3 className="text-xl font-bold">DevProfiles</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Your one-stop platform for managing and showcasing your coding profiles.
              Join our community of developers and showcase your skills.
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="#" icon={<Github className="h-5 w-5" />} />
              <SocialIcon href="#" icon={<Linkedin className="h-5 w-5" />} />
              <SocialIcon href="#" icon={<Twitter className="h-5 w-5" />} />
              <SocialIcon href="#" icon={<Mail className="h-5 w-5" />} />
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="/" text="Home" />
              <FooterLink href="/profiles" text="Profiles" />
              <FooterLink href="/about" text="About" />
              <FooterLink href="/contact" text="Contact" />
            </ul>
          </motion.div>
          
          {/* Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Platforms</h4>
            <ul className="space-y-2">
              <FooterLink href="www.leetcode.com" text="LeetCode" />
              <FooterLink href="#" text="CodeChef" />
              <FooterLink href="#" text="CodeForces" />
              <FooterLink href="#" text="GeeksforGeeks" />
              <FooterLink href="#" text="GitHub" />
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-gray-400 text-sm">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none flex-grow"
              />
              <button className="bg-purple-600 text-white px-2 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} DevProfiles. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="text-gray-400 hover:text-purple-400 transition-colors"
  >
    {icon}
  </motion.a>
);

const FooterLink = ({ href, text }: { href: string; text: string }) => (
  <li>
    <motion.a
      href={href}
      whileHover={{ x: 5 }}
      className="text-gray-400 hover:text-purple-400 transition-colors text-sm block"
    >
      {text}
    </motion.a>
  </li>
);

export default Footer;