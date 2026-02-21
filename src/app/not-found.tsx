import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-4 text-center">
      <h2 className="font-display text-4xl font-bold text-text-primary">404</h2>
      <p className="text-text-secondary">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-transform hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98]"
        style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
