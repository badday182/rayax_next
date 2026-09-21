import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Про нас",
  description:
    "Про проєкт Rayax: навіщо він створений, як підтримати розробку та де стежити за оновленнями — YouTube- і Telegram-канал проєкту.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="conteinerWidht px-3 py-5 d-flex flex-column align-items-center">
      <h1 className="text-white fw-bold text-center mb-4">Про нас</h1>

      <div
        className="backgroundWhite rounded p-4"
        style={{ maxWidth: 760, width: "100%" }}
      >
        <section className="mb-4">
          <h2 className="h5 fw-bold mb-2">Що таке Rayax</h2>
          <p className="mb-0 fw400">
            Rayax — безкоштовний сервіс для лікарів-рентгенологів, який
            допомагає швидко складати протоколи опису рентгенівських знімків.
            Проєкт розвивається силами незалежного розробника без
            інвесторів і реклами, тож ваша підтримка напряму впливає на те,
            як швидко з&apos;являються нові зони дослідження та можливості.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="h5 fw-bold mb-3">Підтримати проєкт</h2>
          <p className="fw400">
            Якщо Rayax економить вам час — будемо вдячні за донат на
            розвиток проєкту. Відскануйте QR-код зручного банку:
          </p>
          <div className="d-flex flex-row flex-wrap gap-4 justify-content-center mt-3">
            <div className="text-center">
              <div
                className="position-relative mx-auto rounded"
                style={{ width: 200, height: 200, overflow: "hidden" }}
              >
                <Image
                  src="/privat_qr.jpg"
                  alt="QR-код для донату через ПриватБанк"
                  fill
                  sizes="200px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="mb-0 mt-2 fw-bold">ПриватБанк</p>
            </div>
            <div className="text-center">
              <div
                className="position-relative mx-auto rounded"
                style={{ width: 200, height: 200, overflow: "hidden" }}
              >
                <Image
                  src="/mono_qr.jpg"
                  alt="QR-код для донату через Монобанк"
                  fill
                  sizes="200px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="mb-0 mt-2 fw-bold">Монобанк</p>
            </div>
          </div>
        </section>

        <section className="mb-2">
          <h2 className="h5 fw-bold mb-3">Ми в соцмережах</h2>
          <p className="fw400">
            Стежте за оновленнями та новими можливостями Rayax:
          </p>
          <div className="d-flex flex-row flex-wrap gap-4 justify-content-center mt-3">
            <a
              href="https://www.youtube.com/@RayaX.project"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-decoration-none text-dark"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a0/YouTube_social_red_circle_%282017%29.svg"
                alt="YouTube-канал Rayax"
                width={80}
                height={80}
                className="rounded-circle"
              />
              <p className="mb-0 mt-2 fw-bold">YouTube-канал</p>
            </a>
            <a
              href="https://t.me/Raya_X"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-decoration-none text-dark"
            >
              <div
                className="position-relative mx-auto rounded"
                style={{ width: 200, height: 200, overflow: "hidden" }}
              >
                <Image
                  src="/telegram_qr2.jpg"
                  alt="QR-код на Telegram-канал Rayax"
                  fill
                  sizes="200px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="mb-0 mt-2 fw-bold">Telegram-канал</p>
            </a>
          </div>
        </section>

        <div className="text-center pt-4">
          <Link href="/generator" className="btn btn-primary fw-bold">
            Перейти до генератора
          </Link>
        </div>
      </div>
    </main>
  );
}
