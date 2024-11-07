import Header from "../components/Header";
import Footer from "../components/Footer";
import MainLayout from "../layout/MainLayout";
import Movies from "../features/Movies/Movies";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetails from "../features/MovieDetails/MovieDetails";

export default function Home() {
  return (
    <div className="bg-[#eee] min-h-screen">
      <Router>
        <Header />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </MainLayout>
        <Footer />
      </Router>
    </div>
  );
}
