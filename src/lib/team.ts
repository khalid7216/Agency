import fs from "fs/promises";
import path from "path";

import defaultMembers from "@/data/team.json";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge?: string;
  bio?: string;
  imageUrl?: string;
  skills?: string[];
  order: number;
}

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/team.json");

export async function getMembers(): Promise<TeamMember[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const members: TeamMember[] = JSON.parse(data);
    return members.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code: string }).code === "ENOENT"
    ) {
      return (defaultMembers as TeamMember[]).sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    console.warn("Could not read team file from disk, using bundled fallback:", error);
    return (defaultMembers as TeamMember[]).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
}

export async function saveMembers(members: TeamMember[]): Promise<void> {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(members, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to team database:", error);
    throw error;
  }
}

export async function addMember(member: Omit<TeamMember, "id">): Promise<TeamMember> {
  const members = await getMembers();
  
  const slug = member.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  
  const id = `${slug}-${Date.now().toString().slice(-4)}`;
  
  const newMember: TeamMember = {
    ...member,
    id,
    order: Number(member.order) || members.length + 1,
  };
  
  members.push(newMember);
  await saveMembers(members);
  return newMember;
}

export async function updateMember(id: string, updatedData: Partial<Omit<TeamMember, "id">>): Promise<TeamMember | null> {
  const members = await getMembers();
  const index = members.findIndex((m) => m.id === id);
  
  if (index === -1) {
    return null;
  }
  
  members[index] = {
    ...members[index],
    ...updatedData,
    order: updatedData.order !== undefined ? Number(updatedData.order) : members[index].order,
  };
  
  await saveMembers(members);
  return members[index];
}

export async function deleteMember(id: string): Promise<boolean> {
  const members = await getMembers();
  const index = members.findIndex((m) => m.id === id);
  
  if (index === -1) {
    return false;
  }
  
  members.splice(index, 1);
  await saveMembers(members);
  return true;
}

export async function getMemberById(id: string): Promise<TeamMember | null> {
  const members = await getMembers();
  const target = id.toLowerCase().trim();
  return (
    members.find(
      (m) =>
        m.id.toLowerCase() === target ||
        m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === target
    ) || null
  );
}
