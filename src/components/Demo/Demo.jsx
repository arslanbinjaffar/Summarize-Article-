import { useState } from "react";
import { linkIcon, loader } from "../../assets";
import { useLazyGetSummaryQuery } from "../../redux/reducer/reducer";
import RecentSearches from "./RecentSearches";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [savedArticles, setSavedArticles] = useState(
    JSON.parse(localStorage.getItem("articles")) ?? []
  );
  const [getSummary, { isFetching, error }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    const existingArticles = savedArticles.find(
      (item) => item.url === article.url
    );
    if (existingArticles) return setArticle(existingArticles);
    if (data?.summary) {
      const newArticle = { url: article.url, summary: data.summary };
      setArticle(newArticle);
      const updatedArticlesList = [newArticle, ...savedArticles].reverse();
      setSavedArticles([...updatedArticlesList]);
      localStorage.setItem("articles", JSON.stringify(updatedArticlesList));
    } else {
      alert("Sorry! we are unable to retrieve the data from the provided Url.");
    }
  };

  return (
    <main className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5 cursor-pointer"
          />
          <input
            type="url"
            placeholder="Enter your URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            className="url_input peer"
            required
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
      </div>
      {savedArticles.length > 0 && (
        <RecentSearches savedArticles={savedArticles} setArticle={setArticle} />
      )}
      <div className="my-10 max-w-full flex justify-center items-center ">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center ">
            Well ,this wasn't supposed to happen!
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <section className="flex flex-col gap-3 ">
              <h2 className="font-satoshi font-bold text-gray-700 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summmary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </section>
          )
        )}
      </div>
    </main>
  );
};

export default Demo;
