import LogoMeta from '@/assets/images/logo-meta.svg';

/** Thanh header Meta (logo), style đồng bộ với trang chính. */
export default function MetaHeader() {
    return (
        <header
            className="flex h-[52px] w-full shrink-0 items-center justify-center border-b border-[#E0E0E0] bg-white"
            role="banner"
        >
            <div className="flex w-full max-w-[1280px] items-center justify-between px-4">
                <img src={LogoMeta} width={64} height={22} alt="Meta" className="h-[22px] w-auto" />
            </div>
        </header>
    );
}
