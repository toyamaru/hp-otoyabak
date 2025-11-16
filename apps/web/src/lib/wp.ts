// lib/wp.ts
import { cache } from "react";
import { WorkOverView, WorkDetail, WorkImage, WorkThumbnail } from "@/types/work";
import { Skill } from "@/types/skill";
import { Metadata } from "next";
const WP = process.env.WORDPRESS_API_URL || "";

export const fetchGrobal = cache(
    async (): Promise<{ metadata: Metadata; siteIconUrl: string | null; siteTitle: string | null; siteSubTitle: string | null }> => {
    const defaultMetadata: Metadata = {
        title: "デフォルト",
        description: "デフォルト",
        icons: {
            icon: [
                {
                    url: "/favicon.ico",
                    sizes: "32x32",
                    type: "image/x-icon",
                },
            ],
        },
    };
    try {
        const res = await fetch(WP, { next: { revalidate: 3600 } });
        if (!res.ok) {
            return {
                metadata: defaultMetadata,
                siteIconUrl: null,
                siteTitle: null,
                siteSubTitle: null,
            };
        }

        const data: any = await res.json();
        console.log(data);
        const siteName = data.name as string | undefined;
        const siteDescription = data.description as string | undefined;
        const siteSubTitle = data.description as string | undefined;
        const siteIconUrlRaw = data.site_icon_url as string | undefined;
        const siteUrl = (data.url || data.home) as string | undefined;

        let siteIconUrl = siteIconUrlRaw;

        const metadata: Metadata = {
            title: siteName || defaultMetadata.title,
            description: siteDescription || defaultMetadata.description,
            icons: siteIconUrl
                ? {
                    icon: [
                        {
                            url: siteIconUrl,
                            sizes: "32x32",
                            type: "image/png",
                        },
                    ],
                }
                : defaultMetadata.icons,
        };

        return {
            metadata,
            siteIconUrl: siteIconUrl ?? null,
            siteTitle: siteName || null,
            siteSubTitle: siteSubTitle || null,
        };
    } catch {
        return {
            metadata: defaultMetadata,
            siteIconUrl: null,
            siteTitle: null,
            siteSubTitle: null,
        };
    }
});

export const getHomeData = cache(async () => {
    const [xxx] = await Promise.all([
        fetch(""),
        fetch("")
    ])
});


