import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbot from './pages/Chatbot/Chatbot';
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Form from "./pages/Form/Form";
import FAQs from "./pages/FAQs/FAQs";
import 'regenerator-runtime/runtime';
import './App.css'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
