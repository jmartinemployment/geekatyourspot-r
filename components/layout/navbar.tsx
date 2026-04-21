"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "AI Solutions", href: "/ai-solutions" },
];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      <header className="bg-white shadow-sm">
        <div className="container">
          <nav className="w-fullsticky top-0 z-40">
            <div className="w-full flex items-center h-16">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/GeekAtYourSpot.svg"
                  alt="Geek @ Your Spot logo"
                  width={116}
                  height={48}
                  priority
                />
              </Link>
              {/* <button
                type="button"
                className="ml-auto p-2 rounded border-0 bg-transparent cursor-pointer"
                aria-label="Open menu"
                aria-expanded={sidebarOpen}
                aria-controls="sidebar-menu"
                onClick={() => setSidebarOpen(true)}
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button> */}
            </div>
          </nav>
        </div>

        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          id="sidebar-menu"
          role="navigation"
          aria-label="Main navigation"
          className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar header */}
          <div
            className="flex items-center justify-between p-4 border-b"
            style={{ backgroundColor: "#023059" }}
          >
            <h2 className="text-white font-semibold text-lg mb-0">Menu</h2>
            <button
              id="geek-sidebar-close"
              className="text-white p-2 bg-transparent border-0 cursor-pointer"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar nav */}
          <nav className="p-4">
            <ul className="list-none m-0 p-0 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 rounded text-gray-800 no-underline hover:bg-gray-100 transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </header>
  );
}
