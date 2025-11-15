import { WorkCard } from "@/components/work-card";
import { getWorksOverview } from "@/lib/wp";

const stripTags = (value: string) => value.replace(/<[^>]+>/g, "");

export default async function WorksPage() {
    const works = await getWorksOverview();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-16 md:px-12 md:py-24">
                <header className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-foreground-sub">Portfolio</p>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold md:text-4xl">Works</h1>
                        <p className="text-sm text-foreground-sub md:text-base">
                            関わった案件や個人プロジェクトの概要です。詳細は各実績ページでご覧いただけます。
                        </p>
                    </div>
                </header>

                {works.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-accent/50 bg-surface p-6 text-sm text-foreground-sub">
                        表示できる実績がまだありません。準備が整い次第公開します。
                    </p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {works.map((work) => {
                            return <WorkCard
                                key={work.id}
                                id={work.id}
                                slug={work.slug}
                                title={work.title}
                                thumbnail={work.thumbnail}
                                overview={work.overview ?? "詳細は実績ページでご覧ください。"}
                                link={work.link}
                            />;
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}