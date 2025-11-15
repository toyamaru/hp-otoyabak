import Link from "next/link";
import Image from "next/image";
import { WorkOverView } from "@/types/work";

const stripTags = (value: string) => value.replace(/<[^>]+>/g, "");

export const WorkCard = (work: WorkOverView) => {
    const overviewText =
        typeof work.overview === "string" && work.overview.length > 0
            ? stripTags(work.overview)
            : "詳細は実績ページでご覧ください。";

    return (
        <Link
            key={work.id}
            href={`/works/${work.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-accent/70 bg-surface text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-key sm:flex-row"
        >
            <div className="relative h-44 w-full flex-shrink-0 overflow-hidden bg-background/40 sm:h-auto sm:w-48">
                {work.thumbnail ? (
                    <Image
                        src={work.thumbnail.url}
                        alt={work.thumbnail.alt || work.title || "work thumbnail"}
                        fill
                        sizes="(min-width: 768px) 20vw, 60vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                        priority={false}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-[0.3em] text-foreground-sub">
                        No Image
                    </div>
                )}
            </div>

            <div className="flex h-full flex-1 flex-col gap-2 p-4 sm:p-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-foreground-sub">
                    Work
                </p>
                <h2
                    className="text-base font-semibold leading-snug sm:text-lg"
                    dangerouslySetInnerHTML={{ __html: work.title }}
                />
                <p className="line-clamp-3 text-xs text-foreground-sub sm:text-sm">{overviewText}</p>

                <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-accent transition group-hover:gap-2 sm:text-sm">
                    詳細を見る
                    <span aria-hidden>→</span>
                </span>
            </div>
        </Link>
    );
};