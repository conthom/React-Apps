import React from 'react';
import Link from 'next/link';
export default function Header(){
    return(
        <header className='fixed top-0'>
        <div className="header-title">
            <h1>Matrix Reduction Practice</h1>
        </div>
        <nav className="header-nav">
            <ul>
                <li><Link href="/">Practice</Link></li>
                <li><Link href="/about">About</Link></li>
            </ul>
        </nav>
        <div className="header-github">
            <a href="https://github.com/conthom" target="_blank" rel="noopener noreferrer">
                <img src="/github-icon.png" alt="GitHub" />
            </a>
        </div>
    </header>
    );
}