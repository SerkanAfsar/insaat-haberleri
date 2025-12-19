"use client";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

export default function ShareArticle() {
  console.log(window.location.href);
  return (
    <section className="font-oswald flex w-full items-center justify-start gap-4">
      <h5 className="font-bold">Haberi Paylaş:</h5>
      <div className="flex flex-wrap gap-4">
        <FacebookShareButton url={window.location.href}>
          <div className="rounded-full bg-blue-600 p-2 text-white">
            <Facebook size={20} />
          </div>
        </FacebookShareButton>
        <TwitterShareButton url={window.location.href}>
          <div className="rounded-full bg-sky-500 p-2 text-white">
            <Twitter size={20} />
          </div>
        </TwitterShareButton>
        <LinkedinShareButton url={window.location.href}>
          <div className="rounded-full bg-sky-500 p-2 text-white">
            <Linkedin size={20} />
          </div>
        </LinkedinShareButton>
      </div>
    </section>
  );
}
