"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
      toast.success("Vibe's on buddy!");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") setVariant("REGISTER");
    else setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (data: any) => {
    setIsloading(true);
    try {
      const res = await axios.post("/api/register", data);
      if (res.status == 200) {
        toast.success("Registered Successfully!");
        await handleSignIn("credentials", data);
      }
    } catch (error) {
      toast.error("Something went wrong, couldn't process request!");
    } finally {
      setIsloading(false);
    }
  };

  const handleSignIn = async (action: string, data?: any) => {
    setIsloading(true);
    try {
      const res = await signIn(action, {
        ...data,
        redirect: true,
      });

      if (res?.error) {
        toast.error("Invalid Credentials!");
      } else if (res?.ok) {
        toast.success("Logged In!");
      }
    } catch (error) {
      toast.error("Something went wrong, couldn't process request!");
    } finally {
      setIsloading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (variant === "REGISTER") {
      await handleSignUp(data);
    } else if (variant === "LOGIN") {
      await handleSignIn("credentials", data);
    }
  };

  const socialAction = async (action: string) => {
    await handleSignIn(action);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input id="name" label="Name" register={register} errors={errors} />
          )}
          <Input id="email" label="Email" register={register} errors={errors} />
          <Input
            id="password"
            label="Password"
            register={register}
            errors={errors}
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullwidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>

          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === "LOGIN"
                ? "New to Vibe?"
                : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login in"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
