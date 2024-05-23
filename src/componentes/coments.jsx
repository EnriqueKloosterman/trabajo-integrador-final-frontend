import { useState, useEffect } from "react";

function Comments() {
  const [comments, setComments] = useState([]);
  const commentsUrl = "http://localhost:3030/comment";

  useEffect(() => {
    fetch(commentsUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments(data);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8">Aventuras en la cocina</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {comments.map((comment, i) => (
          <li key={i} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <p className="text-lg text-gray-700 mb-2">{comment.comment}</p>
            <img src={comment.img} alt={`Comentario ${i}`} className="w-full h-48 object-cover" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
