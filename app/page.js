import Nav       from './components/Nav';
import Hero      from './components/Hero';
import ThePanel  from './components/ThePanel';
import TheStand  from './components/TheStand';
import TechGrid  from './components/TechGrid';
import TechSpecs from './components/TechSpecs';
import Reviews   from './components/Reviews';
import Footer    from './components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main aria-label="Meirro Pro — 32-Inch 6K Retina Monitor product page">
        <Hero />
        <ThePanel />
        <TheStand />
        <TechGrid />
        <TechSpecs />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
