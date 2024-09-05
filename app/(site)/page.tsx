import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#bfd5ca]">
      <div>
        {/* <Image
          alt="Logo"
          height="48"
          width="48"
          className="mx-auto w-auto"
          src="/images/logo.jpg"
        /> */}
      </div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Welcome to Vibe
      </h2>
      <AuthForm />
    </div>
  );
}
