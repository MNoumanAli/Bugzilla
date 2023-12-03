import { useDispatch, useSelector } from "react-redux";
import SinglePost from "./SinglePost";
import "./posts.css";
import React, { useContext, useEffect } from "react";
import { getAllProjectsAction } from "../../actions/projectActions";
import { notifyError } from "../../utils/toast";
import { fetchUser } from "../../actions/userAction";
import { HomeContext } from "../../context/homeContext/HomeContext";

const AllPosts = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((data) => data.projectReducer);
  const { role, id } = useContext(HomeContext);
  useEffect(() => {
    try {
      dispatch(getAllProjectsAction(role, id));
      if (role === "Manager") {
        dispatch(fetchUser("Developer"));
        dispatch(fetchUser("QA"));
      }
    } catch (error) {
      notifyError("Project Fetch Failed.");
    }
  }, []);
  return (
    <div className="all-posts">
      <div className="all-posts-title">
        <p>All Posts</p>
      </div>
      {allPosts?.map((item) => {
        return (
          <>
            <SinglePost
              key={item.id}
              owner={item.owner}
              title={item.title}
              description={item.description}
              id={item.id}
            />
            <div className="div-line"></div>
          </>
        );
      })}
    </div>
  );
};

export default AllPosts;
