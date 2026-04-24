'use client'
import { Coins, Crown } from "lucide-react";
import { PricingCard } from "@/components/ui/Cards"
import Script from "next/script";
import api from "@/config/api_axios";
import { AxiosResponse } from "axios";
import { Api_Create_Order } from "@/types/api_resp";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import { changePrice } from "@/store/functions/temp";
import { ChangeEvent } from "react";


declare global {
  interface Window {
    Razorpay: any;
  }
}

const pricingPlans = [
  {
    title: "Credit Pack",
    price: "₹1",
    suffix: "/ credit",
    description: "Pay only for what you use. Best for occasional conversions.",
    badge: "Flexible",
    icon: Coins,
    features: [
      "₹1 for each credit",
      "Minimum purchase 10 credits",
      "Start from just ₹10",
      "Great for low-volume usage",
    ],
    buttonText: "Buy Credits",
    highlight: false,
  },
  {
    title: "Unlimited Monthly",
    price: "₹200",
    suffix: "/ month",
    description: "Unlimited usage for teams and frequent users who want full access.",
    badge: "Best Value",
    icon: Crown,
    features: [
      "Unlimited credits for 1 month",
      "No usage limit",
      "Best for regular users",
      "Simple flat monthly pricing",
    ],
    buttonText: "Get Unlimited Access",
    highlight: true,
  },
];


const handlePayment = async (money: number) => {
  
  // 1. Create Order from Backend
  const resp: AxiosResponse<Api_Create_Order> = await api.post('/pay/create-order', {
    amount: money
  })

  if (!resp) return

  const { amount, razorpay_order_id, } = resp.data;

  // 2. Open Razorpay
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: amount,
    name: "BANK TO XML",
    description: "Subscription Test",
    order_id: razorpay_order_id,

    handler: async function (resp: any) {
      const verifyResp = await api.post(
        "/pay/verify",
        {
          order_id: resp.razorpay_order_id,
          payment_id: resp.razorpay_payment_id,
          signature: resp.razorpay_signature,
        },
        {
          withCredentials: true,
        }
      );

      console.log("verify response:", verifyResp.data);
    },
    prefill: {
      name: "Vishal Singh",
      email: "vsgamer9595@gmail.com"
    },
    theme: {
      color: "#3399cc"
    }
  }

  const rzp = new window.Razorpay(options)
  rzp.open()
}

export default function PricingPage() {
  const tempAmount = useAppSelector(state=>state.temp.price)

  const disp = useAppDispatch()
  const price = useAppSelector(state => state.temp.price)

  function setPrice(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    disp(changePrice({ price: Number(e.target.value) }))
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-linear-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <section className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Simple pricing for every workflow
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Choose flexible pay-per-credit pricing or unlock unlimited usage with one monthly plan.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard onPlanChange={setPrice} price={price} key={plan.title} handleFunc={()=>handlePayment(plan.badge === "Best Value"? 200 : tempAmount)} plan={plan} />
          ))}
        </div>
      </section>
    </main>
  );
}
