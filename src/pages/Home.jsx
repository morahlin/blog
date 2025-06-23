import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../Firebase-config';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Home = ({isAuth}) => {
  
  const navigate = useNavigate(); // navigate to different pages

  const [postLists, setPostList] = useState([]); // state to store all posts
  const [loading, setLoading] = useState(true); // state to manage loading spinner


  const postCollectionRef = collection(db, "All-posts") // reference to the collection

  // get all posts from the collection
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({...doc.data(), id:doc.id })));
      setLoading(false);
    }
    getPosts();
  },[]);

  // delete post function
  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post ?")) {
      const postDoc = doc(db, "All-posts", id)
      await deleteDoc(postDoc)
      setPostList(postLists.filter(post => post.id !== id));
    }
  }

  // navigate to edit post page
  const navigateToEdit = (id) => {
    navigate(`/edit-post/${id}`)
  }

  return (
    <div className='homePage'>
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        postLists.length === 0 ? (
          <div className="noPosts">No posts available</div>
        ) : (
          postLists.map((post) => {
            return (
              <div className="post" key={post.id}>
                <div className='postHeader'>
                  <div className="title">
                    <h1 className='text-[4vh] font-bold'>{post.title}</h1>
                  </div>
                  <div className="deletePost">
                    {isAuth && post.author.id === auth.currentUser.uid && 
                    <>
                    <button onClick={() => {deletePost(post.id)}} > < MdDelete size={20} color='white' /> </button>
                    <button onClick={()=> {navigateToEdit(post.id)}}><FaEdit size={20} color='white' /></button>
                    </> }
                  </div>
                </div>
                <div className="postTextContainer">{post.postText}</div>
                <h3 className='user-name'>@{post.author?.name}</h3>
                <p>{moment(post.timestamp.seconds * 1000).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </div>
            )
          })
        )
      )}
    </div>
  )
}

export default Home;