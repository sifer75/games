import "./App.css";
import { OpenFirstScreen } from "./pages/OpenFirstScreen";
import { IntroProvider } from "./context/IntroProvider";
import { useIntro } from "./context/useIntro";
import { useEffect, useState, type TransitionEvent } from "react";
import { PageWrapper } from "./pages/PageWrapper";
import { FadingSkills } from "./components/FadingSkills";
import { Layering } from "./components/Layering";
import { ButtonStars } from "./components/ButtonStars";
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
  const [pageTransitionDone, setPageTransitionDone] = useState(false);

  const handlePageTransitionDone = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === "transform") {
      setPageTransitionDone(true);
    }
  };
  useEffect(() => {
    if (introDone) {
      requestAnimationFrame(() => setFadeIn(true));
    }
  }, [introDone]);

  return !introDone ? (
    <div className="bg-red-500 w-screen h-screen overflow-hidden flex justify-center items-center">
      <OpenFirstScreen />
    </div>
  ) : (
    <>
      <PageWrapper id="Accueil">
        <Layering
          fadeIn={fadeIn}
          handlePageTransitionDone={handlePageTransitionDone}
          pageTransitionDone={pageTransitionDone}
        >
          <MyHeadline />
          <FadingSkills />
        </Layering>
      </PageWrapper>
      <PageWrapper id="SecondPage">
        <div className="h-full w-full bg-cyan-600 flex justify-center items-center">
          <ButtonStars />
          {/* <button className="bg-white text-black px-4 py-2 rounded-md cursor-auto">
            <span className="font-pro">Commençons</span>
          </button> */}
        </div>
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

// import throttle from "throttleit";
