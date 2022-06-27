import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// pages
import Index from "pages/index";

// components
import AppLayout from "components/layout/AppLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;