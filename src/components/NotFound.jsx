import './404.css';
import notFound404  from '../assets/404.jpg';
function NotFound() {
  return (
    <body >
        <img src={notFound404} alt="404"  className="body"/>
    </body>
  )
}

export default NotFound