"use client";
import { isAuthenticated } from "@/actions";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard(Component: any) {
  return function IsAuth(props:any) {
    
    const auth = false;

    console.log("Auth Status ::: ", auth)

    useEffect(() => {
      if (!auth) {
        return redirect("/login")
      }
    }, [])

    if (!auth) {
      return null;
    }
    
    return <Component {...props} />


  }
  
}