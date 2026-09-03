"use client";

import { useEffect, useState } from "react";
import { getExperiences, getPosts, getPostsPage, getProjects, type Experience, type Post, type PostPage, type Project } from "./content";

const postCache = new Map<Post["type"], Post[]>();
const postRequests = new Map<Post["type"], Promise<Post[]>>();
const postPageCache = new Map<string, PostPage>();
const postPageRequests = new Map<string, Promise<PostPage>>();
let projectsCache: Project[] | undefined;
let projectsRequest: Promise<Project[]> | undefined;
let experiencesCache: Experience[] | undefined;
let experiencesRequest: Promise<Experience[]> | undefined;

export function preloadPosts(type: Post["type"]) {
  if (postCache.has(type)) return Promise.resolve(postCache.get(type)!);
  if (!postRequests.has(type)) {
    postRequests.set(type, getPosts(type).then((posts) => {
      postCache.set(type, posts);
      return posts;
    }).finally(() => postRequests.delete(type)));
  }
  return postRequests.get(type)!;
}

export function preloadPostsPage(type: Post["type"], page: number, pageSize = 10) {
  const key = `${type}:${page}:${pageSize}`;
  if (postPageCache.has(key)) return Promise.resolve(postPageCache.get(key)!);
  if (!postPageRequests.has(key)) {
    postPageRequests.set(key, getPostsPage(type, page, pageSize).then((result) => {
      postPageCache.set(key, result);
      return result;
    }).finally(() => postPageRequests.delete(key)));
  }
  return postPageRequests.get(key)!;
}

export function preloadProjects() {
  if (projectsCache) return Promise.resolve(projectsCache);
  if (!projectsRequest) {
    projectsRequest = getProjects().then((projects) => {
      projectsCache = projects;
      return projects;
    }).finally(() => { projectsRequest = undefined; });
  }
  return projectsRequest;
}

export function preloadExperiences() {
  if (experiencesCache) return Promise.resolve(experiencesCache);
  if (!experiencesRequest) {
    experiencesRequest = getExperiences().then((experiences) => {
      experiencesCache = experiences;
      return experiences;
    }).finally(() => { experiencesRequest = undefined; });
  }
  return experiencesRequest;
}

export function usePosts(type: Post["type"]) {
  const [posts, setPosts] = useState<Post[]>(() => postCache.get(type) ?? []);

  useEffect(() => {
    let active = true;
    preloadPosts(type).then((result) => active && setPosts(result)).catch(() => undefined);
    return () => { active = false; };
  }, [type]);

  return posts;
}

export function usePostsPage(type: Post["type"], page: number, pageSize = 10) {
  const key = `${type}:${page}:${pageSize}`;
  const [result, setResult] = useState<PostPage | null>(() => postPageCache.get(key) ?? null);

  useEffect(() => {
    let active = true;
    setResult(postPageCache.get(key) ?? null);
    preloadPostsPage(type, page, pageSize).then((next) => {
      if (!active) return;
      setResult(next);
      if (page < next.totalPages) void preloadPostsPage(type, page + 1, pageSize);
    }).catch(() => undefined);
    return () => { active = false; };
  }, [key, page, pageSize, type]);

  return result;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => projectsCache ?? []);

  useEffect(() => {
    preloadProjects().then(setProjects).catch(() => undefined);
  }, []);

  return projects;
}

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>(() => experiencesCache ?? []);

  useEffect(() => {
    preloadExperiences().then(setExperiences).catch(() => undefined);
  }, []);

  return experiences;
}
