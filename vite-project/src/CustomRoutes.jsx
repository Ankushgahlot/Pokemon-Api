import { Routes, Route } from "react-router-dom";
import Api from "./Api";
import ImageDetails from "./ImageDetails";
function CustomRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<Api />} />
            <Route exact path="/Api/:id" element={<ImageDetails />} />
        </Routes>
    )
}
export default CustomRoutes;