import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Article() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const articlesUrl = "http://localhost:3030/api/v2/articles/articles";

  useEffect(() => {
    fetch(articlesUrl)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      });
  }, []);

  useEffect(() => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [searchTerm, articles]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {filteredArticles.map((article, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-lg overflow-hidden article-card"
        >
          <Link to={`/articles/${article.articleId}`} className="block group">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {article.title}
              </h2>
              </div>
              <div className="pl-6">
                {article.article.slice(0, 1).map((paragraph, j) => (
                  <p key={j} className="text-gray-700 text-base mb-2">
                    {paragraph.slice(0, 100)} 
                    {paragraph.length > 100 && "..."} 
                  </p>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>
  );
}

export default Article;
