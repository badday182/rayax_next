import Link from "next/link";

export default function Home() {
  return (
    <main className="conteinerWidht text-white text-center px-3 py-5 d-flex flex-column align-items-center justify-content-center">
      <h1 className="fw-bold mb-3">Опис рентгенівських знімків онлайн</h1>
      <p className="mb-4" style={{ maxWidth: 640 }}>
        Rayax — сервіс для лікарів-рентгенологів, який допомагає швидко скласти
        протокол опису рентгенівського знімка: ОГК, черепа, хребта, суглобів та
        інших зон. Готові варіанти формулювань, власні шаблони й миттєве
        формування тексту рентгенологічного дослідження — без рутинного набору
        однакових фраз вручну.
      </p>
      <Link href="/generator" className="p-2 px-4 glass-button d-ruby fw-bold">
        Перейти до генератора
      </Link>
      <section className="mt-5 w-100" style={{ maxWidth: 900 }}>
        <h2 className="fw-bold mb-3 fs-4">Як працює Rayax</h2>
        <video
          className="w-100 rounded shadow"
          src="/rayax_video.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </section>
      <div className="mt-4 d-flex flex-col gap-3 justify-content-center flex-wrap">
        <Link href="/faq" className="p-2 px-4 glass-button d-ruby fw-bold">
          Як це працює та що входить у шаблони опису
        </Link>
        <Link href="/articles" className="p-2 px-4 glass-button d-ruby fw-bold">
          Статті про опис рентгенівських знімків
        </Link>
      </div>
    </main>
  );
}
