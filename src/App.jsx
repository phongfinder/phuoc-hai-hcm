import { useState } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import { stores } from "./data/stores";

import "./index.css";

export default function App() {
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <div className="app">
      <Sidebar stores={stores} onSelect={setSelectedStore} />
      <MapView stores={stores} selectedStore={selectedStore} />
    </div>
  );
}