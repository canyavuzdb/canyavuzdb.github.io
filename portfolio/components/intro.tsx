/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
export default function Intro() {
  return (
    <section id="home" className="flex flex-col items-center justify-center text-center">
      <div className="relative mb-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.3 }}
        >
            <Image
              src="/photo.jpg"
              alt="MCY portrait"
              width="180"
              height="180"
              quality={95}
              priority={true}
              className="h-40 w-40 rounded-full object-cover grayscale border-4 border-white/10"
            />
        </motion.div>
      </div>

      <motion.h1
        className="mb-4 text-4xl sm:text-5xl font-bold uppercase tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Can Yavuz
      </motion.h1>
      
      <motion.span 
        className="text-lg uppercase tracking-widest text-gray-500 font-mono mb-8 block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
         Backend Developer | .NET Developer | Go 
      </motion.span>

      <motion.div 
        className="flex gap-4 items-center justify-center text-2xl text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <a href="https://github.com/canyavuzdb" target="_blank" className="hover:text-white transition" data-cursor="hover transparent"><BsGithub/></a>
        <a href="https://github.com/mcyithinkso" target="_blank" className="hover:text-white transition" data-cursor="hover transparent"><BsGithub/></a>
        <a href="https://www.linkedin.com/in/mcy96/" target="_blank" className="hover:text-white transition" data-cursor="hover transparent"><BsLinkedin/></a>
        <a href="/Mehmet%20Can%20Yavuz%20CV.pdf" target="_blank" className="hover:text-white transition" title="CV" data-cursor="hover transparent"><HiDownload/></a>
      </motion.div>
    </section>
  );
}
