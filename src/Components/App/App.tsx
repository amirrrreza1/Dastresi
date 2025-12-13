import React from "react";
import Home from "../../Pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../../Pages/NotFound/NotFound";

const App: React.FC = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
