import React, { useEffect } from "react";
import CreateBug from "../../components/createBug/CreateBug";
import "./projectDetailPage.css";
import ShowAllBugs from "../../components/showBugs/ShowAllBugs";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProjectBugsAction } from "../../actions/bugActions";
import { getLoggedUser } from "../../utils/user";
import PostDetail from "../../components/posts/PostDetail";
import BugModal from '../../components/model/bugModal/BugModal'
import HomeContextProvider from "../../context/homeContext/HomeContext";
import restrict from '../../assets/restrict.svg'

const ProjectDetailPage = () => {
  const { id: projectId } = useParams();
  const { role } = getLoggedUser();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectBugsAction(projectId));
  }, [projectId]);

  return (
    <HomeContextProvider>
      <div className="detail-page-container">
        <div className="project-detail-container">
          <p>Add Bugs</p>
          {role !== 'QA' && <span className="restrict">Restricted <img src={restrict} alt="" /></span>}
          {role === "QA" ? <CreateBug /> : null}
        </div>
        <div className="project-bugs-container">
          <p>Project Detail</p>
          <PostDetail projectId={projectId} />
          <div className="project-all-bugs">
            <ShowAllBugs />
          </div>
        </div>
        <BugModal/>
      </div>
    </HomeContextProvider>
  );
};
export default ProjectDetailPage;
