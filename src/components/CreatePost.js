import React, { useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus } from "lucide-react";

const CreatePost = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") return;

    addPost({
      title,
      content,
      author: "Anonymous",
      image,
      timestamp: new Date().toISOString(),
    });

    setTitle("");
    setContent("");
    setImage(null);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-800"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Create a Post</h2>

      {/* Title Input */}
      <input
        type="text"
        placeholder="Enter post title..."
        className="w-full p-3 mb-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Content Input */}
      <textarea
        placeholder="Write your thoughts..."
        className="w-full p-3 mb-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Image Upload */}
      <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-3 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-all">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <ImagePlus className="w-6 h-6 mr-2" />
        Upload Image
      </label>

      {/* Image Preview */}
      {image && (
        <motion.div
          className="mt-3 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image}
            alt="Preview"
            className="w-full rounded-lg shadow-md hover:shadow-lg transition-all"
          />
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 mt-4 w-full rounded-lg text-white font-bold transition-all"
      >
        🚀 Post Now
      </motion.button>
    </motion.form>
  );
};

export default CreatePost;
