
import React from 'react';
import Link from 'next/link';
import Image from "next/image";
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
        { name: 'AI Writing Assistant', href: '/features/ai-writing', icon: FaPenFancy },
        { name: 'Plagiarism Checker', href: '/features/plagiarism', icon: FaSearch },
        { name: 'Trending News', href: '/trending', icon: FaChartLine, badge: 'HOT' },
        { name: 'AI Editor', href: '/editor', icon: FaRobot },
    ];

    const socialLinks = [
        { icon: FaTwitter, href: 'https://twitter.com/', label: 'Twitter' },
        { icon: FaLinkedinIn, href: 'https://linkedin.com/', label: 'LinkedIn' },
        { icon: FaGithub, href: 'https://github.com/', label: 'GitHub' },
        { icon: FaFacebookF, href: 'https://facebook.com/', label: 'Facebook' },
        { icon: FaInstagram, href: 'https://instagram.com/insightai', label: 'Instagram' },
    ];
    

    return (
        <footer className='bg-[#111827]'>
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-3">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <Image
                                src="/logo.png"
                                alt=""
                                width={200}
                                height={200}
                            />
                        </Link>
                        <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                            Empowering creators with AI-driven content writing, plagiarism checking, and smart editing tools. Your trusted partner for quality content in the digital age.
                        </p>


                    </div>
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-semibold text-[#F9FAFB] uppercase tracking-wider">
                            Features
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {features.map((feature) => (
                                <li key={feature.name}>
                                    <Link
                                        href={feature.href}
                                        className="text-gray-300 hover:text-[#3B82F6] text-sm transition-colors duration-200 flex items-center group"
                                    >
                                        <feature.icon className="h-3.5 w-3.5 mr-2 text-gray-500 group-hover:text-[#3B82F6]" />
                                        {feature.name}
                                        {feature.badge && (
                                            <span className="ml-2 px-1.5 py-0.5 bg-[#FBBF24] text-[#111827] text-[10px] font-bold rounded">
                                                {feature.badge}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        
                    </div>
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-semibold text-[#F9FAFB] uppercase tracking-wider">
                            Company
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-[#3B82F6] text-sm transition-colors duration-200 flex items-center group"
                                    >
                                        <span className="w-1 h-1 bg-gray-600 rounded-full mr-2 group-hover:bg-[#3B82F6]"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:col-span-5">
                        <div className="bg-[#1F2937] rounded-xl p-6 border border-gray-700">
                            <div className="flex items-center space-x-2 mb-3">
                                <RiNewspaperLine className="h-5 w-5 text-[#3B82F6]" />
                                <h3 className="text-sm font-semibold text-[#F9FAFB] uppercase tracking-wider">
                                    Newsletter
                                </h3>
                            </div>
                            <p className="text-sm text-gray-300 mb-4">
                                Get weekly AI writing tips, platform updates, and industry news.
                            </p>

                            <form className="space-y-3">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="block w-full pl-10 pr-3 py-2.5 bg-[#111827] border border-gray-700 rounded-lg text-[#F9FAFB] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-sm"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer px-4 py-2.5 bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center group"
                                >
                                    Subscribe Now
                                    
                                </button>
                                <p className="text-xs text-gray-500 text-center">
                                    Join 10,000+ content creators. No spam, ever.
                                </p>
                            </form>
                        </div>
                        <div className="mt-6">
                            <h4 className="text-sm font-medium text-[#F9FAFB] mb-3">
                                Connect With Us
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-[#3B82F6] transition-all duration-200 hover:scale-110 bg-[#1F2937] p-2 rounded-lg border border-gray-700"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400">
                            © {currentYear} SynapseNews All rights reserved. | Made By <span className="text-[#FBBF24]"></span> Bug SlayerS
                        </p>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                            <Link href="/privacy" className="text-sm text-gray-400 hover:text-[#3B82F6] transition-colors">
                                Privacy
                            </Link>
                            <Link href="/terms" className="text-sm text-gray-400 hover:text-[#3B82F6] transition-colors">
                                Terms
                            </Link>
                            <Link href="/cookies" className="text-sm text-gray-400 hover:text-[#FBBF24] transition-colors">
                                Cookies
                            </Link>
                            <Link href="/sitemap" className="text-sm text-gray-400 hover:text-[#10B981] transition-colors">
                                Sitemap
                            </Link>
                            <Link href="/accessibility" className="text-sm text-gray-400 hover:text-[#3B82F6] transition-colors">
                                Accessibility
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;