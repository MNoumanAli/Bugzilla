import React, { useContext} from "react";
import { useDispatch } from "react-redux";
import { updateBugAction } from "../../actions/bugActions";
import { getLoggedUser } from "../../utils/user";
import { HomeContext } from "../../context/homeContext/HomeContext";

export default function SingleBug({ data }) {
  const { id: devId, role } = getLoggedUser();
  const dispatch = useDispatch();
  const { setBugModal } = useContext(HomeContext);
  const changeStatus = (status) => {
    dispatch(updateBugAction(status, data._id, status === "new" ? "" : devId));
  };

  const handleResolve = () => {
    if (data.status === "completed" || data.status === "resolved") {
      dispatch(updateBugAction("new", data._id, devId));
    } else {
      dispatch(
        updateBugAction(
          data.type === "feature" ? "completed" : "resolved",
          data._id,
          devId
        )
      );
    }
  };
  return (
    <div className="single-bug-container">
      <p className="bug-type">{data.type}</p>
      <p className="bug-title">{data.title}</p>
      <p className="bug-desc">{data.description}</p>
      <p className="bug-status bug-type">{data.status}</p>
      <span className="bug-type">
        <input
          onChange={handleResolve}
          checked={data.status === "completed" || data.status === "resolved"}
          disabled={data?.developer !== devId || role !== "Developer"}
          className="bug-resolve"
          type="checkbox"
        />
      </span>
      <button
        disabled={
          data.status === "completed" ||
          data.status === "resolved" ||
          role !== "Developer"
        }
        className="bug-assigne bug-type"
        onClick={() =>
          changeStatus(data.status === "started" ? "new" : "started")
        }
      >
        {data.status === "started" ? "assigned" : "assign"}
      </button>
      <p className="bug-detail bug-type" onClick={() => setBugModal(data)}>
        detail
      </p>
    </div>
  );
}
