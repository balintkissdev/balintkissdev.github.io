import * as React from "react";

export default function ResumeSection({ id, title, children }) {
  return (
    <>
      <section
        id={id}
        className="max-w-6xl flex p-8 sm:p-12 items-center"
      >
        <div class="w-full">
          {title && <h2 className="mb-3">{title}</h2>}
          {children}
        </div>
      </section>
      <hr className="m-0" />
    </>
  );
}
