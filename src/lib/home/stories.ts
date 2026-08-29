import type { Story } from "@/types";

/**
 * Homepage inspirational carousel + preview lists.
 * Uses existing Survivor Stories fields (featured, publishedAt, status).
 * Featured stories appear first so the CMS can control homepage presence
 * without a separate carousel collection.
 */
export function selectHomepageStories(stories: Story[], limit = 5): Story[] {
  const live = stories.filter((story) => (story.status ?? "approved") === "approved");
  const featured = live.filter((story) => story.featured);
  const rest = live.filter((story) => !story.featured);
  return [...featured, ...rest].slice(0, limit);
}
