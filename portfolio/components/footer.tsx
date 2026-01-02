import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-4 w-full text-center text-gray-500 text-xs px-4 pointer-events-none">
      <small className="mb-2 block text-xs">
        &copy; 2030 Can. All rights reserved.
      </small>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion, React Email & Resend, Vercel hosting.
      </p>
    </footer>
  );
}
