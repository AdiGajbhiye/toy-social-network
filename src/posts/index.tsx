import React from "react";

interface IPost {
  id: string;
  userId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: IPost[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => (
  <>
    {posts.map((p) => (
      <div key={p.id}>{p.message}</div>
    ))}
  </>
);

export default Posts;
