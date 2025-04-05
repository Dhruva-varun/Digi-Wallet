import React from "react";
import { Spin } from "antd";

function Loader({ fullscreen = false }) {
  return (
    <div className={`flex justify-center items-center ${fullscreen ? 'min-h-screen' : 'h-48'}`}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
}

export default Loader;
