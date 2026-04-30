import { SITE, GITHUB_STATS_BASE, GITHUB_STATS_THEME } from "./constants";

const USERNAME = SITE.github;

function buildThemeParams(): string {
  return Object.entries(GITHUB_STATS_THEME)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
}

export function getStatsUrl(): string {
  return `${GITHUB_STATS_BASE}?username=${USERNAME}&${buildThemeParams()}&show_icons=true`;
}

export function getTopLangsUrl(): string {
  return `${GITHUB_STATS_BASE}/top-langs/?username=${USERNAME}&layout=compact&${buildThemeParams()}`;
}

export function getStreakUrl(): string {
  return `https://github-readme-streak-stats.herokuapp.com/?user=${USERNAME}&background=${GITHUB_STATS_THEME.bg_color}&ring=${GITHUB_STATS_THEME.title_color}&fire=${GITHUB_STATS_THEME.title_color}&currStreakLabel=${GITHUB_STATS_THEME.text_color}&sideLabels=${GITHUB_STATS_THEME.text_color}&currStreakNum=${GITHUB_STATS_THEME.text_color}&sideNums=${GITHUB_STATS_THEME.text_color}&dates=${GITHUB_STATS_THEME.text_color}80&hide_border=true&border_radius=12`;
}

export interface GitHubData {
  lastPush: string | null;
  statsUrl: string;
  topLangsUrl: string;
  streakUrl: string;
}

export async function fetchGitHubData(): Promise<GitHubData> {
  let lastPush: string | null = null;

  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=1`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 300 },
      }
    );

    if (res.ok) {
      const events = await res.json();
      if (events.length > 0 && events[0].created_at) {
        lastPush = events[0].created_at;
      }
    }
  } catch {
    // Fail silently — chip will show "N/A"
  }

  return {
    lastPush,
    statsUrl: getStatsUrl(),
    topLangsUrl: getTopLangsUrl(),
    streakUrl: getStreakUrl(),
  };
}
