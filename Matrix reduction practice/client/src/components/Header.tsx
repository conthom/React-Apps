import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function Header(){
    return(
        <header className='fixed top-0 w-full bg-gray-800 text-white py-2 px-4 flex justify-between items-center'>
        <div className="header-title">
            <h1>Matrix Reduction Practice</h1>
        </div>
        <nav className="header-nav">
            <ul className="flex space-x-4">
            <li className="hover:underline"><Link href="/">Practice</Link></li>
            <li className="hover:underline"><Link href="/about">About</Link></li>
            </ul>
        </nav>
        <div className="hover:underline flex items-center space-x-4">
            <a href="https://github.com/conthom" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            <h1>Check out my GitHub!</h1>
            <div className="invert">
                <Image src="/github-icon.png" alt="GitHub" width='25' height='25'/>
            </div>
            </a>
        </div>
    </header>
    );
}