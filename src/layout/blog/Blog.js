import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// Components
import BlogCards from "../../components/blog/BlogCards";
import Loading from "../../components/loading/Loading";

// Custom hooks
import useLoading from "../../hooks/useLoading";

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

        console.log(postsData);
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
  }, [page, setLoading]);

  const nextPage = () => {
    setPage(prevState => prevState + 1);
  };

  const prevPage = () => {
    setPage(prevState => prevState - 1);
  };

  return (
    <section className="blog">
      <Helmet>
        <title>Hugh's diesel and auto repair | Blog</title>
        <meta
          name="description"
          content="Hugh's diesel and auto repair, located in Great Falls, Montana. Stay up to date with any news or updates that we have through our blog!"
        />
      </Helmet>
      {/*** Blog Display ***/}
      <div className="blog__grid-container container">
        {!loading ? (
          posts.length > 0 ? (
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
            <h3>No blog posts to display</h3>
          )
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
      {posts.length > 0 ? (
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
      ) : null}
    </section>
  );
};

export default Blog;
