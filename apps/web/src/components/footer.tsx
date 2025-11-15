import Image from "next/image";

export type FooterProps = {
    logoSrc: string;
    siteTitle: string | null;
    siteSubtitle: string | null;
};

export const Footer = ({
  logoSrc,
  siteTitle,
  siteSubtitle,
}: FooterProps) => {
  return (
    <footer className="border-t border-accent bg-page">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-6 text-xs text-foreground-sub md:flex-row md:items-center md:justify-between md:px-12">
        {/* 左側: ロゴ + サイトタイトル */}
        <div className="flex items-center gap-3">
          {logoSrc && (
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-background">
              <Image
                src={logoSrc}
                alt={siteTitle ?? "Site logo"}
                width={32}
                height={32}
                className="h-6 w-6 object-contain"
                unoptimized
              />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {siteTitle ?? "OTOYABAK"}
            </span>
            {siteSubtitle && (
              <span className="text-[11px] text-foreground-sub">
                {siteSubtitle}
              </span>
            )}
          </div>
        </div>

        {/* 右側: メッセージ + コピーライト */}
        <div className="flex flex-col gap-2 text-[11px] md:items-end">
          <p className="text-foreground-sub">
            ポートフォリオは少しずつアップデートしていきます。
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="mailto:toyamaru2313@gmail.com"
              className="text-accent underline-offset-4 hover:underline"
            >
              Contact by Email
            </a>
            <span className="text-foreground-sub">/</span>
            <span>
              © {new Date().getFullYear()} {siteTitle || "OTOYA"}
            </span>
          </div>
        </div>
      </section>
    </footer>
  );
};