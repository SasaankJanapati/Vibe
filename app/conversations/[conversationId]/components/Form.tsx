"use client";

import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadWidget } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    if (result?.info?.secure_url) {
      axios.post("/api/messages", {
        image: result.info.secure_url,
        conversationId,
      });
    }
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-2 w-full max-w-[94%]">
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
        onSuccess={(result, { widget }) => {
          handleUpload(result);
          widget.close();
        }}
      >
        {({ open }: { open: () => void }) => (
          <button onClick={open}>
            <HiPhoto size={30} className="text-[#227B94] mx-2" />
          </button>
        )}
      </CldUploadWidget>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          className="rounded-full p-2 bg-[#227B94] cursor-pointer hover:bg-[#227B94] transition"
          type="submit"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
