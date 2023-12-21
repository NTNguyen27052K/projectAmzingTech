import React from "react";
import Lottie from "react-lottie";
import * as animation_loading from "../../Assets/animation/animation_loading.json";
const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation_loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className="flex justify-center items-center opacity-50 bg-white absolute h-full w-full"
      style={{ zIndex: "9999" }}
    >
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default Loading;
