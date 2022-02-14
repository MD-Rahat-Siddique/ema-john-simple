import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import PageError from './components/PageError/PageError';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="review" element={<Review />} />
        <Route path="manage" element={<Manage />} />
        <Route path="/product/:key" element={<ProductDetail />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </div>
  );
}

export default App;
