"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [loading,setloading] = useState(false);
  
  const registeration_number_ref = useRef<HTMLInputElement>(null);
  const password_ref = useRef<HTMLInputElement>(null);

  const handleLogin = async()=>{
    setloading(true);
    
    const response = await axios.post("/api/login",{reg_no:registeration_number_ref.current?.value ,password:password_ref.current?.value})

    if(!response.data.cookie){
      toast("Error logging in , please check you registeration number and password or try again later : " + response.data.detial)
      setloading(false)
      return
    }

    //setting the authentication stuff. 
    window.localStorage.setItem("reg_no",registeration_number_ref.current?.value!);
    window.localStorage.setItem("pass",password_ref.current?.value!);
    window.localStorage.setItem("cookie",response.data.cookie);
    setloading(false)
    



    //redirecting user to the dashboard
    router.push("/dashboard");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your UMS registeration number and your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Registeration Number</Label>
                <Input
                  id="regno"
                  ref={registeration_number_ref}
                  placeholder="12XXXXXX"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" ref={password_ref} required />
              </div>
              <div className="flex flex-col gap-3">
                <Button disabled={loading} className="w-full" onClick={()=>{handleLogin()}}>
                  Login
                </Button>
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
