import * as React from "react";

export default function Button({ href, className, children }) {
  return (
    <a
      className={`
        inline-block p-2 mb-3
        no-underline text-[whitesmoke] bg-[rgb(122,113,113)]
        text-center font-bold
        hover:brightness-110 duration-300
        ${className}
      `}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
