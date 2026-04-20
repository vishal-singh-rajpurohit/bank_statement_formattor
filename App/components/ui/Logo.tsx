import {FileText} from "lucide-react";
import logo from "@/public/logo.png"
import Image from "next/image";


export function Logo() {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center justify-center rounded-2xl ">
        <Image src={logo} alt="logo of image" className=" h-8 w-10"/>
      </div>
      <span className="text-2xl font-semibold uppercase tracking-tight text-slate-950"><span className="text-blue-700">Bank</span><span className="text-orange-500">2XML</span></span>
    </div>
  );
}