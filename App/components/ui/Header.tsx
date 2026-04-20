"use client"
import React from "react";
import { Logo } from "./Logo"
import { CircleUserRound, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import { toggleProfile } from "@/store/functions/ui";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];


const LoginButton = () => {
  return (
    <button className="rounded-xl px-4 py-2.5 text-base font-medium text-slate-800 transition hover:bg-slate-100">
      Sign In
    </button>
  )
}

const SignUpButton = () => {
  return (
    <button className="rounded-2xl bg-linear-to-r from-blue-600 to-violet-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02]">
      Sign Up
    </button>
  )
}

const ProfileButton = ({open}: {open(): void}) => {
  return (
    <button onClick={open} className="rounded-2xl w-10 h-10 flex justify-center items-center cursor-pointer  bg-linear-to-r from-blue-600 to-violet-600  text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02]">
      <CircleUserRound size={25} />
    </button>
  )
}

export function Header() {
  const disp = useAppDispatch()
  const [open, setOpen] = React.useState(false);
  const is_loggedIn = useAppSelector(state => state.auth.email)

  function openProfile(){
    disp(toggleProfile())
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-base font-medium text-slate-700 transition hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {
            is_loggedIn ? (
              <ProfileButton open={openProfile} />
            ) : (
              <>
                <Link href={'/auth/login'} >
                  <LoginButton />
                </Link>
                <Link href={'/auth/register'} >
                  <SignUpButton />
                </Link>
              </>
            )
          }


        </div>

        <button
          aria-label="Open Menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800">
                Sign In
              </button>
              <button className="rounded-xl bg-linear-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
