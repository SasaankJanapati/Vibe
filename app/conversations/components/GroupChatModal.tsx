"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/Input";
import SelectUsers from "@/app/components/SelectUsers";
import Button from "@/app/components/Button";

interface GroupChatModalProps {
  users: User[];
  isOpen: boolean;
  onClose: () => void;
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  users,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const payload = {
      ...data,
      isGroup: true,
    };
    try {
      await axios.post("/api/conversations", payload);
      router.refresh();
      onClose();
    } catch (error: any) {
      toast.error("An error occurred while creating the group chat.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="spave-y-12">
          <div className="border-b broder-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than two people
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Name"
                id="name"
                disabled={isLoading}
                required
                errors={errors}
              />
              <SelectUsers
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Button
            disabled={isLoading}
            onClick={onClose}
            type="button"
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default GroupChatModal;
