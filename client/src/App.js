import './App.css';
import Features from './components/Features';
import Footer from './components/Footer';
import Header from './components/Header';
import ShortifyCard from './components/ShortifyCard';

function App() {
  return (
    <>
    <Header></Header>
    <main className="flex-grow p-4">
      <ShortifyCard/>
        <Features/>
      </main>
    <Footer></Footer>
    </>
  );
}

export default App;
