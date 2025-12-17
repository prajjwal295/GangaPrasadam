"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Lato, Playfair_Display } from "next/font/google";
import ServicesData from "../static/Services";
import { NextFont } from "next/dist/compiled/@next/font";

/* Fonts */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
});

/* Nav paths */
const paths = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
];

/* Services */
const servicesList = [
  { name: "Ganga Aarti", path: "/services/ganga-aarti" },
  { name: "Vivah Puja", path: "/services/vivah" },
  { name: "Kundli Matching", path: "/services/kundli" },
  { name: "Satyanarayan Puja", path: "/services/satyanarayan" },
  { name: "Navgraha Shanti", path: "/services/navgraha" },
];

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenServices(false);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg border-b border-gray-200 z-50 h-16">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={160}
              height={48}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden sm:flex items-center space-x-8">
            
            {/* Other links */}
            {paths.map((p) => (
              <Link
                key={p.path}
                href={p.path}
                className={`${lato.className} text-gray-700 font-medium hover:text-amber-700 transition`}
              >
                {p.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className={`${lato.className} flex items-center text-gray-700 font-medium`}
              >
                Services
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-3 w-64 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                  {ServicesData.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="block px-5 py-3 text-sm text-gray-700 hover:text-transparent transition-all"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(to right, #8B0000, #DAA520)";
                      
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            

            {/* Contact */}
            <Link
              href="/about#contact-section"
              className="px-4 py-1.5 rounded-md text-white text-sm shadow"
              style={{
                background: "linear-gradient(to right, #8B0000, #DAA520)",
              }}
            >
              Contact Us
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white shadow-md">
            

            {paths.map((p) => (
              <Link
                key={p.path}
                href={p.path}
                className="block px-4 py-3 text-gray-700"
              >
                {p.name}
              </Link>
            ))}

                        {/* Services accordion */}
            <button
              onClick={() => setOpenServices(!openServices)}
              className="w-full flex justify-between items-center px-4 py-3 font-medium"
            >
              Services
              <svg
                className={`h-4 w-4 transition-transform ${openServices ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openServices && (
              <div className="pl-6 pb-2">
                {ServicesData.map((service) => (
                  <Link
                   key={service.id}
                      href={`/services/${service.id}`}
                    className="block py-2 text-sm text-gray-600 hover:text-amber-700"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}


            <Link
              href="/about#contact-section"
              className="block px-4 py-3 text-white"
              style={{
                background: "linear-gradient(to right, #8B0000, #DAA520)",
              }}
            >
              Contact Us
            </Link>
          </div>
        )}
      </nav>

      {/* CONTENT */}
      <Suspense fallback={<div />}>
        <main className="pt-16 flex-1">{children}</main>
      </Suspense>
       <Footer playfairDisplay={playfairDisplay} />
    </div>
  );
}


function Footer({ playfairDisplay }: { playfairDisplay: NextFont }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white/80 backdrop-blur-lg relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-9 w-9">
                <Image
                  fill
                  src="/file.svg"
                  alt="Sonoj Arts"
                  className="object-contain"
                />
              </div>
              {/* Use Playfair Display with gold gradient */}
              <span
                className={`text-xl ${playfairDisplay.className}`}
                style={{
                  background:
                    "linear-gradient(to right, #8B0000 0%, #DAA520 30%, #8B4513 60%, #B8860B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Sonoj Arts
              </span>
            </Link>
            <p
              className={`text-sm text-gray-600 leading-relaxed max-w-sm ${lato.className}`}
            >
              Showcasing the beauty and skill of handmade creations.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col space-y-2">
            <h4
              className={`text-sm font-semibold uppercase tracking-wide ${playfairDisplay.className}`}
              style={{
                background:
                  "linear-gradient(to right, #8B0000 0%, #DAA520 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Navigation
            </h4>
            <div className="flex flex-col space-y-1">
              {paths.map((p) => (
                <Link
                  key={p.path}
                  href={p.path}
                  className={`group text-sm ${lato.className} text-gray-600 hover:text-transparent transition-all duration-300 relative inline-block`}
                >
                  <span className=" transition-colors duration-300">
                    {p.name}
                  </span>
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to right, #8B0000 0%, #DAA520 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {p.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact info column */}
          <div className="flex flex-col space-y-2">
            <h4
              className={`text-sm font-semibold uppercase tracking-wide ${playfairDisplay.className}`}
              style={{
                background:
                  "linear-gradient(to right, #8B0000 0%, #DAA520 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Contact
            </h4>
            <div
              className={`flex flex-col space-y-2 text-sm text-gray-600 ${lato.className}`}
            >
              <a
                href="mailto:sonoj.arts@gmail.com"
                className="hover:text-amber-700 transition-colors"
              >
                sonoj.arts@gmail.com
              </a>
              <a
                href="https://wa.me/9929285047"
                className="hover:text-amber-700 transition-colors"
              >
                +91 9929285047
              </a>
              <div className="flex space-x-3 pt-2">
                <a
                  href="https://www.instagram.com/rivercrafting?igsh=MXNxNG9ocDhlYzdneg=="
                  className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-800 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/9929285047"
                  target="_blank"
                  className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-800 transition-colors"
                >
                  <img
                    src={'/whatsapp.png'}
                    alt="Whatsapp"
                    className="w-4 h-4"
                  >
                  </img>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 border-t border-gray-200 pt-4 text-center text-sm text-gray-500 font-lato">
          © {year} Sonoj Arts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
