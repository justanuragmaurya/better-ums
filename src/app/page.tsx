"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    if(localStorage.getItem("reg_no") && localStorage.getItem("pass") && localStorage.getItem("cookie") ){
      router.push("/dashboard")
    }else{
      console.log("chud gaye guru")
    }
  })
  return (
    <div className="flex-col items-center justify-center">
      <h1 className="text-5xl">Better UMS</h1>
    </div>
  );
}
