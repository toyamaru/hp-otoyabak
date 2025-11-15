import { getSkills } from "@/lib/wp";
import { SkillCard } from "@/components/skill-card";

export default async function SkillPage() {
    const skills = await getSkills();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-12 px-6 py-16 md:px-12 md:py-24">
                <section className="space-y-6">
                    <div className="space-y-3">
                        <p className="text-sm uppercase tracking-[0.3em] text-foreground-sub">Skill</p>
                        <h1 className="text-3xl font-semibold md:text-4xl">Tech Stack</h1>
                        <p className="text-sm text-foreground-sub">
                            普段から触れている技術やツールの一覧です。経験年数や活用シーンの補足も記載しています。
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {skills && skills.length > 0 ? (
                            skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)
                        ) : (
                            <p className="text-sm text-foreground-sub">スキル情報を準備中です。</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}