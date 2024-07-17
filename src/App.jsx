import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Order from "./pages/Order";
import Table from "./pages/Table";
import Menu from "./pages/Menu";
import Review from "./pages/Review";
import Sidebar from "./components/Sidebar";
import LoginForm from "./components/Login";
import Category from "./pages/Category";
import Payment from "./pages/Payment";
import "./App.css";
import Contact from "./pages/Contact";
import RegistrationForm from "./components/Register";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("AdminData"));

  return (
    <Router>
      <div className="app">
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<Sidebar />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/order" element={<Order />} />
              <Route path="/table" element={<Table />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/review" element={<Review />} />
              <Route path="/category" element={<Category />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
            </>
          )}
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
