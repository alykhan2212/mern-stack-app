import { useEffect, useState } from 'react';
import axios from 'axios';

function SinglePost(props) {
    const [fullPost, setFullPost] = useState({ description: '' });

    useEffect(() => {
        axios.get('https://localhost:5000/posts/'+ props.match.params.id)
            .then(response => {
                setFullPost({ description: response.data.description });
            })
            .catch((error) => {
                console.log(error);
            })

    }, [props.match.params.id]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-10 col-md-10 col-lg-10">
                    <h1>Guest Post Services</h1>
                    <p>{fullPost.description}</p>
                </div>
            </div>
        </div>
    );

}

export default SinglePost;