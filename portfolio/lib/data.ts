import React from "react";
import { IconType } from "react-icons";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineProject,
  AiOutlineTool,
  AiOutlineHistory,
  AiOutlineMessage,
} from "react-icons/ai";
import { CgWorkAlt } from "react-icons/cg";
import jamImg from "@/public/jam.png";
import webautoImg from "@/public/webautomation.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
    icon: AiOutlineHome,
  },
  {
    name: "About",
    hash: "#about",
    icon: AiOutlineUser,
  },
  {
    name: "Projects",
    hash: "#projects",
    icon: AiOutlineProject,
  },
  {
    name: "Skills",
    hash: "#skills",
    icon: AiOutlineTool,
  },
  {
    name: "Experience",
    hash: "#experience",
    icon: AiOutlineHistory,
  },
  {
    name: "Contact",
    hash: "#contact",
    icon: AiOutlineMessage,
  },
] as const;

export const Experience = [{}] as const;

export const projectsData = [
  {
    title: "Natural Jam & Marmalade Store",
    description:
      "A startup project currently underway, a B2B project, aims to list more than 40 products to users.",
    tags: ["Docker", ".Net", "Microservice", "RabbitMq", "PostgreSQL"],
    imageUrl: jamImg,
  },
  {
    title: "Ekici Web Automation",
    description:
      "I worked as a full-stack developer on this automation project for 4 months. A multifunctional internal software for company employees.",
    tags: ["React", "Next.js", "Sql", "Tailwind", "Prisma"],
    imageUrl: webautoImg,
  },
] as const;

export const skillsData = [
  "React",
  "Next.js",
  "Tailwind",
  "Typescript",
  "Prisma",
  "Git",
  "Docker",
  "OOP",
  "PostgreSQL",
  ".NET",
  "RabbitMQ",
  "CQRS",
  "DDD",
  "SharedKernel",
  "CI/CD",
] as const;

export const experiencesData = [
  {
    title: "Full-Stack Developer, Mims Yazılım A.Ş",
    location: "Istanbul",
    description:
      "I worked in this job for 4 months when I was in my last year at university and I gained full-stack experience by taking part in a full-time real project.",
    icon: React.createElement(CgWorkAlt),
    date: "2023",
  },
  {
    title: "Full-Stack Developer, Secube Teknoloji AR-GE A.Ş. ",
    location: "Istanbul",
    description:
      "As a 3rd year university student, I worked in this job for 5 months and gained full-stack experience by taking part in a full-time real project.",
    icon: React.createElement(CgWorkAlt),
    date: "2022",
  }
] as const;
