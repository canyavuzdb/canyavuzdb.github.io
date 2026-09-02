"use client";

import React from "react";
import InlineNavigation from "./inline-navigation";
import NameSwitch from "./name-switch";
import ProfileCard from "./profile-card";

type AboutProps = {
  children?: React.ReactNode;
};

export default function About({ children }: AboutProps) {
  return (
    <section className="w-full max-w-[44rem] text-left leading-8 scroll-mt-28" id="about">
      <header className="mb-14">
        <div className="mb-10 flex items-center gap-4">
          <ProfileCard />
          <div>
            <p className="text-base text-white/55">Hello, I&apos;m</p>
            <NameSwitch />
            <p className="-mt-2 text-sm font-light text-white/50">Full-stack developer · Istanbul</p>
          </div>
        </div>
        <InlineNavigation />
      </header>
      <hr className="soft-divider mx-auto w-[calc(100%-2px)] max-w-[42.875rem]" />
      {children ? (
        <div className="mt-12">{children}</div>
      ) : (
        <div className="mt-12 max-w-[43rem] space-y-7 text-[0.9375rem] leading-7 tracking-[-0.01em] text-white/75 sm:text-base sm:leading-7">
          <p>
            I&apos;m drawn to the part of software development where a vague problem slowly becomes something people can use every day. That usually means moving between product decisions, interfaces, data, and the details that make a system feel dependable.
          </p>
          <p>
            I&apos;ve spent the last few years building SaaS products and business tools for real operational needs. I enjoy the balance between making something work today and making sure it can keep working tomorrow.
          </p>
          <p>
            I&apos;m always learning in parallel — trying new tools, revisiting familiar ones, and building small things simply to see what I can learn from them. Some of that work lives on{" "}
            <a href="https://github.com/canyavuzdb" target="_blank" rel="noreferrer" className="border-b border-current text-white transition-opacity hover:opacity-70">GitHub</a>
            {" "}and I keep my professional profile on{" "}
            <a href="https://www.linkedin.com/in/mcy96/" target="_blank" rel="noreferrer" className="border-b border-current text-white transition-opacity hover:opacity-70">LinkedIn</a>.
          </p>
          <p className="way-easter-egg pt-2 text-sm italic tracking-normal text-white/50">
            This is the way.
            <span className="lightsaber" aria-hidden="true"><span /></span>
          </p>
        </div>
      )}
    </section>
  );
}
