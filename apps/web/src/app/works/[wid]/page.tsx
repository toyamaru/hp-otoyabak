import { getWorkDetail } from "@/lib/wp";
import { notFound } from "next/navigation";
import Link from "next/link";
import { WorkImageSlider } from "@/components/work-image-slider";

type WorkDetailPageProps = {
    params: Promise<{ wid: string }>;
};

const stripTags = (value: string) => value.replace(/<[^>]+>/g, "");

const renderRichText = (input: string | null) => {
    if (!input) {
        return null;
    }
    const hasHtml = /<[^>]+>/.test(input);
    if (hasHtml) {
        return <div className="text-sm leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: input }} />;
    }
    return (
        <div className="text-sm leading-relaxed text-foreground" style={{ whiteSpace: "pre-line" }}>
            {input}
        </div>
    );
};

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
    const { wid } = await params;
    const work = await getWorkDetail(wid);

    if (!work) {
        notFound();
    }

    const plainTitle = stripTags(work.title || "");

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-16 md:px-12 md:py-24">
                <Link href="/works" className="text-sm text-accent underline-offset-2 hover:underline">
                    ← Works に戻る
                </Link>

                <header className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-foreground-sub">Work Detail</p>
                    <h1 className="text-3xl font-semibold md:text-4xl" dangerouslySetInnerHTML={{ __html: work.title }} />
                    {work.overview ? (
                        <p className="text-sm text-foreground-sub md:text-base" style={{ whiteSpace: "pre-line" }}>
                            {stripTags(work.overview)}
                        </p>
                    ) : (
                        <p className="text-sm text-foreground-sub">概要情報は準備中です。</p>
                    )}
                </header>

                <section>
                    <WorkImageSlider images={work.images} title={plainTitle} />
                </section>

                <section className="grid gap-8 md:grid-cols-[2fr_1fr]">
                    <article className="space-y-6 rounded-3xl border border-accent bg-surface p-6 shadow-sm">
                        <div>
                            <h2 className="text-lg font-semibold">プロジェクト概要</h2>
                            <p className="mt-1 text-sm text-foreground-sub">実施背景や成果物などの詳細です。</p>
                        </div>
                        {renderRichText(work.detail) ?? (
                            <p className="text-sm text-foreground-sub">詳細情報は順次掲載します。</p>
                        )}
                    </article>

                    <aside className="space-y-6 rounded-3xl border border-accent bg-surface p-6 shadow-sm">
                        <h3 className="text-base font-semibold">基本情報</h3>
                        <dl className="grid gap-4 text-sm text-foreground">
                            {work.year && (
                                <div>
                                    <dt className="text-foreground-sub">実施年</dt>
                                    <dd className="mt-1">{work.year}</dd>
                                </div>
                            )}
                            {work.period && (
                                <div>
                                    <dt className="text-foreground-sub">期間</dt>
                                    <dd className="mt-1">{work.period}</dd>
                                </div>
                            )}
                            {work.role && (
                                <div>
                                    <dt className="text-foreground-sub">担当</dt>
                                    <dd className="mt-1">{work.role}</dd>
                                </div>
                            )}
                            {work.kind && (
                                <div>
                                    <dt className="text-foreground-sub">種別</dt>
                                    <dd className="mt-1">{work.kind}</dd>
                                </div>
                            )}
                        </dl>

                        {work.stack.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold">使用技術</h4>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {work.stack.map((tech) => (
                                        <span key={tech} className="rounded-full border border-accent/50 px-3 py-1 text-xs text-foreground-sub">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {work.links.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold">関連リンク</h4>
                                <ul className="mt-2 space-y-1 text-sm">
                                    {work.links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-accent underline-offset-2 hover:underline"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {work.youtube.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold">YouTube</h4>
                                <ul className="mt-2 space-y-1 text-sm">
                                    {work.youtube.map((url) => (
                                        <li key={url}>
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-accent underline-offset-2 hover:underline"
                                            >
                                                {url}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </aside>
                </section>
            </main>
        </div>
    );
}
