/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { HiEye } from "react-icons/hi";
import { useInView } from "react-intersection-observer";
import { useActiveLinkContext } from "@/context/active-link-context";

export default function intro() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const { setActiveLink } = useActiveLinkContext();
  useEffect(() => {
    if (inView) {
      setActiveLink("Home");
    }
  }, [inView, setActiveLink]);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.3,
            }}
          >
            <Image
              src="/photo.jpg"
              alt="MCY portrait"
              width="224"
              height="224"
              quality="100"
              priority={true}
              className="h-32 w-32  rounded-full object-cover border-[0.25rem] border-slate-300 shadow-xl hover:scale-125 transition"
            />
          </motion.div>
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "tween",
          duration: 0.5,
          delay: 0.3,
        }}
      >
        Hello, my name is{" "}
        <span className="font-bold text-gray-700">Can Yavuz</span>. I am a
        dedicated <span className="font-bold">full-stack developer</span> with{" "}
        <span className="font-bold">1+ years</span> of hands-on experience in
        building <span className="italic">websites and applications</span>. I am
        passionate about creating high-quality digital products and{" "}
        <span className="underline">
          continuously strive to enhance my skills and expertise
        </span>
        . My focus is on delivering impactful solutions while constantly
        improving as a developer.
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
        }}
      >
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
        >
          Contact me here{" "}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1.5 transition" />
        </Link>
        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          href="/Mehmet%20Can%20Yavuz%20CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume{" "}
          <HiEye className="opacity-60 group-hover:translate-y-0.5 transition" />
        </a>
        <a
          className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://www.linkedin.com/in/mcy96/"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://github.com/canyavuzdb"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
