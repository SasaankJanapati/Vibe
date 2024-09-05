import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    const seenArray = lastMessage.seen || [];
    if (!userEmail) return false;
    return seenArray.some((user) => user.email === userEmail);
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an image";
    if (lastMessage?.body) return lastMessage.body;
    return "Started a coversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        ` w-full relative flex items-center space-x-3 hover:bg-[#05a4a4a4] rounded-lg transition-transform duration-300 cursor-pointer hover:scale-105 p-2 mb-1`,
        selected ? "bg-[#05a4a4dc]" : "bg-[#05a4a44d]"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser!} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser?.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-600 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              ` truncate text-sm`,
              hasSeen ? "text-gray-600" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ConversationBox;
