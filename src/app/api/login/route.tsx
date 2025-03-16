import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { reg_no, password } = await req.json();
    
    const cookie = await axios.post(`${process.env.NEXT_PUBLIC_UMSAPI_URL!}/api/v1/user/login`, {
      reg_no: reg_no,
      password: password
    });

    console.log(cookie.data.cookie);
    
    if (!cookie.data.cookie) {
      //@ts-ignore
      return NextResponse.json({ message: cookie.detail });
    }
    
    //@ts-ignore
    return NextResponse.json({ cookie: cookie.data.cookie });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Authentication failed" },
    );
  }
}