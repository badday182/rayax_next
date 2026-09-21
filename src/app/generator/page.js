import HomeClient from "@/components/Home/HomeClient.js";

export const metadata = {
  title: "Генератор опису рентгенівських знімків",
  description:
    "Складіть протокол опису рентгенівського знімка онлайн: оберіть зону дослідження, проекцію та знахідки — Rayax сформує готовий текст для медичного висновку.",
  alternates: {
    canonical: "/generator",
  },
};

export default function GeneratorPage() {
  return <HomeClient />;
}
