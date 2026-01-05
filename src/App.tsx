import "./App.css";
import { OpenFirstScreen } from "./pages/OpenFirstScreen";
import { IntroProvider } from "./context/IntroProvider";
import { useIntro } from "./context/useIntro";
import { useEffect, useState } from "react";
import { PageWrapper } from "./pages/PageWrapper";
import { FadingSkills } from "./components/FadingSkills";
import { Layering } from "./components/Layering";
import { ButtonStars } from "./components/ButtonStars";
import { Icons } from "./components/Icons";
function App() {
  return (
    <IntroProvider>
      <AppContent />
    </IntroProvider>
  );
}

const AppContent = () => {
  const { introDone } = useIntro();
  const [fadeIn, setFadeIn] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [animationsDone, setAnimationsDone] = useState(false);
  const PANEL_DURATION = 3500;
  const FADE_DURATION = 2000;

  useEffect(() => {
    if (!introDone) return;

    requestAnimationFrame(() => setFadeIn(true));

    const showContent = setTimeout(() => {
      setContentVisible(true);
    }, PANEL_DURATION);

    const enableScrolling = setTimeout(() => {
      setAnimationsDone(true);
    }, PANEL_DURATION + FADE_DURATION);

    return () => {
      clearTimeout(showContent);
      clearTimeout(enableScrolling);
    };
  }, [introDone]);

  useEffect(() => {
    document.body.style.overflowY = animationsDone ? "auto" : "hidden";
  }, [ animationsDone]);

  return !introDone ? (
    <div className="bg-red-500 w-screen h-screen overflow-hidden flex justify-center items-center">
      <OpenFirstScreen />
    </div>
  ) : (
    <>
      <PageWrapper id="Accueil">
        <Layering
          fadeIn={fadeIn}
          contentVisible={contentVisible}
        >
          <Icons />
          <MyHeadline />
          <FadingSkills />
        </Layering>
      </PageWrapper>
      <PageWrapper id="SecondPage">
        <ButtonStars />
      </PageWrapper>
    </>
  );
};

export default App;

const ME = ["Taupin", "Fabien"] as const;

const MyHeadline = () => (
  <div className="w-full xs:flex xs:items-center h-fit transition duration-500 delay-100 flex flex-col items-center sm:items-start">
    <h1 className="font-Merich w-fit z-20 text-yellow-100">
      {ME.map((txt, k) => (
        <div className="text-7xl z-20 xs:text-8xl lg:text-9xl" key={k}>
          {txt}
        </div>
      ))}
    </h1>
    {/* <CyclingSkills />
    <div className="w-fit h-fit z-20 mt-5 sm:hidden">
      <Links />
    </div> */}
  </div>
);
