"use client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/conversations", {
        userId: data.id,
      });
      router.push(`/conversations/${res.data.id}`);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className=" w-full relative flex items-center space-x-3 bg-[#05a4a44d] mb-1 
        p-3 hover:bg-[#05a4a4a4] rounded-lg transition-transform duration-300 cursor-pointer hover:scale-105"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserBox;
