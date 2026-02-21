export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4">
      <main className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-display text-5xl font-bold tracking-tight text-text-primary md:text-6xl">
          TheBon
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-text-secondary">
          프로젝트가 성공적으로 초기화되었습니다.
        </p>
        <div className="flex gap-4">
          <a
            href="/docs"
            className="ease-spring rounded-lg bg-primary px-6 py-3 font-medium text-white transition-transform hover:bg-primary-hover hover:scale-[1.02] focus-visible:outline-primary active:scale-[0.98]"
          >
            시작하기
          </a>
        </div>
      </main>
    </div>
  );
}
