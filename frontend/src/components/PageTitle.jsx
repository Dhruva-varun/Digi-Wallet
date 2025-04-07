import React from "react";

function PageTitle({ title }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold uppercase text-zinc-700">
        {title}
      </h1>
    </div>
  );
}

export default PageTitle;
