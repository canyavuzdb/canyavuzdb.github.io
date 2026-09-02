"use client";

import { useEffect, useState } from "react";
import { getExperiences, getPosts, getProjects, type Experience, type Post, type Project } from "./content";

export function usePosts(type: Post["type"]) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let active = true;
    getPosts(type).then((result) => active && setPosts(result)).catch(() => undefined);
    return () => { active = false; };
  }, [type]);

  return posts;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects).catch(() => undefined);
  }, []);

  return projects;
}

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    getExperiences().then(setExperiences).catch(() => undefined);
  }, []);

  return experiences;
}
