"use client"
import "./globals.css";
import { AppContext } from '@/context/AppContext'
import { Provider } from "react-redux";
import { store } from '@/store/store'
import { Header } from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { ProfileWrapper } from "@/components/ui/Models";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`selection:bg-blue-300`}>
      <Provider store={store} >
        <AppContext >
          <body className="">
            <Header />
            <ProfileWrapper />
            {children}
            <Footer />
          </body>
        </AppContext>
      </Provider>
    </html>
  );
}
