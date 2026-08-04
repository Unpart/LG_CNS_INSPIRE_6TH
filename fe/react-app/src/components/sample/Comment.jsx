import '../../styles/book.css';
import placeholder from '../../img/placeholder.jpg';

const Comment = ({ data }) => {
    return(
        <div className="wrapper">
            <div className="image">
                <img src={placeholder} className="image" />
            </div>
            <div>
                <span>{data.writer}</span><p />
                <span>{data.comment}</span>
            </div>
        </div>
    );
}

export default Comment;