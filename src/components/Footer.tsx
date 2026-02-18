
import React from 'react';
import Link from 'next/link';
import Image from "next/image";

import { RiNewspaperLine } from 'react-icons/ri';

const Footer = () => {
    

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
                
            </div>
        </footer>
    );
};

export default Footer;