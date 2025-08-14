import Header from './components/Header/Header';
import AppRoutes from './AppRoutes';
import "./App.scss";
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}
