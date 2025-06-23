import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase-config';

const EditPost = () => {


    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const postDoc = doc(db, "All-posts", id);
            const postSnap = await getDoc(postDoc);
            
            if (postSnap.exists()) {
                const post = postSnap.data();
                setTitle(post.title);
                setPostText(post.postText);
            }
        }
    
        getPost();
    }, [id]);


    const updatePost = async (e) => {
        e.preventDefault();
        setLoading(true);
        const postDoc = doc(db, "All-posts", id);
        await updateDoc(postDoc, {
            title,
            postText
        });
        setLoading(false);
        navigate('/');
    }

  return (
    <div className='createPostPage'>
    <form className="cpContainer" onSubmit={updatePost} >
      <h1> Update New Post</h1>
      <div className="inputGp">
        <label htmlFor="">Title:</label>
        <input
          required
          type="text"
          placeholder='Title...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="inputGp">
        <label htmlFor="">Post:</label>
        <textarea
          name=""
          required
          placeholder='Post...'
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          id=""
          cols="30"
          rows="10"
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Post"}
      </button>
    </form>
    {loading && <div className="spinner">Updating...</div>}
  </div>
  )
}

export default EditPost;