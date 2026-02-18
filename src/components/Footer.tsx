
import React from 'react';
import Link from 'next/link';
import Image from "next/image";

import { RiNewspaperLine } from 'react-icons/ri';

const Footer = () => {
    
const currentYear = new Date().getFullYear();
    

    
    

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
                        
                    </div>
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-semibold text-[#F9FAFB] uppercase tracking-wider">
                            Company
                        </h3>
                        <ul className="mt-4 space-y-3">
                            
                        </ul>
                    </div>
                    <div className="lg:col-span-5">
                        
                        <div className="mt-6">
                            <h4 className="text-sm font-medium text-[#F9FAFB] mb-3">
                                Connect With Us
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                
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