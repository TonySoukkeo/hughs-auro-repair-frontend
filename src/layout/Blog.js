import React, { useState, useEffect } from "react";

// Components
import BlogCards from "../components/blog/BlogCards";
import Loading from "../components/loading/Loading";

// Custom hooks
import useLoading from "../hooks/useLoading";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const [loading, setLoading] = useLoading();

  useEffect(() => {
    // Do stuff in here
    const getPost = async () => {
      try {
        setLoading(true);
        const posts = await fetch(
          `${process.env.REACT_APP_BASE_URL}/blog/posts?page=${page}&limit=3`
        );

        const postsData = await posts.json();

        if (postsData.status !== 200) {
          const error = new Error();
          error.message = postsData.message;
          throw error;
        }

        // Set load more
        setLoadMore(postsData.loadMore);

        // Set posts
        setPosts(postsData.blog);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    getPost();
  }, [page]);

  const nextPage = () => {
    setPage(prevState => prevState + 1);
  };

  const prevPage = () => {
    setPage(prevState => prevState - 1);
  };

  return (
    <section className="blog">
      {/*** Blog Display ***/}
      <div className="blog__grid-container container">
        {!loading ? (
          <div className="blog__grid">
            {posts.map(post => (
              <BlogCards
                key={post._id}
                blogId={post._id}
                title={post.title}
                body={post.body}
                postedDate={post.postedDate}
              />
            ))}
          </div>
        ) : (
          <Loading
            styles={{
              margin: "0 auto",
              width: "10rem"
            }}
          />
        )}
      </div>

      {/*** Next / Prev Buttons ***/}
      <div className="blog__buttons-container">
        <button
          onClick={page > 1 && !loading ? prevPage : null}
          className={
            page > 1 && !loading ? "btn-prev btn-prev--active" : "btn-prev"
          }
        >
          Prev
        </button>
        <button
          onClick={loadMore && !loading ? nextPage : null}
          className={
            loadMore && !loading ? "btn-next btn-next--active" : "btn-next"
          }
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Blog;
