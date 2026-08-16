import type { AdminRole } from "@/types";

export const ROLE_RANK: Record<AdminRole, number> = {
  viewer: 0,
  author: 1,
  editor: 2,
  admin: 3,
};

export const ROLE_LABEL: Record<AdminRole, string> = {
  admin: "Super Admin",
  editor: "Editor",
  author: "Author",
  viewer: "Viewer",
};

export function hasMinRole(role: AdminRole | null | undefined, min: AdminRole) {
  if (!role) return false;
  return ROLE_RANK[role] >= ROLE_RANK[min];
}

export function canDeleteContent(role: AdminRole | null | undefined) {
  return hasMinRole(role, "editor");
}

export function canModerateStories(role: AdminRole | null | undefined) {
  return hasMinRole(role, "editor");
}

export function canManageUsers(role: AdminRole | null | undefined) {
  return role === "admin";
}

export function canManageSettings(role: AdminRole | null | undefined) {
  return role === "admin";
}
