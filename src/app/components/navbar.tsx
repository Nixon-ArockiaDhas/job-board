"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./components.module.css";

type NavbarProps = {
  otherPage: boolean;
};

const menuItems = [
  { name: "Home", href: "" },
  { name: "Jobs", href: "/job", default: true },
  { name: "Services", href: "" },
];

export function Navbar({ otherPage }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    router.push("/add-job");
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <div className="text-xl font-bold text-gray-800">
        <Link href="/">
          <img src="/logo.svg" alt="Logo" className="h-5" />
        </Link>
      </div>

      <button
        className="md:hidden focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          className={`w-6 h-6 ${styles.hamburger}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:items-center absolute md:static top-16 gap-10 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out`}
      >
        <ul className="flex flex-col md:flex-row gap-6 p-6 md:p-0">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium ${
                  pathname === item.href || (pathname === "/" && item.default)
                    ? `${styles.textActiveNav}`
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={handleClick}
          className={`${
            otherPage ? "invisible" : "visible"
          } px-4 py-2 mx-6 md:mx-0 mb-6 md:mb-0 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition ${
            styles.button
          }`}
        >
          Add Job
        </button>
      </div>
    </nav>
  );
}
