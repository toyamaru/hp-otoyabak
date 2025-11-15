import type { WorkThumbnail } from "@/types/work";

export type Skill = {
    id: number;
    slug: string;
    title: string;
    summary: string | null;
    years: string | null;
    thumbnail: WorkThumbnail | null;
};

