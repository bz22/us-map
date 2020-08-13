import React, { useState } from 'react';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import USMap from "./Components/US-map";
import ReactTooltip from "react-tooltip";
import Details from './Components/detailed-info';

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <Header />
      <USMap setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
      <Details />
      {/* <Footer className = "sticky"/> */}
    </div>
  );
}

export default App;
