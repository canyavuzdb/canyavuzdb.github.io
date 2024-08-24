"use client";

import React,{useState, createContext, useContext} from "react";
import {links} from "@/lib/data";

type SectionLink = typeof links[number]["name"];

type ActiveLinkContextProviderProps = {
    children: React.ReactNode;
  };
type ActiveLinkContextType = {
    activeLink: SectionLink;
    setActiveLink: React.Dispatch<React.SetStateAction<SectionLink>>;
    LastTimeClick:number;
    setLastTimeClick:React.Dispatch<React.SetStateAction<number>>;
  };
  export const ActiveLinkContext =
  createContext<ActiveLinkContextType | null>(null);

export default function ActiveLinkContextProvider({children}: ActiveLinkContextProviderProps) {
    const [activeLink, setActiveLink] = useState<SectionLink>("Home");
    const [LastTimeClick, setLastTimeClick]=useState(0);
  return <ActiveLinkContext.Provider value={
    {
        activeLink: activeLink,
        setActiveLink: setActiveLink,
        LastTimeClick:LastTimeClick,
        setLastTimeClick:setLastTimeClick 
    }
  }>{children}</ActiveLinkContext.Provider>;
}

export function useActiveLinkContext() {
    const context = useContext(ActiveLinkContext);
  
    if (context === null) {
      throw new Error(
        "useActiveLinkContext must be used within an ActiveLinkContextProvider"
      );
    }
  
    return context;
  }