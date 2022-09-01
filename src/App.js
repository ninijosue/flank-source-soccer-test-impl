import SoccerTable from "./destinations/soccer-table";
import TeamFixture from "./destinations/fixture";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SoccerTable />} />
          <Route path="/fixture/:team" element={<TeamFixture  />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
