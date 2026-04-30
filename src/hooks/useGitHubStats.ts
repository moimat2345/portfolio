"use client";

import useSWR from "swr";
import type { GitHubData } from "@/lib/github";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGitHubStats() {
  const { data, error, isLoading } = useSWR<GitHubData>("/api/github", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300_000, // 5 minutes
  });

  return { data, error, isLoading };
}
