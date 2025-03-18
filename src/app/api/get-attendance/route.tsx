import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_UMSAPI_URL}/api/v1/user/attendance`,
    {
      reg_no: body.reg_no,
      password: body.password,
      cookie: body.cookie,
    }
  );
  return NextResponse.json(response.data);
}
