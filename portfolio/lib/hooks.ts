import { useActiveLinkContext } from "@/context/active-link-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { SectionLink } from "./types";

export function useSectionInView(sectionLink: SectionLink, threshold = 0.75) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveLink, LastTimeClick } = useActiveLinkContext();

  useEffect(() => {
    if (inView && Date.now() - LastTimeClick > 1000) {
      setActiveLink(sectionLink);
    }
  }, [inView, setActiveLink, LastTimeClick, sectionLink]);

  return {
    ref,
  };
}
