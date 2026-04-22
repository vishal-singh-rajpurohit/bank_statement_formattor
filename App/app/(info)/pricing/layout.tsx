import React from "react";
import Script from "next/script";

export default function Layout({children}: Readonly<{
    children: React.ReactNode
}>){
    return (
        <>
        {children}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        </>
    )
}