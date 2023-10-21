import Image from "next/image";
import HomePage from "./pages/HomePage";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <HomePage />
    </main>
  );
}
