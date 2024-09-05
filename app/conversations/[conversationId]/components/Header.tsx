"use client";

import React, { useMemo, useState } from "react";
import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import { HiChevronLeft, HiEllipsisHorizontal, HiPhone } from "react-icons/hi2";
import Link from "next/link";
import AvatarGroup from "@/app/components/AvatarGroup";
import ProfileDrawer from "./ProfileDrawer";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  const handleStartCall = async () => {
    const newTab = window.open(`/room/${conversation.id}`, "_blank");
    newTab?.addEventListener("load", () => {
      newTab?.history.replaceState(null, "", newTab.location.href);
    });
  };

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className=" bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            className="clg:hiddencblockctext-[#227B94]chover:text-[#227B94]ctransitionccursor-pointer"
            href="/conversations"
          >
            <HiChevronLeft size={32} />
          </Link>

          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser!} />
          )}

          <div className="flex flex-col">
            <div>{conversation.name || otherUser?.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          {conversation.isGroup && (
            <HiPhone
              size={28}
              className="text-[#227B94] cursor-pointer hover:text-[#227B94] transition"
              onClick={handleStartCall}
            />
          )}
          <HiEllipsisHorizontal
            size={32}
            onClick={() => setDrawerOpen(true)}
            className="text-[#227B94] cursor-pointer hover:text-[#227B94] transition"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
