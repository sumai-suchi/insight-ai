'use client';

import React from 'react';
import Link from 'next/link';
import Image from "next/image";

import { motion } from 'framer-motion';
import {
    FaTwitter,
    FaLinkedinIn,
    FaGithub,
    FaFacebookF,
    FaInstagram,
    FaEnvelope,
    FaArrowRight,
    FaPenFancy,
    FaSearch,
    FaChartLine,
    FaRobot,
} from 'react-icons/fa';
import { RiNewspaperLine } from 'react-icons/ri';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ];

    const features = [
        { name: 'AI Writing Assistant', href: '', icon: FaPenFancy },
        { name: 'Plagiarism Checker', href: '', icon: FaSearch },
        { name: 'Trending News', href: '', icon: FaChartLine, badge: 'HOT' },
        { name: 'AI Editor', href: '', icon: FaRobot },
    ];

    const socialLinks = [
        { icon: FaTwitter, href: 'https://twitter.com/', label: 'Twitter' },
        { icon: FaLinkedinIn, href: 'https://linkedin.com/', label: 'LinkedIn' },
        { icon: FaGithub, href: 'https://github.com/', label: 'GitHub' },
        { icon: FaFacebookF, href: 'https://facebook.com/', label: 'Facebook' },
        { icon: FaInstagram, href: 'https://instagram.com/insightai', label: 'Instagram' },
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <footer className='bg-black text-white  border-t border-gray-200'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    {/* Brand Section */}
                    <motion.div 
                        className="lg:col-span-3"
                        {...fadeInUp}
                    >
                        {/* <Link href="/" className="flex items-center  space-x-2 group">
                            <Image
                            className='bottom-0 left-7 absolute'
                                src="/ins-logo.png"
                                alt="ins-logo.png"
                                width={400}
                                height={250}
                            />
                        </Link> */}
                        <p className="  text-white text-sm mt-44 leading-relaxed">
                            Empowering creators with AI-driven content writing, plagiarism checking, and smart editing tools. Your trusted partner for quality content in the digital age.
                        </p>
                    </motion.div>

                    {/* Features Links */}
                    <motion.div 
                        className="lg:col-span-2"
                        {...fadeInUp}
                    >
                        <h3 className="text-sm font-semibold  text-white uppercase tracking-wider">
                            Features
                        </h3>
                        <motion.ul 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="mt-4 space-y-3"
                        >
                            {features.map((feature) => (
                                <motion.li key={feature.name} variants={fadeInUp}>
                                    <Link
                                        href={feature.href}
                                        className=" text-white hover:text-[#3B82F6] text-sm transition-colors duration-200 flex items-center group"
                                    >
                                        <feature.icon className="h-3.5 w-3.5 mr-2 text-gray-500 group-hover:text-[#3B82F6]" />
                                        {feature.name}
                                        {feature.badge && (
                                            <span className="ml-2 px-1.5 py-0.5 bg-[#FBBF24]  text-white text-[10px] font-bold rounded">
                                                {feature.badge}
                                            </span>
                                        )}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div 
                        className="lg:col-span-2"
                        {...fadeInUp}
                    >
                        <h3 className="text-sm font-semibold  text-white uppercase tracking-wider">
                            Company
                        </h3>
                        <motion.ul 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="mt-4 space-y-3"
                        >
                            {quickLinks.map((link) => (
                                <motion.li key={link.name} variants={fadeInUp}>
                                    <Link
                                        href={link.href}
                                        className=" text-white hover:text-[#3B82F6] text-sm transition-colors duration-200 flex items-center group"
                                    >
                                        <p className="w-1 h-1 bg-gray-600 rounded-full mr-2 group-hover:bg-[#3B82F6]"></p>
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Newsletter & Socials */}
                    <motion.div 
                        className="lg:col-span-5"
                        {...fadeInUp}
                    >
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            <div className="flex items-center space-x-2 mb-3">
                                <RiNewspaperLine className="h-5 w-5 text-[#3B82F6]" />
                                <h3 className="text-sm font-semibold  text-white uppercase tracking-wider">
                                    Newsletter
                                </h3>
                            </div>
                            <p className="text-sm text-gray-800 mb-4">
                                Get weekly AI writing tips, platform updates, and industry news.
                            </p>

                            <form className="space-y-3">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="block w-full pl-10 pr-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg  text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-sm"
                                        required
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full cursor-pointer px-4 py-2.5 bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md flex items-center justify-center group"
                                >
                                    Subscribe Now
                                    <FaArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                                <p className="text-xs text-gray-500 text-center">
                                    Join 10,000+ content creators. No spam, ever.
                                </p>
                            </form>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-sm font-medium  text-white mb-3">
                                Connect With Us
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white hover:bg-[#3B82F6] transition-all duration-200 bg-white p-2 rounded-lg border border-gray-200 shadow-sm"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-gray-200"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-white">
                            © {currentYear} SynapseNews All rights reserved. | Made By <span className="text-[#3B82F6] font-semibold">Bug SlayerS</span>
                        </p>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                            {['privacy', 'terms', 'cookies', 'sitemap', 'accessibility'].map((item) => (
                                <Link 
                                    key={item}
                                    href={`/${item}`} 
                                    className="text-sm text-white hover:text-[#3B82F6] transition-colors capitalize"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;