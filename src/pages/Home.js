import React, { useState, useEffect } from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import { motion, AnimatePresence } from "framer-motion";
import { ethers } from "ethers";

const mockPosts = [
  {
    title: "Welcome to the Community!",
    content: "Feel free to contribute!",
    author: "Admin",
    image: null,
    timestamp: new Date().toISOString(),
    likes: 0,
  },
  {
    title: "React is Awesome!",
    content: "React makes UI development fun!",
    author: "Jane Doe",
    image: "https://via.placeholder.com/150",
    timestamp: new Date().toISOString(),
    likes: 0,
  },
];

const Home = ({ isConnected, userAddress }) => {
  const [posts, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState(null);
  const [ensName, setEnsName] = useState(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    if (storedPosts.length === 0) {
      localStorage.setItem("posts", JSON.stringify(mockPosts));
      setPosts(mockPosts);
    } else {
      setPosts(storedPosts);
    }
  }, []);

  useEffect(() => {
    const fetchENSName = async () => {
      if (userAddress) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const name = await provider.lookupAddress(userAddress);
          if (name) {
            setEnsName(name);
          }
        } catch (error) {
          console.error("Failed to fetch ENS name:", error);
        }
      }
    };
    fetchENSName();
  }, [userAddress]);

  const addPost = (newPost) => {
    const postWithDetails = {
      ...newPost,
      author: ensName || userAddress || "Anonymous",
      timestamp: new Date().toISOString(),
      likes: 0,
    };
    const updatedPosts = [postWithDetails, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const deletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const likePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].likes += 1;
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const openPostModal = (post) => {
    setModalPost(post);
  };

  const closePostModal = () => {
    setModalPost(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-6 md:p-8 flex flex-col">
      {/* Create Post Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mb-6 glass-container"
      >
        <CreatePost addPost={addPost} />
      </motion.div>

      {/* Main Layout: Posts & Active Users */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
        {/* Posts Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 glass-container"
        >
          <h2 className="text-xl font-bold neon-text mb-4">Timeline</h2>
          <PostList
            posts={posts}
            deletePost={deletePost}
            likePost={likePost}
            openPostModal={openPostModal}
          />
        </motion.div>

        {/* Active Users Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-container"
        >
          <h2 className="text-xl font-bold neon-text mb-4">Active Users</h2>
          <div className="space-y-3">
            {Object.entries(
              posts.reduce((acc, post) => {
                acc[post.author] = (acc[post.author] || 0) + 1;
                return acc;
              }, {})
            ).map(([user, count], index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center bg-gray-600 p-3 rounded-lg shadow-md hover:bg-gray-500 cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold">
                  {user.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-md font-semibold">{user}</p>
                  <p className="text-sm text-gray-300">{count} Posts</p>
                </div>
              </motion.div>
            ))}

            {/* Display the connected wallet user */}
            {isConnected && userAddress && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center bg-gray-700 p-3 rounded-lg shadow-md"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white text-lg font-bold">
                  {ensName ? ensName.charAt(0).toUpperCase() : "W"}
                </div>
                <div className="ml-3">
                  <p className="text-md font-semibold">
                    {ensName ||
                      userAddress.slice(0, 6) + "..." + userAddress.slice(-4)}
                  </p>
                  <p className="text-sm text-gray-300">Connected Wallet</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {modalPost && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <div className="glass-container w-11/12 md:w-1/2 p-6">
              <h2 className="text-2xl font-bold neon-text mb-4">
                {modalPost.title}
              </h2>
              <p className="text-lg mb-4">{modalPost.content}</p>
              <p className="text-sm text-gray-400 mb-2">
                By: {modalPost.author}
              </p>
              <p className="text-sm text-gray-400 mb-2">
                Likes: {modalPost.likes}
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Timestamp: {new Date(modalPost.timestamp).toLocaleString()}
              </p>
              <button className="glow-btn" onClick={closePostModal}>
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
