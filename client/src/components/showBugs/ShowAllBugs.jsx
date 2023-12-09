import { useSelector } from "react-redux";
import SingleBug from "./SingleBug";
import "./showBugs.css";

export default function ShowAllBugs() {
  const allBugs = useSelector((data) => data.bugReducer);
  return (
    <div className="show-bugs-container">
      <div className="bug-container-title">
        <p>Project Bugs</p>
      </div>
      <div className="bugs-detail-header">
        <p className="bug-type">Type</p>
        <p className="bug-title">Title</p>
        <p className="bug-desc">Description</p>
        <p className="bug-type">Status</p>
        <p className="bug-type">Resolve </p>
        <p className="bug-type">Assigned</p>
        <p className="bug-pic bug-type"></p>
      </div>
      <div className="bugs-content">
        {
          allBugs.length !== 0 ?
        allBugs?.map((item) => {
          return <SingleBug key={item._id} data={item} />;
        }) : <p>No Bugs found</p>}
      </div>
    </div>
  );
}
