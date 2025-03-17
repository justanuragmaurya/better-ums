"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Student } from "@/lib/types";
import { Send } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

interface ChatProps {
  chatroom: string;
  title: string;
  userData: Student | null;
}

function Chat({ chatroom, title, userData }: ChatProps) {
  const [socket, setWs] = useState<WebSocket | null>(null);
  const messageRef = useRef<HTMLInputElement|null>(null);
  const [chats, setChat] = useState<any[]>([]);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if(!messageRef.current?.value || !userData) {
      return;
    }

    socket?.send(JSON.stringify({
      type: "chat",
      payload: {
        message: messageRef.current.value,
        reg_no: userData.registration_number,
        name: userData.name,
        chatroom: chatroom.toLowerCase(),
        time: Date.now
      }
    }));
    
    messageRef.current.value = ''; // Clear input after sending
  };

  // ... existing scroll handlers ...
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShouldAutoScroll(isNearBottom);
    }
  };

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [chats, shouldAutoScroll]);

  useEffect(() => {
    if (!chatroom) return;

    const ws = new WebSocket("ws://localhost:8011/");

    ws.onopen = () => {
      setWs(ws);
      ws.send(
        JSON.stringify({
          type: "join",
          payload: { chatroom: chatroom.toLowerCase() },
        })
      );
    };

    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.type === "chatmessage") {
        setChat((prev) => [...prev, messageData.payload]);
      }
    };

    ws.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [chatroom]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-6 py-4 border-b bg-white">
        <h1 className="text-2xl">
          {title}: <span className="font-bold">{chatroom}</span>
        </h1>
      </div>
      
      {/* Rest of the JSX remains the same */}
      <div className="relative flex-1">
        <div className="absolute inset-0 bottom-[4.5rem]">
          <div 
            ref={chatContainerRef} 
            className="h-full overflow-y-auto"
            onScroll={handleScroll}
          >
            <div className="flex flex-col justify-end min-h-full px-6 py-4">
              <div className="space-y-4">
                {chats.map((e, index) => {
                  const isCurrentUser = parseInt(e.reg_no) === parseInt(userData?.registration_number || "0");
                  return (
                    <div 
                      key={index} 
                      className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-xs text-gray-500 mb-1">{e.name}</span>
                      <div 
                        className={`max-w-[80%] px-4 py-2 rounded-2xl break-words ${
                          isCurrentUser 
                            ? 'bg-blue-500 text-white rounded-tr-none' 
                            : 'bg-gray-200 rounded-tl-none'
                        }`}
                      >
                        {e.message}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t bg-white">
          <div className="flex gap-2 max-w-4xl mx-auto px-6 py-4">
            <Input 
              ref={messageRef}
              placeholder="Type your message..." 
              className="flex-1"
            />
            <Button size="icon" onClick={sendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
