import { Link } from 'react-router-dom';

function PostsCard(props) {

    function formatDate(date) {
        date = new Date(date)
        const currentMonth = date.getMonth();
        const currentDate = date.getDate();
        return `${date.getFullYear()}-${currentMonth}-${currentDate}`;
    }


    return (
        <div className="col-sm-6 col-md-4 col-lg-4">
            <div className="card mt-3">
                <div className="card-block">
                    <h4 className="card-title">The post title</h4>
                    <div className="meta">
                        <a href="/#">category</a>
                    </div>
                    <div className="card-text">
                        {props.description}
                    </div>
                </div>

                <div className="card-footer">
                    <span className="float-right">{formatDate(props.date)}</span>
                    <span><i className=""></i>Posted by {props.email}</span>
                    <div className="card-text">
                        <Link to={"/edit/" + props.id} className="card-link">Edit</Link>
                        <a href="/#" className="card-link" onClick={() => { props.deletePost(props.id) }}>Delete</a>
                        <Link to={"/single/" + props.id} className="btn btn-primary float-right btn-sm">Read More</Link>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PostsCard;