import { IconType } from 'react-icons';
import { AiOutlineHome, AiOutlineUser, AiOutlineProject, AiOutlineTool, AiOutlineHistory, AiOutlineMessage } from 'react-icons/ai';

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