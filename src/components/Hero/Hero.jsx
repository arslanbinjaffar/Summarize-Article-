import React from "react";
import { logo } from "../../assets";
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between w-full items-center mb-10 pt-3">
        <img src={logo} alt="logo image" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://www.linkedin.com/feed/")}
          className="black_btn"
        >
          LinkedIn
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Article with <br className="max-md:hidden" />
        <span className="orange_gradient">Open Gpt-4 For</span>
      </h1>
      <p className="desc">
        {" "}
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </p>
    </header>
  );
};

export default Hero;
