import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const chatroom = searchParams.get('chatroom');

  if (!chatroom) {
    return NextResponse.json({ error: 'Chatroom parameter is required' }, { status: 400 });
  }

  try {
    // First, find the chatroom by name
    const chatroomData = await prisma.chatroom.findUnique({
      where: { chatroom },
      include: { messages: true }
    });

    if (!chatroomData) {
      return NextResponse.json({ messages: [] });
    }

    // Transform messages into the expected format
    const messages = chatroomData.messages.map((msg) => ({
      id: msg.id,
      name: msg.name,
      message: msg.content,
      reg_no: msg.reg_no,
      time: msg.time.getTime(),
      chatroom: chatroom
    }));

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json({ error: 'Failed to fetch chat history' }, { status: 500 });
  }
}