const fetchAllWorks = async () => {
    const works_fetch_options = { next: { revalidate: 300, tags: ["works"] } };
    const per_page = 50;
    const buildWorksUrl = (page: number) =>
        `${WP}/wp/v2/work?per_page=${per_page}&page=${page}&status=publish&_embed=wp:featuredmedia`;

    const firstRes = await fetch(buildWorksUrl(1), works_fetch_options);
    if (!firstRes.ok) {
        throw new Error("Failed to fetch works");
    }
    const totalPages = Number(firstRes.headers.get("X-WP-TotalPages") ?? "1");
    const firstPageData = await firstRes.json();

    if (totalPages <= 1) {
        return firstPageData;
    }

    const restPages = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, idx) => idx + 2).map((page) =>
            fetch(buildWorksUrl(page), works_fetch_options).then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch works page ${page}`);
                }
                return res.json();
            }),
        ),
    );

    return [firstPageData, ...restPages].flat();
};

const fetchAllSkills = async () => {
    const skills_fetch_options = { next: { revalidate: 300, tags: ["skills"] } };
    const buildSkillsUrl = (page: number) =>
        `${WP}/wp/v2/skill`;

    const firstRes = await fetch(buildSkillsUrl(1), skills_fetch_options);
    if (!firstRes.ok) {
        throw new Error("Failed to fetch skills");
    }
    const firstPageData = await firstRes.json();

    return firstPageData;
};

const sanitizeString = (value: unknown): string | null => {
    if (typeof value !== "string") {
        return null;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
};

const getOverview = (item: any): string | null => {
    const meta = item.meta ?? {};
    return (
        sanitizeString(item.overview) ?? // 新RESTトップレベル
        sanitizeString(meta.work_overview) ?? // 互換
        sanitizeString(item.excerpt?.rendered) ?? // 次善
        null
    );
};

const getDetail = (item: any): string | null => {
    const meta = item.meta ?? {};
    return (
        sanitizeString(item.detail) ?? // 新RESTトップレベル
        sanitizeString(meta.work_detail) ?? // 互換
        sanitizeString(item.content?.rendered) ?? // 次善
        null
    );
};

const getThumbnail = (item: any): WorkThumbnail | null => {
    const customImage = item.images?.[0]?.image;
    const embeddedMedia = item._embedded?.["wp:featuredmedia"]?.[0];

    const thumbnailUrl = customImage?.url ?? embeddedMedia?.source_url ?? null;

    if (!thumbnailUrl) {
        return null;
    }

    return {
        url: thumbnailUrl,
        alt:
            customImage?.alt ??
            embeddedMedia?.alt_text ??
            embeddedMedia?.title?.rendered ??
            item.title?.rendered ??
            "work thumbnail",
    };
};

const normalizeStringArray = (input: unknown): string[] => {
    if (!Array.isArray(input)) {
        return [];
    }
    return input
        .map((value) => {
            if (typeof value === "string") {
                return value.trim();
            }
            if (value == null) {
                return "";
            }
            return String(value).trim();
        })
        .filter((value) => value.length > 0);
};

const normalizeImages = (item: any): WorkImage[] => {
    if (!Array.isArray(item.images)) {
        return [];
    }

    return item.images
        .map((entry: any) => {
            const data = entry?.image;
            if (!data?.url) {
                return null;
            }
            return {
                image: {
                    id: typeof data.id === "number" ? data.id : 0,
                    url: data.url,
                    alt: data.alt ?? item.title?.rendered ?? "work image",
                    mime: data.mime ?? "image/*",
                },
                comment: sanitizeString(entry?.comment),
            };
        })
        .filter((value: WorkImage | null): value is WorkImage => Boolean(value));
};

const toWorkOverview = (item: any): WorkOverView => ({
    id: item.id,
    slug: item.slug,
    link: item.link,
    title: item.title?.rendered ?? "",
    overview: getOverview(item),
    thumbnail: getThumbnail(item),
});

const toWorkDetail = (item: any): WorkDetail => {
    const meta = item.meta ?? {};
    const stack = normalizeStringArray(item.stack ?? meta.work_stack);
    const links = normalizeStringArray(item.links ?? meta.work_links);
    const youtube = normalizeStringArray(item.youtube ?? meta.work_youtube);
    const images = normalizeImages(item);

    const thumbnail = getThumbnail(item);

    const yearValue = () => {
        if (typeof item.year === "number") {
            return item.year;
        }
        if (typeof meta.work_year === "number") {
            return meta.work_year;
        }
        if (typeof item.year === "string") {
            const parsed = parseInt(item.year, 10);
            return Number.isNaN(parsed) ? null : parsed;
        }
        if (typeof meta.work_year === "string") {
            const parsed = parseInt(meta.work_year, 10);
            return Number.isNaN(parsed) ? null : parsed;
        }
        return null;
    };

    return {
        ...toWorkOverview(item),
        detail: getDetail(item),
        period: sanitizeString(item.period ?? meta.work_period),
        role: sanitizeString(item.role ?? meta.work_role),
        year: yearValue(),
        stack,
        links,
        youtube,
        featured: typeof item.featured === "boolean" ? item.featured : Boolean(meta.work_featured),
        kind: sanitizeString(item.kind),
        images: images.length > 0 ? images : [],
        thumbnail,
    };
};

const getSkillSummary = (item: any): string | null => {
    const meta = item.meta ?? {};
    return (
        sanitizeString(meta.skill_summary) ??
        sanitizeString(item.excerpt?.rendered) ??
        sanitizeString(item.content?.rendered) ??
        null
    );
};

const getSkillYears = (item: any): string | null => {
    const meta = item.meta ?? {};
    return sanitizeString(meta.skill_years ?? item.skill_years);
};

const getSkillThumbnail = (item: any): WorkThumbnail | null => {
    const embeddedMedia = item._embedded?.["wp:featuredmedia"]?.[0];
    const url = embeddedMedia?.source_url ?? null;

    if (!url) {
        return null;
    }

    return {
        url,
        alt:
            embeddedMedia?.alt_text ??
            embeddedMedia?.title?.rendered ??
            item.title?.rendered ??
            "skill thumbnail",
    };
};

const toSkill = (item: any): Skill => ({
    id: item.id,
    slug: item.slug,
    title: item.title?.rendered ?? "",
    summary: getSkillSummary(item),
    years: getSkillYears(item),
    thumbnail: getSkillThumbnail(item),
});

export const getWorksOverview = cache(async (): Promise<WorkOverView[]> => {
    const raw = await fetchAllWorks();
    
    const works: WorkOverView[] = raw.map((item: any) => toWorkOverview(item));

    return works;
});

export const getWorkDetail = cache(async (wid: string): Promise<WorkDetail | null> => {
    if (!wid) {
        return null;
    }

    const isNumeric = Number.isInteger(Number(wid));
    const searchParams = new URLSearchParams({
        status: "publish",
        _embed: "wp:featuredmedia",
    });

    if (isNumeric) {
        searchParams.append("include", wid);
    } else {
        searchParams.append("slug", wid);
    }

    const res = await fetch(`${WP}/wp/v2/work?${searchParams.toString()}`, {
        next: { revalidate: 300, tags: ["works", `work-${wid}`] },
    });

    if (!res.ok) {
        return null;
    }

    const data = await res.json();
    const item = Array.isArray(data) ? data[0] : data;

    if (!item) {
        return null;
    }

    return toWorkDetail(item);
});

export const getSkills = cache(async (): Promise<Skill[]> => {
    const raw = await fetchAllSkills();
    console.log(raw);
    return raw.map((item: any) => toSkill(item));
});