import { useState } from "react";
import { SplashScreen } from "@/components/birthday/SplashScreen";
import { CinematicIntro } from "@/components/birthday/CinematicIntro";
import { MainBirthday } from "@/components/birthday/MainBirthday";

type Phase = "splash" | "intro" | "main";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("splash");

  return (
    <>
      {phase === "splash" && (
        <SplashScreen onStart={() => setPhase("intro")} />
      )}
      {phase === "intro" && (
        <CinematicIntro onComplete={() => setPhase("main")} />
      )}
      {phase === "main" && <MainBirthday />}
    </>
  );
};

export default Index;
