import { useEffect, useState } from 'react';
import axios from 'axios';

function EditPost(props) {

    const [editpost, setPost] = useState({ description: ''});

    useEffect(() => {
        axios.get('https://localhost:5000/posts/' + props.match.params.id)
            .then(response => {
                setPost({ email: response.data.email , description: response.data.description });
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [props.match.params.id]);


    function onEditpost(e) {
        setPost({ description: e.target.value });
    }

    function onFormSubmit(e) {
        e.preventDefault();
        axios.put('https://localhost:5000/posts/update/' + props.match.params.id, editpost)
      .then(res => console.log(res.data));
      window.location = '/';
    }

    return (
        <div>
            <h3>Edit Post</h3>
            <div className="row">
                <div className="col-lg-6">
                    <form onSubmit={onFormSubmit}>
                        <div className="form-group">
                            <p>Posted By : Hello@gmail.com</p>
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={editpost.description}
                                onChange={onEditpost}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );

}

export default EditPost;