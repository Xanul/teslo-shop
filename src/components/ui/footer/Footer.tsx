import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16 sm:mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-6 sm:mb-12">
          {/* Brand Section */}
          <div className="flex flex-col">
            <Link href="/" className="mb-4">
              <span className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                Teslo Shop
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Premium quality products for modern living. Your trusted online shopping destination.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
            <nav className="flex flex-col gap-1 sm:gap-2">
              <Link href="/products" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Shop All
              </Link>
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                New Arrivals
              </Link>
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Best Sellers
              </Link>
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Sale
              </Link>
            </nav>
          </div>

          {/* Customer Support */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Support</h3>
            <nav className="flex flex-col gap-1 sm:gap-2">
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Contact Us
              </Link>
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Shipping Info
              </Link>
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Returns
              </Link>
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Legal & Social */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Company</h3>
            <nav className="flex flex-col gap-1 sm:gap-2">
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                About Us
              </Link>
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Careers
              </Link>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8 sm:pt-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-gray-600 text-sm text-center sm:text-left">
            &copy; {currentYear} Teslo Shop. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF size={16} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={16} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};