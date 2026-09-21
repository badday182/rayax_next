import HomeClient from "@/components/Home/HomeClient.js";

export default function Home() {
  return (
    <>
      <section className="text-white text-center px-3 pt-4 pb-2">
        <h1 className="h4 fw-bold mb-2">
          Опис рентгенівських знімків онлайн
        </h1>
        <p className="mb-0" style={{ maxWidth: 640, margin: "0 auto" }}>
          Rayax — сервіс для лікарів-рентгенологів, який допомагає швидко
          скласти протокол опису рентгена (ОГК, черепа, хребта, суглобів та
          інших зон): готові варіанти формулювань, власні шаблони й миттєве
          формування тексту рентгенологічного дослідження.
        </p>
      </section>
      <HomeClient />
    </>
  );
}
