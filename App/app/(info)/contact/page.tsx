'use client'
import React from "react";
import {  Phone, MessageSquare } from "lucide-react";
import { FaSquareInstagram} from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";


export default function ContactPage() {
  
  const [formData, setFormData] = React.useState({
    mobile: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-lg border border-slate-200 space-y-5 sm:p-8"
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mobile Number
              </label>
              <div className="flex items-center gap-3 border rounded-xl px-4">
                <Phone className="h-5 w-5 text-slate-400" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="flex-1 py-3 outline-none text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Message
              </label>
              <div className="flex gap-3 border rounded-xl px-4 py-3">
                <MessageSquare className="h-5 w-5 text-slate-400 mt-1" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write your message..."
                  className="flex-1 outline-none resize-none text-sm sm:text-base"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-blue-600 to-violet-600 py-3 text-white font-semibold hover:scale-[1.02] transition"
            >
              Send Message
            </button>
          </form>

          {/* Social Section */}
          <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-200 sm:p-8 flex flex-col justify-center">
            <h2 className="text-xl font-bold text-slate-900">Connect with us</h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Follow us on social media for updates and support.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="https://www.linkedin.com/in/vishal-singh-rajpurohit-a89953335/"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white hover:scale-110 transition"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="https://www.instagram.com/youvraj_raj_dhurasni/"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-white hover:scale-110 transition"
              >
                <FaSquareInstagram size={20} />
              </a>

              <a
                href="https://github.com/vishal-singh-rajpurohit"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white hover:scale-110 transition"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
