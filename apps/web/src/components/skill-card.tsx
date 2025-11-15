import Image from "next/image";
import { Skill } from "@/types/skill";

const stripTags = (value: string) => value.replace(/<[^>]+>/g, "");

type SkillCardProps = {
    skill: Skill;
};

export const SkillCard = ({ skill }: SkillCardProps) => {
    const summaryText =
        typeof skill.summary === "string" && skill.summary.length > 0
            ? stripTags(skill.summary)
            : "詳細は順次追加予定です。";

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-accent/60 bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-key sm:flex-row">
            <div className="relative h-40 w-full flex-shrink-0 overflow-hidden rounded-xl bg-background/30 sm:h-32 sm:w-32">
                {skill.thumbnail ? (
                    <Image
                        src={skill.thumbnail.url}
                        alt={skill.thumbnail.alt || skill.title || "skill thumbnail"}
                        fill
                        sizes="(min-width: 768px) 128px, 160px"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.3em] text-foreground-sub">
                        No Image
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-3">
                <h3
                    className="text-lg font-semibold leading-snug"
                    dangerouslySetInnerHTML={{ __html: skill.title }}
                />
                {skill.years && (
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-foreground-sub">
                        {skill.years}
                    </p>
                )}
                <p className="text-sm text-foreground-sub">{summaryText}</p>
            </div>
        </div>
    );
};

