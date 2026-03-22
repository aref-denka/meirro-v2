import Nav       from './components/Nav';
import Hero      from './components/Hero';
import ThePanel  from './components/ThePanel';
import TheStand  from './components/TheStand';
import TechGrid  from './components/TechGrid';
import TechSpecs from './components/TechSpecs';
import Footer    from './components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ThePanel />
        <TheStand />
        <TechGrid />
        <TechSpecs />
      </main>
      <Footer />
    </>
  );
}
