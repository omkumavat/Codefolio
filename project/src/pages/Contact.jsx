import React, { useState } from 'react';
import contact from '../../public/images/contact.jpg';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

const Contact = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://codefolio-backend.vercel.app/server/contact/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to send data");
            }

            const data = await response.json();
            console.log("Response from server:", data);
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send message.");
        }
    };

    return (
        <>
            <Navbar />
            {/* Header Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`relative py-20 px-5 overflow-hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-sky-500 to-blue-600 text-black'}`}
            >   
                <div className="absolute inset-0">
                    <img
                        src="https://img.freepik.com/premium-photo/contact-us-business-icon-computer-keyboard-with-globe_117856-2468.jpg"
                        alt="Coding Background"
                        className={`w-full h-full object-cover ${isDarkMode ? 'opacity-100' : 'opacity-100'}`}
                    />
                </div>
                <div className="container mx-auto relative z-10 mt-10">
                    <div className="flex flex-col items-center">

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-6xl font-bold text-center mb-6 text-white"
                        >
                            Contact Us
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-center max-w-3xl mb-8 text-white" 
                        >
                            "Get in Touch" – Reach out to us for inquiries, support, or collaboration
                        </motion.p>
                    </div>
                </div>
            </motion.section>

            {/* Intro Text */}
            <div className={`text-center w-full max-w-4xl mx-auto p-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                <p>
                    "Contact Us" – Have a question or need assistance? We're here to help! Reach out via the form or email us directly, and we'll respond as soon as possible.
                </p>
            </div>

            {/* Contact Form & Information Section */}
            <div className={`flex items-center justify-center min-h-screen p-7 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-purple-50 text-black'}`}>
                <div className={`w-full max-w-7xl rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>

                    {/* Left Section - Contact Information */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col items-center">
                        <img
                            src={contact}
                            alt="Contact Us"
                            className="w-full h-full object-cover rounded-lg mb-8"
                        />
                        <p className={`text-lg mb-8 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            Let's talk about your problem. We're here to help!
                        </p>
                        <div className="mb-8 text-center">
                            <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Our Location</h3>
                            <p className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Survey No. 27, Near Trimurti Chowk, Dhankawadi, Pune-411043, Maharashtra (India).</p>
                        </div>

                        <div className="text-center">
                            <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>How Can We Help?</h3>
                            <p className={`${isDarkMode ? 'text-white' : 'text-black'}`}>balajisaw07@gmail.com</p>
                            <p className={`${isDarkMode ? 'text-white' : 'text-black'}`}>omkumavat2004@gmail.com</p>
                        </div>
                    </div>

                    {/* Right Section - Contact Form */}
                    <div className="w-full md:w-1/2 p-8">
                        <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            Send us a Message
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Your Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg transition-all ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@mail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg transition-all ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
                                >
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    placeholder="Type your message here"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className={`w-full px-4 py-3 border rounded-lg transition-all ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center mt-8 pb-8">
                <div className="w-[400px] h-[300px] rounded-1xl overflow-hidden shadow-lg border border-gray-300">
                    <iframe
                        className="w-full h-full rounded-1xl"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Pune institute of Computer technology Dhanakwadi&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
