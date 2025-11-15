import { getWorksOverview } from "@/lib/wp";
import Image from "next/image";
import { WorkCard } from "@/components/work-card";

export default async function Home() {
  const works = await getWorksOverview();
  const featuredWorks = works?.slice(0, 4) ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-24 px-6 py-16 md:px-12 md:py-24">
        {/* Hero */}
        <section className="flex flex-col gap-10 md:flex-row md:items-start md:justify-start">
          <div className="space-y-6">
            <p className="text-sm tracking-[0.2em] text-foreground-sub uppercase">
              Portfolio / OTOYABAK
            </p>
            <h1 className="text-3xl text-foreground font-semibold leading-tight md:text-4xl lg:text-5xl">
              Data Engineer
            </h1>
            <p className="max-w-xl text-foreground-sub text-sm md:text-base">
              いろいろなことをするのが好きです。
              データ基盤や分析、AI系、アプリ開発とかをやりたい。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/works"
                className="rounded-full bg-key px-5 py-2 text-sm font-medium text-foreground transition hover:opacity-90"
              >
                実績を見る
              </a>
              <a
                href="/about"
                className="rounded-full border border-accent px-5 py-2 text-sm font-medium text-accent transition hover:bg-accent hover:text-foreground-on-strong"
              >
                自己紹介
              </a>
            </div>
          </div>
          <div className="relative mt-8 h-48 w-48 shrink-0 overflow-hidden rounded-3xl border border-accent bg-surface md:mt-0 md:h-60 md:w-60">
            <Image
              src="/me.png"
              alt="プロフィールアイコン"
              fill
              sizes="(min-width: 768px) 240px, 192px"
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Works */}
        <section id="works" className="space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Works</h2>
              <p className="text-sm text-foreground-sub">
                直近で関わったプロジェクトの一部です。実績の詳細やコードは順次追加していきます。
              </p>
            </div>
            <a
              href="/works"
              className="text-sm font-medium text-key underline-offset-4 hover:underline"
            >
              全て見る
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {featuredWorks.length > 0 ? (
              featuredWorks.map((work) => (
                <WorkCard
                    key={work.id}
                    id={work.id}
                    slug={work.slug}
                    title={work.title}
                    thumbnail={work.thumbnail}
                    overview={work.overview}
                    link={work.link}
                />
              ))
            ) : (
              <p className="text-sm text-foreground-sub">
                実績データを準備中です。
              </p>
            )}
          </div>
        </section>

        {/* About / Skills */}
        <section id="about" className="grid gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <a
              href="/about"
              className="relative block w-full overflow-hidden rounded-2xl border border-accent bg-surface aspect-[16/9]"
            >
              <Image
                src="/about.png"
                alt="About セクションのビジュアル"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </a>
          </div>

          <div className="space-y-5">
            <a
              href="/skill"
              className="relative block w-full overflow-hidden rounded-2xl border border-accent bg-surface aspect-[16/9]"
            >
              <Image
                src="/techstack.png"
                alt="Tech Stack セクションのビジュアル"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
