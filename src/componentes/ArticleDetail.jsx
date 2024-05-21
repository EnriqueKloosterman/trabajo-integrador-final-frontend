import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3030/api/v2/articles/article/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
      });
  }, [id]);

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-purple-600 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h2 className="text-3xl font-semibold text-purple-800 mb-4">{article.title}</h2>
            <p className="text-m mb-4 italic">{article.user.userName} {article.user.userLastName} <span className="font-semibold"> {article.user.userEmail}</span></p>
            {article.article.map((paragraph, i) => (
              <p key={i} className="text-gray-800 text-base mb-4">{paragraph}</p>
            ))}
            <div className="text-center">
              <Link to="/">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 active:bg-purple-800">
                  Volver
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
