import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbot from './pages/Chatbot/Chatbot';
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FAQs from "./pages/FAQs/FAQs";
import 'regenerator-runtime/runtime';
import './App.css'
import FormPage from "./pages/Form/FormPage";
import FormPage2 from "./pages/Form/FormPage2";
import FormPage3 from "./pages/Form/FormPage3";
import Feedback from "./pages/Feedback/Feedback";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/form2" element={<FormPage2 />} />
        <Route path="/form3" element={<FormPage3 />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
