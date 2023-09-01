import * as React from "react";

export default function Button({ href, children }) {
  return (
    <a
      className="inline-block p-2 no-underline text-[whitesmoke] bg-[rgb(122,113,113)]
        text-center font-bold mb-3 hover:brightness-110 duration-300"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
