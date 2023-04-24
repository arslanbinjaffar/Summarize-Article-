import React from "react";
import { copy, tick } from "../../assets";
import { useState } from "react";
const RecentSearches = ({ savedArticles, setArticle }) => {
  const [copied, setCopied] = useState("");
  const handleCopy = async (url) => {
    if (url == copied) return;
    setCopied(url);
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      alert("Could not copy the url!");
    }
  };
  return (
    <main className="border-2 py-3 border-gray-500 border-dashed mt-5">
      <h1 className="text-2xl font-semibold mb-4 underline text-gray-500 text-center">
        Recently searched urls list
      </h1>
      <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
        {savedArticles.map((item) => {
          return (
            <div
              key={`link-${crypto.randomUUID()}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div
                className={`copy_btn ${
                  item.url == copied ? "cursor-default" : "cursor-pointer"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(item.url);
                }}
              >
                <img
                  src={item.url == copied ? tick : copy}
                  alt="copy icon"
                  className={`copy_img transition-all`}
                />
              </div>
              <p className="font-satoshi flex-1 text-blue-700 font-medium text-sm truncate cursor-pointer">
                {item.url}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default RecentSearches;
