import Nav              from './components/Nav';
import Hero             from './components/Hero';
import FeatureCallouts  from './components/FeatureCallouts';
import ThePanel         from './components/ThePanel';
import TheStand         from './components/TheStand';
import TechGrid         from './components/TechGrid';
import Gallery          from './components/Gallery';
import Footer           from './components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main aria-label="Meirro Pro — 32-Inch 6K Monitor product page">
        <Hero />
        <FeatureCallouts />
        <ThePanel />
        <TheStand />
        <TechGrid />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
