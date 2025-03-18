import React from "react";
import { Github, Linkedin, Code } from "lucide-react";
import om from "../../public/images/om.jpg";
import balaji from "../../public/images/balaji.jpg";

const Developers = () => {
    return (
        <div className="min-h-screen bg-white py-24 -mt-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-4 text-gray-800">
                    Our Developers
                </h2>
                <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                    Meet the talented developers behind this project. We're passionate
                    about creating exceptional web experiences that make a difference.
                </p>

                {/* Responsive container: vertical stack on mobile, horizontal on larger screens */}
                <div className="flex flex-col sm:flex-row sm:justify-center gap-8 sm:gap-16 px-4">
                    {/* Developer 1 */}
                    <div className="group w-full sm:w-[300px] mx-auto sm:mx-0">
                        <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300">
                            <div className="relative overflow-hidden">
                                <img
                                    src={om}
                                    alt="Developer 1"
                                    className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-6 text-center">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">
                                    Om Kumavat
                                </h3>
                                <p className="text-gray-600 text-sm mb-1">Pune Institue of Computer Technology</p>
                                <p className="text-md font-semibold text-blue-500 mb-4">
                                    Full Stack Developer & ML Enthusiast
                                </p>

                                <div className="flex justify-center gap-4">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.github.com/omkumavat"
                                        className="transition-transform hover:scale-110"
                                    >
                                        <div className="bg-gray-900 text-white p-2 rounded-full">
                                            <Github className="w-4 h-4" />
                                        </div>
                                    </a>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.linkedin.com/in/om-kumavat-a34296258/"
                                        className="transition-transform hover:scale-110"
                                    >
                                        <div className="bg-blue-600 text-white p-2 rounded-full">
                                            <Linkedin className="w-4 h-4" />
                                        </div>
                                    </a>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://codefolio-platform.vercel.app/user/omkumavat"
                                        className="transition-transform hover:scale-110"
                                    >
                                        <div className="bg-blue-600 text-white p-2 rounded-full">
                                            <Code className="w-4 h-4" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Developer 2 */}
                    <div className="group w-full sm:w-[300px] mx-auto sm:mx-0">
                        <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300">
                            <div className="relative overflow-hidden">
                                <img
                                    src={balaji}
                                    alt="Developer 2"
                                    className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-6 text-center">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">
                                    Balaji Saw
                                </h3>
                                <p className="text-gray-600 text-sm mb-1">Pune Institue of Computer Technology</p>
                                <p className="text-md font-semibold text-blue-500 mb-4">
                                    Full Stack Developer & ML Enthusiast
                                </p>

                                <div className="flex justify-center gap-4">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://github.com/balajisaw07"
                                        className="transition-transform hover:scale-110"
                                    >
                                        <div className="bg-gray-900 text-white p-2 rounded-full">
                                            <Github className="w-4 h-4" />
                                        </div>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/balaji-s-922165258/"
                                        className="transition-transform hover:scale-110"
                                    >
                                        <div className="bg-blue-600 text-white p-2 rounded-full">
                                            <Linkedin className="w-4 h-4" />
                                        </div>
                                    </a>
                                    <a
                                        href="https://codefolio-platform.vercel.app/user/balajisaw"
                                        className="transition-transform hover:scale-110"
                                    >
                                        <div className="bg-blue-600 text-white p-2 rounded-full">
                                            <Code className="w-4 h-4" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Developers;
