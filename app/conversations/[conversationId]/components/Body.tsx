"use client";

import { useState, useRef, useEffect } from "react";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { BeatLoader } from "react-spinners";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    if (status !== "loading") {
      axios.post(`/api/conversations/${conversationId}/seen`);
    }
  }, [conversationId, status]);

  useEffect(() => {
    if (status === "loading") return;

    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId, status]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <BeatLoader color="#006373" size={20} />
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{
        backgroundImage: "url('/images/bg1.jpeg')",
        borderRadius: "16px",
      }}
    >
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
