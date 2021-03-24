import { useState, useEffect } from 'react';
import axios from 'axios';
import PostsComponent from './PostsComponent';

function Home() {

    const [postsList, setPosts] = useState({ posts: [] });
    
    function lessLength(str) {
        return String(str).substr(0, 250);
    }

    useEffect(() => {
        axios.get('/posts')
            .then(response => {
                setPosts({ posts: response.data});
                
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    function deletePost(id) {
        axios.delete('/posts/' + id)
            .then(response => { console.log(response.data) });

        setPosts({
            posts: postsList.posts.filter(el => el._id !== id)
        })
    }

   
    return (

        <div className="container mt-5">
            <h1>All Post</h1>
            <br />
            <div className="row">
                {
                    postsList.posts.map(posts => {
                        return <PostsComponent
                            deletePost={deletePost}
                            key={posts._id}
                            email={posts.email}
                            date={posts.createdAt}
                            description={lessLength(posts.description)}
                            id={posts._id} />;
                    })
                }
            </div>
        </div>

    );

}

export default Home;