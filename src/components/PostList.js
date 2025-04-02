import React, { useState } from "react";
import { motion } from "framer-motion";

const formatDate = (timestamp) => {
  if (!timestamp) return "Unknown";
  return new Date(timestamp).toLocaleString();
};

const PostList = ({ posts, deletePost, editPost }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="mt-6 space-y-6">
      {posts.length === 0 ? (
        <p className="text-gray-400 text-center">
          No posts yet. Be the first to post!
        </p>
      ) : (
        posts.map((post, index) => (
          <PostItem
            key={index}
            post={post}
            onDelete={() => deletePost(index)}
            onEdit={(updatedPost) => editPost(index, updatedPost)}
            onClick={() => setSelectedPost(post)}
          />
        ))
      )}

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

const PostItem = ({ post, onDelete, onEdit, onClick }) => {
  return (
    <motion.div
      className="flex bg-gray-900 p-5 rounded-lg shadow-md overflow-hidden 
                 cursor-pointer hover:bg-gray-800 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {/* Left Section - Text Content */}
      <div className="flex-1 pr-4">
        <h3 className="text-lg font-semibold text-white">{post.title}</h3>
        <p className="text-gray-300 text-sm mt-1">
          {post.content.length > 100
            ? `${post.content.substring(0, 100)}...`
            : post.content}
        </p>
        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
          <p>
            By <span className="text-gray-300">{post.author}</span>
          </p>
          <p>{formatDate(post.timestamp)}</p>
        </div>

        {/* Buttons */}
        <div className="mt-3 space-x-3">
          <button
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-white"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(post);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-white"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Right Section - Image (Only if post has an image) */}
      {post.image && (
        <div className="w-32 h-32 flex-shrink-0 ml-4">
          <img
            src={post.image}
            alt="Post"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      )}
    </motion.div>
  );
};

// Modal Component
const PostModal = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <motion.div
        className="bg-gray-950 text-white p-6 rounded-lg shadow-xl max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="w-full rounded-md mb-4 shadow-md"
          />
        )}
        <p className="text-gray-300">{post.content}</p>
        <p className="text-sm text-gray-500 mt-2">By {post.author}</p>
        <p className="text-xs text-gray-600 mt-1">
          Posted on: {formatDate(post.timestamp)}
        </p>

        <button
          className="mt-4 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-white w-full"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default PostList;
