"use client";

import { FormEvent } from "react";

export default function NewsLetter() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className="font-oswald flex w-full flex-col items-center justify-center gap-4 bg-[#333] p-8 text-center text-white">
      <h2 className="text-xl">HABER BÜLTENİ</h2>
      <p>En son gelişmelerden haberdar olmak için haber bültenimize üye olun</p>
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border-none bg-white p-2 text-black outline-0 placeholder:text-gray-500"
          placeholder="E-Posta Adresiniz..."
        />
        <button type="submit" className="bg-theme-primary w-full p-2">
          ÜYE OL
        </button>
      </form>
    </section>
  );
}
