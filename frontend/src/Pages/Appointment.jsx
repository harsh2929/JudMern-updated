import React from "react";
import Hero from "../components/Hero";
import FileCaseForm from "../components/FileCaseForm";

const FileCase = () => {
  return (
    <>
      <Hero
        title={"Schedule Your FileCase | Ecourt"}
        imageUrl={"/signin.png"}
      />
      <FileCaseForm/>
    </>
  );
};

export default FileCase;
