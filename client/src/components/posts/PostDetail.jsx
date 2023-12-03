import React, { useEffect, useState } from "react";
import { getProjectDetail } from "../../api/post";
import { notifyError } from "../../utils/toast";

export default function PostDetail({ projectId }) {
  const [detail, setDetail] = useState({});

  const fetchDetail = async () => {
    const res = await getProjectDetail(projectId);
    setDetail(res.data);
  };
  useEffect(() => {
    try {
      fetchDetail();
    } catch (error) {
      notifyError("Error Fetching Project Detail");
    }
  }, [projectId]);

  return (
    <div className="post-detail-container">
      <div className="post-detail-upper">
        <p className="post-detail-title">{detail?.title}</p>
        <p className="post-detail-desc">{detail?.description}</p>
      </div>
      <div className="post-detail-lower">
        <p>Developers : {detail?.developer}</p>
        <p>QAs : {detail?.QA}</p>
        <p>Bugs : {detail?.bugs}</p>
      </div>
    </div>
  );
}
