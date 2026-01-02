import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-xl font-light uppercase tracking-[0.2rem] mb-6 text-center text-white/90">
      {children}
    </h2>
  );
}