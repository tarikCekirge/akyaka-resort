"use client";

import Image from "next/image";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className={`flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium cursor-pointer ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <Image
        src='https://authjs.dev/img/providers/google.svg'
        alt='Google logo'
        height={24}
        width={24}
      />
      <span>{pending ? "Signing in..." : "Continue with Google"}</span>
    </button>
  );
}
