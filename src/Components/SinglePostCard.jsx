import { useState } from "react";
import { sendMessage } from "../api/index.js";
import { editPost } from "../api/index.js";
import { useNavigate } from "react-router-dom";
import EditPostForm from "./EditPostForm.jsx";

const SinglePostCard = ({ post, token, setPosts }) => {
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  console.log("Token in SinglePostCard:", token);

  const handleEdit = async () => {
    setEditing(true); // Activate editing mode
  };

  return (
    <div className="single-post-card">
      {editing ? (
        // If editing mode is active, render the EditPostForm
        <EditPostForm
          post={post}
          token={token}
          postId={post._id}
          setPosts={setPosts}
        />
      ) : (
        <div>
          <h3>{post.title}</h3>
          <p>{post.author.username}</p>
          <p>{post.description}</p>
          <p>Price: {post.price}</p>
          <p>Location: {post.location}</p>
          {token && post.isAuthor ? (
            <button onClick={handleEdit}>Edit Post</button>
          ) : null}
          {/* Other buttons and form here */}
        </div>
      )}
    </div>
  );
};

export default SinglePostCard;

//   return (
//     <div className="single-post-card">
//       <h3>{post.title}</h3>
//       <p>{post.author.username}</p>
//       <p>{post.description}</p>
//       <p>Price: {post.price}</p>
//       <p>Location: {post.location}</p>
//       {token && post.isAuthor ? (
//         <button
//           onClick={async () => {
//             console.log(
//               "Edit Post clicked with the following values:",
//               post.title,
//               post.description,
//               post.price,
//               post.location,
//               post.willDeliver,
//               token,
//               post._id
//             );
//             await editPost(
//               post.title,
//               post.description,
//               post.price,
//               post.location,
//               post.willDeliver,
//               token,
//               post._id
//             );
//             navigate(`/edit-post/${post._id}`);
//           }}
//         >
//           Edit Post
//         </button>
//       ) : null}
//       {token && post.isAuthor ? (
//         <button
//           onClick={async () => {
//             await deletePost(post._id, token);
//             const posts = await fetchAllPosts(token);
//             setPosts(posts.data.posts);
//           }}
//         >
//           Delete Post
//         </button>
//       ) : null}
//       {token && !post.isAuthor ? (
//         <form
//           onSubmit={async (event) => {
//             event.preventDefault();
//             await sendMessage(post._id, token, content);
//             console.log("message sent");
//           }}
//         >
//           <label>Send a message:</label>
//           <input
//             type="text"
//             onChange={(event) => setContent(event.target.value)}
//           />
//           <button>Send</button>
//         </form>
//       ) : null}
//     </div>
//   );
// };
// export default SinglePostCard;
