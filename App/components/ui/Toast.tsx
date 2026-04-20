"use client"
import { toggleToastOpen } from "@/store/functions/ui";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import React from "react";

export function Toast() {

  const disp = useAppDispatch()
  const type = useAppSelector(state=>state.ui.toastType)
  const message = useAppSelector(state=>state.ui.toastMessage)
  const visible = useAppSelector(state=>state.ui.toastOpen)


  function close(){
    disp(toggleToastOpen({data: {
        toastMessage: '',
        toastOpen: false,
        toastType: "success"
    }}))
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      close?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [close]);

  if (!visible) return null;

  return (
    <div className=" hii fixed top-5 right-5 z-50 px-4">
      <div
        className={`min-w-62.5 rounded-xl px-4 py-3  shadow-lg text-white text-sm font-medium transition-all ${
          type === "success"
            ? "bg-green-600"
            : "bg-red-600"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
