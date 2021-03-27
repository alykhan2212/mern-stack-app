import { useState, useEffect } from 'react';
import axios from 'axios';

function CreatePost() {

    const [post, setPost] = useState({ email: '', description: '' });
    const [users, setUsers] = useState({ users: [] });

    useEffect(() => {
        axios.get('/users')
            .then(response => {
                setUsers({ users: response.data.map(user => user.email) });
                setPost({ email: response.data[0].email });
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    function onFormSubmit(e) {
        e.preventDefault();
        axios.post('/posts/add', post)
            .then(res => console.log(res.data))

        window.location = '/';
    }


    return (
        <div className="container mt-5">
            <h3>Create New Post</h3>
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
                                    users.users.map(function (user) {
                                        return <option
                                            key={user}
                                            value={user}>{user}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                required
                                className="form-control"
                                onChange={e => setPost(post => ({ ...post, description: e.target.value }))}
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

export default CreatePost;