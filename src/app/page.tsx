import LandingPage from "@/components/LandingPage";
import Header from "@/components/Header"; // <--- Імпорт

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* <Header />  */}
      <LandingPage />
    </main>
  );
}