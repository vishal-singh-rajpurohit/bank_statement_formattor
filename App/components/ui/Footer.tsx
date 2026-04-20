import {Logo} from "./Logo"
import { FaLinkedinIn, FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer id="contact" className="bg-[#07142c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-base leading-8 text-slate-300">
              Convert bank statements to Tally format in seconds with a faster, simpler finance workflow.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold">Company</h4>
            <ul className="mt-5 space-y-3 text-slate-300">
              <li><a href="#about" className="transition hover:text-white">About Us</a></li>
              <li><a href="#contact" className="transition hover:text-white">Contact</a></li>
              <li><a href="#" className="transition hover:text-white">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold">Product</h4>
            <ul className="mt-5 space-y-3 text-slate-300">
              <li><a href="#tutorial" className="transition hover:text-white">Tutorial</a></li>
              <li><a href="#demo" className="transition hover:text-white">Request Demo</a></li>
              <li><a href="#" className="transition hover:text-white">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold">Legal</h4>
            <ul className="mt-5 space-y-3 text-slate-300">
              <li><a href="#" className="transition hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="transition hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">© 2026 Bankly. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-300">
            <a href="#" className="rounded-full p-2 transition hover:bg-white/10 hover:text-white" aria-label="Facebook">
              <FaSquareFacebook className="h-5 w-5" />
            </a>
            <a href="#" className="rounded-full p-2 transition hover:bg-white/10 hover:text-white" aria-label="LinkedIn">
              <FaLinkedinIn className="h-5 w-5" />
            </a>
            <a href="#" className="rounded-full p-2 transition hover:bg-white/10 hover:text-white" aria-label="Twitter">
              <FaSquareXTwitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}