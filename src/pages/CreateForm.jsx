import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../Firebase-config';
import { useNavigate } from "react-router-dom";

const CreateForm = ({ isAuth }) => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);

  const postCollectionRef = collection(db, "All-posts"); // collection reference

  // create post function
  const createPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addDoc(postCollectionRef, {
      author: { 
        name: auth.currentUser.displayName, 
        id: auth.currentUser.uid, 
        email: auth.currentUser.email 
      },
      title,
      postText,
      timestamp: serverTimestamp()
    });
    setLoading(false);
    navigate('/');
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth]);

  return (
    <div className='createPostPage'>
      <form className="cpContainer" onSubmit={createPost}>
        <h1 className="text-[white] text-[5vh]">Create New Post</h1>
        <div className="inputGp">
          <label htmlFor="" className="text-[white]">Title:</label>
          <input
            required
            type="text"
            placeholder='Title...'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="" className="text-[white]">Post:</label>
          <textarea
            name=""
            required
            placeholder='Post...'
            onChange={(e) => setPostText(e.target.value)}
            id=""
            cols="30"
            rows="10"
          />
        </div>
        <button type="submit" disabled={loading} className="text-[white]">
          {loading ? "Submitting..." : "Submit Post"}
        </button>
      </form>
      {loading && <div className="spinner">Loading...</div>}
    </div>
  );
};

export default CreateForm;