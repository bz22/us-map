import React, { useState } from 'react';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import USMap from "./Components/US-map";
import ReactTooltip from "react-tooltip";

function App() {
  const [content, setContent] = useState("");
  return (
    <div className = "">
      <Header />
      <div>
        <USMap className = "" setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </div>
      <div className = "flex w-full h-16 bg-black">
      </div>
      {/* <Footer className = "sticky"/> */}
    </div>
  );
}

export default App;
