"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import type { WorkImage } from "@/types/work";

type WorkImageSliderProps = {
    images: WorkImage[];
    title: string;
};

const fallbackMessage = "画像は準備中です。";

export function WorkImageSlider({ images, title }: WorkImageSliderProps) {
    const validImages = Array.isArray(images) ? images.filter((image) => Boolean(image?.image?.url)) : [];
    const [index, setIndex] = useState(0);

    if (validImages.length === 0) {
        return (
            <div className="flex min-h-64 items-center justify-center rounded-3xl border border-dashed border-accent/60 bg-surface p-10 text-sm text-foreground-sub">
                {fallbackMessage}
            </div>
        );
    }

    const total = validImages.length;
    const current = validImages[index];

    const goTo = useCallback(
        (delta: number) => {
            setIndex((prev) => {
                const next = (prev + delta + total) % total;
                return next;
            });
        },
        [total],
    );

    const goToIndex = useCallback((nextIndex: number) => {
        setIndex(nextIndex);
    }, []);

    return (
        <div className="space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-accent bg-background/40">
                <Image
                    key={current.image.id ?? current.image.url}
                    src={current.image.url}
                    alt={current.image.alt || current.comment || `${title} image ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    priority={index === 0}
                />

                <button
                    type="button"
                    aria-label="前の画像"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-foreground/30 bg-surface/80 px-3 py-2 text-sm text-foreground transition hover:bg-key"
                    onClick={() => goTo(-1)}
                >
                    ←
                </button>
                <button
                    type="button"
                    aria-label="次の画像"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-foreground/30 bg-surface/80 px-3 py-2 text-sm text-foreground transition hover:bg-key"
                    onClick={() => goTo(1)}
                >
                    →
                </button>

                {current.comment && (
                    <div className="absolute inset-x-0 bottom-0 bg-surface/80 px-4 py-3 text-sm text-foreground">
                        {current.comment}
                    </div>
                )}
            </div>

            <div className="flex items-center justify-center gap-2">
                {validImages.map((item, dotIndex) => (
                    <button
                        key={`${item.image.url}-${dotIndex}`}
                        type="button"
                        aria-label={`画像 ${dotIndex + 1} を表示`}
                        aria-current={dotIndex === index}
                        className={`h-2.5 w-2.5 rounded-full transition ${dotIndex === index ? "bg-accent" : "bg-accent/30 hover:bg-accent/50"}`}
                        onClick={() => goToIndex(dotIndex)}
                    />
                ))}
            </div>
        </div>
    );
}

