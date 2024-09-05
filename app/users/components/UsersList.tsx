"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";

interface UsersListProps {
  items: User[];
}

const UsersList: React.FC<UsersListProps> = ({ items }) => {
  const { isOpen } = useConversation();
  return (
    <aside
      className={clsx(
        ` fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 bg-[#bfd5ca] mb-1`,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">People</div>
        </div>
        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};
export default UsersList;
