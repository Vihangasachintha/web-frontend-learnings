import {
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { SiTiktok, SiThreads } from "react-icons/si";

export default function Footer() {
  const iconStyle =
    "cursor-pointer text-2xl hover:scale-125 transition-transform duration-300";

  return (
    <footer className="w-full mt-8">
      <div className="w-full min-h-[200px] bg-pink-600 flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 flex justify-center items-center py-6 md:py-0">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-[100px] h-[100px] object-contain hover:scale-125 transition-transform duration-300"
          />
        </div>
        <div className="w-full md:w-1/3 flex justify-center items-center gap-5 text-white py-6 md:py-0">
          <FaFacebookF className={iconStyle} />
          <FaPinterestP className={iconStyle} />
          <FaInstagram className={iconStyle} />
          <SiTiktok className={iconStyle} />
          <FaYoutube className={iconStyle} />
          <SiThreads className={iconStyle} />
        </div>
        <div className="w-full md:w-1/3 flex justify-center md:justify-start items-center text-white py-6 md:py-0 md:pl-8">
          <div>
            <h2 className="mb-2 font-semibold">CONTACT US</h2>
            <address className="not-italic space-y-1 text-sm">
              <p>Negombo, Sri Lanka</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@velora.com"
                  className="hover:underline"
                >
                  support@velora.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+94771234567" className="hover:underline">
                  +94 77 1234567
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="w-full h-[50px] bg-pink-600 border-t border-gray-400 flex items-center justify-center px-4">
        <p className="text-white text-center text-sm md:text-base">
          Copyright © 2026 Velora.lk | All rights reserved. | Design By
          ForgeImperium
        </p>
      </div>
    </footer>
  );
}
