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
      <div className=" w-full h-[200px] bg-pink-600 pt-15">
        <div>
          <div></div>
          <div
            className="w-[30%] pl-15 text-white"
            style={{ display: "flex", gap: "20px", fontSize: "24px" }}
          >
            <FaFacebookF className={iconStyle} />
            <FaPinterestP className={iconStyle} />
            <FaInstagram className={iconStyle} />
            <SiTiktok className={iconStyle} />
            <FaYoutube className={iconStyle} />
            <SiThreads className={iconStyle} />
          </div>
        </div>
      </div>
      <div className="w-full h-[50px] bg-pink-600 border-t-1 border-gray-400 flex items-center justify-center">
        <p className="text-white">
          Copyright © 2026 Velora.lk | All rights reserved. | Design By
          ForgeImperium
        </p>
      </div>
    </footer>
  );
}
