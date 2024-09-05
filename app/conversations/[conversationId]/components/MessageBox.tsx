"use client";

import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import Image from "next/image";
import { useState, useEffect } from "react";
import ImageModal from "../../components/ImageModal";

interface MessageBoxProps {
  isLast: boolean;
  data: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
  const { data: session, status } = useSession();
  const [isOwn, setIsOwn] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      setIsOwn(session.user.email === data.sender?.email);
    }
  }, [session?.user?.email, data.sender?.email]);

  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4 ml-2", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const messageContainer = clsx(
    "flex flex-col gap-1 p-2",
    isOwn ? "bg-teal-600 rounded-md" : "bg-yellow-300 rounded-md",
    "flex-grow"
  );
  const messageBody = clsx(
    "text-sm flex-1 w-full overflow-hidden",
    isOwn ? "bg-teal-500 text-white" : "bg-yellow-200 text-gray-800",
    data.image ? "p-0" : "rounded-md py-2 px-3"
  );

  const formatDate = (date: Date) => {
    if (isToday(date)) {
      return `Today ${format(date, "HH:mm")}`;
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, "HH:mm")}`;
    } else {
      return format(date, "PPp");
    }
  };

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender!} />
      </div>
      <div className={body}>
        <div className={messageContainer}>
          <div
            className={clsx(
              "text-sm font-bold",
              isOwn ? "text-white" : "text-gray-800"
            )}
          >
            {data.sender.name}
          </div>
          <div
            className={clsx(
              "text-xs font-bold",
              isOwn ? "text-gray-200" : "text-gray-600"
            )}
          >
            {formatDate(data?.createdAt!)}
          </div>
          <div className={messageBody}>
            <ImageModal
              src={data.image}
              isOpen={imageModalOpen}
              onClose={() => setImageModalOpen(false)}
            />
            {data.image ? (
              <Image
                onClick={() => setImageModalOpen(true)}
                alt="Image"
                height="288"
                width="288"
                src={data.image}
                className="object-cover cursor-pointer hover:scale-110 transition translate"
              />
            ) : (
              <div>{data.body}</div>
            )}
          </div>
          {isLast && isOwn && seenList.length > 0 && (
            <div
              className={clsx(
                "text-xs",
                isOwn ? "text-white" : "text-gray-800"
              )}
            >
              {`Seen by ${seenList}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
