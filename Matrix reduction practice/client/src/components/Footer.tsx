import React from 'react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white py-2 px-4 flex justify-between items-center">
      <div className="text-sm">
        Made with ❤️ using <strong>Next.js</strong>
      </div>
      <div className="text-sm">
        <span>Matrix Reduction Practice Platform © 2025</span>
      </div>
      <div className="text-sm">
        <a
          href="https://github.com/conthom"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Visit GitHub
        </a>
      </div>
    </footer>
  );
}
