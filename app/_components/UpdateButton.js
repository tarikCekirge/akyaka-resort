"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function UpdateButton({
  loadingText = "Updating...",
  children,
}) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className='bg-accent-500 px-8 cursor-pointer  text-center py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'
    >
      {pending ? loadingText : children}
    </button>
  );
}
