import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-[calc(100vh-64px-40px)] w-[94%] mx-auto p-5 my-5 rounded-lg bg-sec-bg">
      {children}
    </div>
  );
};
export default MainLayout;
