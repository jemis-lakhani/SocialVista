import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  }, [dispatch, token]);

  const getUserPosts = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  }, [dispatch, token, userId]);

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [getPosts, getUserPosts, isProfile]);

  const allPosts = useMemo(() => (posts?.length > 0 ? posts : []), [posts]);
  return (
    allPosts &&
    allPosts?.map(
      ({
        _id,
        userId,
        firstName,
        lastName,
        description,
        location,
        postImage,
        userImage,
        likes,
        comments,
      }) => (
        <PostWidget
          key={_id}
          postId={_id}
          postUserId={userId}
          name={`${firstName} ${lastName}`}
          description={description}
          location={location}
          postImage={postImage?.data}
          userImage={userImage}
          likes={likes}
          comments={comments}
        ></PostWidget>
      )
    )
  );
};

export default PostsWidget;
