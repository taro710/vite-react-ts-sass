import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../pages/index/Index";
import Sample from "../pages/sample/Sample";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Index />} />
        <Route path={"/sample"} element={<Sample />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
