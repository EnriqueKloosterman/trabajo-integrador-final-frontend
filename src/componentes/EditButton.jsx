import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import PropTypes from 'prop-types';

const EditButton = ({ authorEmail, editLink }) => {
    const { user } = useContext(UserContext);

    if (!user || user.userEmail !== authorEmail) return null;
    return (
        <Link to={editLink}>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-green-600 active:bg-green-700">
                Editar
            </button>
        </Link>
    );
};

EditButton.propTypes = {
    authorEmail: PropTypes.string.isRequired,
    editLink: PropTypes.string.isRequired,
};

export default EditButton;
