import * as React from "react";

export default function SocialIcon({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-block w-14 py-4 bg-[whitesmoke] rounded-full text-[#383838] text-center fa-xl transition ease-in-out hover:bg-[burlywood] duration-300"
    >
      {children}
    </a>
  );
}
