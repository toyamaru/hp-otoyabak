
export type WorkThumbnail = {
    url: string;
    alt: string;
};

export type WorkImage = {
    image: {
        id: number;
        url: string;
        alt: string;
        mime: string;
    };
    comment: string | null;
};

export type WorkOverView = {
    id: number;
    slug: string;
    link: string;
    title: string;
    overview: string | null;
    thumbnail: WorkThumbnail | null;
};

export type WorkDetail = {
    id: number;
    slug: string;
    link: string;
    title: string;
    overview: string | null;
    detail: string | null;
    period: string | null;
    role: string | null;
    year: number | null;
    stack: string[];
    links: string[];
    youtube: string[];
    featured: boolean;
    kind: string | null;
    images: WorkImage[];
    thumbnail: WorkThumbnail | null;
};