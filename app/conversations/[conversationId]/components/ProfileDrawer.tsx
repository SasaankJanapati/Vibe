"use client";

import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Fragment, useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from "@/app/components/Avatar";
import ConfirmModal from "./ConfirmModal";
import useActiveList from "@/app/hooks/useActiveList";
import AvatarGroup from "@/app/components/AvatarGroup";
import UserBox from "@/app/users/components/UserBox";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const otherUser = useOtherUser(data);

  const [confirmModal, setConfirmModal] = useState(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const joinedDate = useMemo(() => {
    return otherUser?.createdAt
      ? format(new Date(otherUser.createdAt), "MMMM d, yyyy")
      : "";
  }, [otherUser?.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser?.name;
  }, [data.name, otherUser?.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) return `${data.users.length} members`;
    return isActive ? "Active" : "Offline";
  }, [data, isActive]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmModal}
        onClose={() => setConfirmModal(false)}
      />
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-[#bfd5ca] py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            onClick={onClose}
                            className=" rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none 
                            focus:ring-2 focus:ring-[#227B94] focus:ring-offset-2"
                          >
                            <span className="sr-only">Close panel</span>
                            <IoClose size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">
                          {!data.isGroup ? (
                            <Avatar user={otherUser!} />
                          ) : (
                            <AvatarGroup users={data.users!} />
                          )}
                        </div>
                        <div>{title}</div>
                        <div className="text-sm text-gray-500">
                          {statusText}
                        </div>
                        <div className="flex gap-10 my-8">
                          <div
                            onClick={() => setConfirmModal(true)}
                            className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                          >
                            <div className="w-10 h-10 bg-[#bfd5ca] rounded-full flex items-center justify-center">
                              <IoTrash size={20} />
                            </div>
                            <div className="text-sm font-light text-[#05a4a4dc]">
                              Delete
                            </div>
                          </div>
                        </div>
                        <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                          <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                            {!data.isGroup ? (
                              <>
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    {otherUser?.email}
                                  </dd>
                                </div>
                                <hr />
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                    Joined
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    <time dateTime={joinedDate}>
                                      {joinedDate}
                                    </time>
                                  </dd>
                                </div>
                              </>
                            ) : (
                              <div className="px-5">
                                <div className="flex-col">
                                  <div className="text-2xl font-bold text-neutral-800 py-4">
                                    Members
                                  </div>
                                </div>
                                {data?.users.map((item) => (
                                  <UserBox key={item.id} data={item} />
                                ))}
                              </div>
                            )}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileDrawer;
