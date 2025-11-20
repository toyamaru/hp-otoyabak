import Image from "next/image";

const highlights = [
    { label: "得意領域", value: "データ基盤 / MLOps / Web アプリ" },
    { label: "主なスキル", value: "Python, TypeScript, GCP, dbt, Terraform" },
    { label: "好きなこと", value: "課題の言語化と自動化による仕組み化" },
];

const timeline = [
    {
        period: "2025 - Now",
        title: "データエンジニア / データアナリスト / SFA,CRMシステムエンジニア",
            description: "スタートアップのデータ基盤整備や AI プロトタイプの伴走支援を担当。要件整理から実装、運用まで横断的に対応。",
        },
    {
        period: "2025",
        title: "フリーランス エンジニア",
        description: "ECショップのデータ基盤構築PJや、メーカーのBI可視化PJに参画",
    },
    {
        period: "2023 - 2025",
        title: "データエンジニア / データアナリスト",
        description: "1年間 営業職を経験、その後データエンジニア / データアナリストの業務を行う。一部データサイエンス領域もしていましたが、それはまた別の機会に。",
    },
];

const interests = [
    {
        title: "データ基盤",
        description: "データ基盤が好きです。色々組みたいです。",
    },
    {
        title: "AI",
        description: "AI系も好きです。でも統計などがまだ勉強できていないのでこれから勉強もしたい。",
    },
    {
        title: "アプリ開発",
        description: "最近Typescriptをよく使っています。フロントからインフラまでかけて便利ですね。",
    },
];

const contactLinks = [
    {
        label: "X / Twitter",
        href: "https://x.com/otoyabak",
        description: "開発ログや学んだことをつぶやいています。",
    },
    {
        label: "github",
        href: "https://github.com/toyamaru",
        description: "一緒にプログラミングをしましょう。",
    },
    {
        label: "Qiita",
        href: "https://qiita.com/toyamaru",
        description: "頑張って更新します。",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-16 px-6 py-16 md:gap-24 md:px-12 md:py-24">
                <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <div className="space-y-6">
                        <p className="text-sm uppercase tracking-[0.3em] text-foreground-sub">About</p>
                        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                            OTOYABAK(大竹 桐矢)
                        </h1>
                        <p className="text-sm text-foreground-sub md:text-base">
                            色々なものを作成するのが好きです。
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {highlights.map((item) => (
                                <div key={item.label} className="rounded-2xl border border-accent/80 bg-surface px-4 py-3">
                                    <p className="text-[0.7rem] uppercase tracking-[0.3em] text-foreground-sub">{item.label}</p>
                                    <p className="text-sm font-medium text-foreground mt-1">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-accent bg-surface">
                            <Image
                                src="/me.png"
                                alt="プロフィール写真"
                                fill
                                sizes="(min-width: 768px) 360px, 100vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-foreground-sub">Timeline</p>
                        <h2 className="text-2xl font-semibold">これまでの歩み</h2>
                    </div>
                    <div className="space-y-6">
                        {timeline.map((item) => (
                            <div
                                key={`${item.period}-${item.title}`}
                                className="rounded-3xl border border-border/70 bg-surface px-6 py-5 md:flex md:items-start md:gap-6"
                            >
                                <div className="text-sm font-semibold text-foreground md:w-32 md:flex-shrink-0">{item.period}</div>
                                <div className="space-y-2">
                                    <p className="text-base font-medium">{item.title}</p>
                                    <p className="text-sm text-foreground-sub leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-6">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-foreground-sub">Mindset</p>
                        <h2 className="text-2xl font-semibold">大切にしていること</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {interests.map((interest) => (
                            <div key={interest.title} className="rounded-3xl border border-border/70 bg-surface p-5">
                                <h3 className="text-base font-semibold">{interest.title}</h3>
                                <p className="mt-3 text-sm text-foreground-sub leading-relaxed">{interest.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-6 rounded-3xl border border-accent bg-key/5 px-6 py-8 md:px-8">
                    <div className="space-y-2">
                        <p className="text-sm uppercase tracking-[0.3em] text-accent">Contact</p>
                        <h2 className="text-2xl font-semibold text-foreground">カジュアルにお声がけください</h2>
                        <p className="text-sm text-foreground-sub">
                            データ活用の立ち上げや、AI・業務改善の伴走相談を探している方はお気軽にどうぞ。
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {contactLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="rounded-2xl border border-accent/40 bg-background px-4 py-4 text-left transition hover:border-accent hover:bg-key/10"
                            >
                                <p className="text-xs uppercase tracking-[0.3em] text-foreground-sub">{link.label}</p>
                                <p className="mt-2 text-sm font-medium text-foreground">{link.description}</p>
                            </a>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}