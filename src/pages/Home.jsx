import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../Firebase-config';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import {
  
  
 

  getDoc,
} from "firebase/firestore";


const Home = ({ isAuth }) => {
  const [liked, setLiked] = useState({});
  const [postLists, setPostList] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const postCollectionRef = collection(db, "All-posts");

  // Fetch posts on mount
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPostList(posts);
      setLoading(false);
    };
    getPosts();
  }, []);

  // Track which posts the user has liked
  useEffect(() => {
    if (!auth.currentUser) return;

    const userId = auth.currentUser.uid;
    const likedMap = {};
    postLists.forEach((post) => {
      if (post.likes?.includes(userId)) {
        likedMap[post.id] = true;
      }
    });
    setLiked(likedMap);
  }, [postLists]);

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const postDoc = doc(db, "All-posts", id);
      await deleteDoc(postDoc);
      setPostList(postLists.filter((post) => post.id !== id));
    }
  };

  const navigateToEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  const handleLike = async (postId) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const postRef = doc(db, "All-posts", postId);
    const postSnap = await getDoc(postRef);
    const postData = postSnap.data();

    const currentLikes = postData.likes || [];

    let updatedLikes;
    if (currentLikes.includes(userId)) {
      // Unlike
      updatedLikes = currentLikes.filter((id) => id !== userId);
    } else {
      // Like
      updatedLikes = [...currentLikes, userId];
    }

    await updateDoc(postRef, { likes: updatedLikes });

    // Update local state
    setPostList((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: updatedLikes } : post
      )
    );
  };

  // Filter posts based on search
  const filteredPosts = postLists.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.postText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homePage">
      <input
        type="text"
        placeholder="Search blog posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="searchInput"
        style={{
          width: "50%",
          padding: "12px 16px",
          margin: "20px auto",
          display: "block",
          fontSize: "16px",
          border: "2px solid #4A90E2",
          borderRadius: "8px",
          outline: "none",
          backgroundColor: "#f9f9f9",
          color: "#333",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "0.3s",
        }}
      />

      {loading ? (
        <div className="spinner">Loading...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="noPosts">No matching posts</div>
      ) : (
        filteredPosts.map((post) => {
          const likeCount = post.likes?.length || 0;
          const isLiked = liked[post.id];

          return (
            <div className="post" key={post.id}>
              <div className="postHeader">
                <div className="title">
                  <h1 className="text-[4vh] font-bold">{post.title}</h1>
                </div>
                <div className="deletePost">
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <>
                      <button onClick={() => deletePost(post.id)}>
                        <MdDelete size={20} color="white" />
                      </button>
                      <button onClick={() => navigateToEdit(post.id)}>
                        <FaEdit size={20} color="white" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="postTextContainer">{post.postText}</div>
              <h3 className="user-name">@{post.author?.name}</h3>
              <p>
                {moment(post.timestamp.seconds * 1000).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </p>

              <p
                onClick={() => handleLike(post.id)}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  userSelect: "none",
                  color: isLiked ? "red" : "black",
                }}
              >
                ❤️ {likeCount}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;