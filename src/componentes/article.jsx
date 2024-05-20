import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Article() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const articlesUrl = "http://localhost:3306/articles/";

  useEffect(() => {
    fetch(articlesUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Buscar artículos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:border-green-500"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="py-2 px-4 bg-green-500 border border-green-500 text-white rounded-r-lg hover:bg-green-600 transition-colors duration-300"
        >
          Limpiar
        </button>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-lg overflow-hidden article-card"
          >
            <Link to={`/articles/${article.id}`}>
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-green-700 mb-2">
                  {article.title}
                </h2>
                <div className="pl-6">
                  {article.article.slice(0, 1).map((paragraph, j) => (
                    <p key={j} className="text-gray-700 text-base mb-2">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/create-article">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green active:bg-green-700">
            Crear nuevo Artículo
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Article;
