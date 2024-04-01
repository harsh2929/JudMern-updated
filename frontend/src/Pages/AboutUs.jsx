import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const EcourtInfo = () => {
  return (
    <>
      <Hero
        title={"Learn More About our court"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  );
};

export default EcourtInfo;
