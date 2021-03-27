import { useState, useEffect } from 'react';
import axios from 'axios';

function CreatePost() {

    const [post, setPost] = useState({ email: '', title:'' , description: '' });
    const [allusers, setUsers] = useState({ users: [] });

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(response => {
                setUsers({ users: response.data.map(user => user.email) });
                setPost({ email: response.data[0].email });
            })
            .catch((error) => {
                console.log(error);
            })
            console.log('update')
    }, []);

    function onFormSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/posts/add', post)
            .then(res => console.log(res.data))

        window.location = '/';
    }


    return (
        <div className="container mt-5">
            <h3>Create Post</h3>
            <div className="row">
                <div className="col-lg-6">
                    <form onSubmit={onFormSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <select
                                className="form-control"
                                value={post.email}
                                onChange={e => setPost(post => ({ ...post, email: e.target.value }))}
                            >
                                {
                                    allusers.users.map(function (user) {
                                        return <option
                                            key={user}
                                            value={user}>{user}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Title: </label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <textarea
                                required
                                rows="5"
                                className="form-control"
                                onChange={e => setPost(post => ({ ...post, description: e.target.value }))}
                            >
                            </textarea>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Submit" className="btn btn-dark" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );

}

export default CreatePost;