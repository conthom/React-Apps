import React from 'react';
import Link from 'next/link';
export default function Header(){
    return(
        <header className='fixed top-0 w-full bg-gray-800 text-white py-2 px-4 flex justify-between items-center'>
        <div className="header-title">
            <h1>Matrix Reduction Practice</h1>
        </div>
        <nav className="header-nav">
            <ul className="flex space-x-4">
            <li><Link href="/">Practice</Link></li>
            <li><Link href="/about">About</Link></li>
            </ul>
        </nav>
        <div className="invert">
            <a href="https://github.com/conthom" target="_blank" rel="noopener noreferrer">
                <img src="/github-icon.png" alt="GitHub" 
                width ='25'
                height = '25'/>
            </a>
        </div>
    </header>
    );
}