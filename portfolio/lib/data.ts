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



export const experiencesData = [
  {
    title: "Full Stack Developer, ithinkso",
    location: "Full-Time",
    description: 
      "I gained comprehensive experience in developing a product from A to Z. I designed the database, designed the patterns to be used, designed the architecture, designed the entire system, and then, on top of that, I single-handedly performed all the processes to bring the application live on Plesk Hosting, enabling a product to be actively used by over 1000+ users. ",
    icon: React.createElement(CgWorkAlt),
    date: "Nov 2024 - Ongoing",
  },
  {
    title: "Full Stack Developer Intern, Mims Yazılım A.Ş",
    location: "Remote",
    description:
      "Gained hands-on experience with Next.js, SQL, Tailwind, Prisma. Co-authored an in-house component library reducing time-to-market by 50%. Architected an in-app window system increasing user productivity.",
    icon: React.createElement(CgWorkAlt),
    date: "Feb 2023 - May 2023",
  },
  {
    title: "Full Stack Developer Intern, Secube Teknoloji AR-GE A.Ş",
    location: "Istanbul",
    description:
      "Gained hands-on experience with .NET, SQL, WPF, DevExpress. Collaborated in the development of integrated software solutions. Assisted in project planning and implementation of efficient applications.",
    icon: React.createElement(CgWorkAlt),
    date: "May 2022 - Sep 2022",
  },
] as const;

export const projectsData = [
  {
    title: "LUMO - Management Software",
    description:
      "Architecture: Microservices with Onion Architecture, SaaS based. Stack: .NET Core, MariaDB, Razor UI, Gateway routing. Security: Advanced Crypto-based encryption. DevOps: Docker Test Databases, Automated Unit Tests. Deployment: Plesk Hosting. Features: Mobile First APIs & Mobile Apps.",
    tags: [".NET", "Microservices", "MariaDB", "Onion Arch", "Razor UI"],
    imageUrl: jamImg,
  },
  {
    title: "Shipyard Parts Tracking",
    description:
      "Architecture: Microservices with Onion Architecture. Stack: .NET Core, MariaDB, Razor UI, Mobile First APIs. Focus: High-precision real-time tracking for manufacturing. DevOps: Docker Test Databases, Unit Tests. Security: Crypto-based data integrity.",
    tags: [".NET", "MariaDB", "Mobile First API", "Docker", "Unit Tests"],
    imageUrl: webautoImg,
  },
  {
    title: "Natural Jam & Marmalade",
    description:
      "Architecture: Microservices-based B2B E-commerce. Stack: Next.js consumer app, .NET API gateway. Infrastructure: RabbitMQ for async messaging, PostgreSQL for refined data. DevOps: Docker containers managed on Azure.",
    tags: ["Next.js", "Microservices", "RabbitMQ", "Docker", "PostgreSQL"],
    imageUrl: jamImg,
  },
  {
    title: "Ekici Web Automation",
    description:
      "Process: Internal workflow automation. Stack: Full-stack React/Next.js. Engineering: Custom component library architecture reducing TTM by 50%. Feature: In-app window management system for multitasking.",
    tags: ["React", "Next.js", "System Design", "Automation"],
    imageUrl: webautoImg,
  },
] as const;

export const skillsData = [
  ".NET",
  "C#",
  "React",
  "Next.js",
  "TypeScript",
  "Go",
  "PostgreSQL",
  "SQL",
  "RabbitMQ",
  "Docker",
  "Microservices",
  "DDD",
  "CQRS",
  "Tailwind",
  "Prisma",
  "Git",
  "CI/CD",
  "OOP",
  "Seemingly Good at Searching",
] as const;
