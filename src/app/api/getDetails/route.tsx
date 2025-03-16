import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { reg_no, password, cookie } = await req.json();
    
    console.log({ reg_no, password, cookie });
    
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_UMSAPI_URL}/api/v1/user/me`,
      { reg_no: reg_no, password: password, cookie: cookie }
    );
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user details' },
      { status: 500 }
    );
  }
}