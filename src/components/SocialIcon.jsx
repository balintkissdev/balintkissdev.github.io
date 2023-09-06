import * as React from "react";

export default function SocialIcon({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-14 p-4 bg-[whitesmoke] rounded-full justify-center text-[#383838] transition ease-in-out hover:bg-[burlywood] duration-300"
    >
      {children}
    </a>
  );
}
