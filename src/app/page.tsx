// import HomeContent from "@/components/HomeContent";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Хедер (логотип + перемикач мови) */}
      {/* <HomeContent />  */}
      
      {/* Весь контент лендінгу */}
      <LandingPage />
    </main>
  );
}