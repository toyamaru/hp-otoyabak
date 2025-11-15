

import Image from "next/image";
import Link from "next/link";

export type HeaderNavItem = {
    label: string;
    href: string;
};

export type HeaderSocialLink = {
    label: string;
    href: string;
    iconSrc?: string;
};

export type HeaderProps = {
    logoSrc: string;
    siteTitle: string | null;
    siteSubtitle?: string;
    navItems?: HeaderNavItem[];
    socialLinks?: HeaderSocialLink[];
};

/**
 * グローバルヘッダーコンポーネント
 *
 * - 見た目のレイアウトだけを担当
 * - WordPress から取得したデータは props で渡す想定
 */
export const Header = ({
    logoSrc,
    siteTitle,
    siteSubtitle = "PORTFOLIO",
    navItems = [],
    socialLinks = [],
}: HeaderProps) => {
    return (
        <header className="sticky top-0 z-40 border-b border-border/60 bg-page/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
                {/* ブランドロゴ + タイトル */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-accent/70">
                        <Image
                            src={logoSrc}
                            alt={`ロゴ`}
                            fill
                            sizes="36px"
                            className="object-cover"
                            unoptimized
                        />
                    </div>

                    <div className="leading-tight">
                        <div className="text-[0.6rem] font-medium tracking-[0.24em] text-foreground-muted uppercase">
                            {siteSubtitle}
                        </div>
                        <div className="text-sm font-semibold tracking-[0.16em] text-foreground">
                            {siteTitle}
                        </div>
                    </div>
                </Link>

                {/* PC ナビゲーション */}
                <nav className="hidden items-center gap-6 text-xs font-medium text-foreground-muted md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="transition-colors hover:text-foreground"
                        >
                            {item.label}
                        </Link>
                    ))}

                    {socialLinks.length > 0 && (
                        <div className="ml-2 flex items-center gap-2">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-label={link.label}
                                    className="group relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-surface/80"
                                >
                                    {link.iconSrc ? (
                                        <Image
                                            src={link.iconSrc}
                                            alt={link.label}
                                            fill
                                            sizes="28px"
                                            className="object-contain transition-transform group-hover:scale-105"
                                        />
                                    ) : (
                                        <span className="text-[0.6rem] font-medium text-foreground-muted group-hover:text-foreground">
                                            {link.label[0]}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </nav>

                {/* SP: 右側は簡易的な SNS アイコンのみ表示 (ハンバーガーメニューを足す場合はここに追加) */}
                <div className="flex items-center gap-2 md:hidden">
                    {socialLinks.length > 0 && (
                        <div className="flex items-center gap-2">
                            {socialLinks.slice(0, 2).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-label={link.label}
                                    className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-surface/80"
                                >
                                    {link.iconSrc ? (
                                        <Image
                                            src={link.iconSrc}
                                            alt={link.label}
                                            fill
                                            sizes="28px"
                                            className="object-contain"
                                        />
                                    ) : (
                                        <span className="text-[0.6rem] font-medium text-foreground-muted">
                                            {link.label[0]}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}