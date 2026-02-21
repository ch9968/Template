"use client";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-4 text-center">
      <h2 className="font-display text-2xl font-bold text-text-primary">
        문제가 발생했습니다
      </h2>
      <p className="text-text-secondary">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-transform hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98]"
        style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        다시 시도
      </button>
    </div>
  );
}
