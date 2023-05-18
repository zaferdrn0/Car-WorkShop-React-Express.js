import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { backendFetchGET, backendFetchPOST } from "../utils/backendFetch";
import "./css/Workshop.css";
import WorkshopBox from "../components/WorkshopBox";
import Comment from "../components/Comment";
const Workshop = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [workshop, setWorkshop] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [bildirimMesaji, setBildirimMesaji] = useState("");

  let id = searchParams.get("id");

  let queryParams = new URLSearchParams({
    id: id,
  });

  useEffect(() => {
    const getWorkshop = () => {
      backendFetchGET(
        "/getWorkshop?" + queryParams.toString(),
        async (response) => {
          const data = await response.json();
          setWorkshop(data);
        }
      );
    };
    getWorkshop();
  }, []);

  const CommentAdd = () => {
    backendFetchPOST(
      "/addComment",
      { comment: comment, workshopId: id },
      async (response) => {
        const data = await response.json();
        setComments([ data.comment,...comments]);
        setComment("");
        setBildirimMesaji(data.message);
      }
    );
  };

  useEffect(() => {
    if (bildirimMesaji !== "")
      setTimeout(() => {
        setBildirimMesaji("");
      }, 5000);
  }, [bildirimMesaji]);

  useEffect(() => {
    backendFetchGET(
      "/getComment?" + queryParams.toString(),
      async (response) => {
        const data = await response.json();
        setComments(data);
      }
    );
  }, []);

  return (
    <div>
      <div className="workshop-details">
        <div className="workshop-details-center">
          <WorkshopBox workshop={workshop} />
        </div>
      </div>
      <div className="workshop-details">
        <div className="workshop-details-comment">
          <div className="comment-container">
            <div className="comment-input-container">
              <div className="comment-input">
                <h1>Servis Değerlendirmeleri</h1>
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Servisi Değerlendiriniz"
                ></textarea>
              </div>
              {bildirimMesaji != "" && <div>{bildirimMesaji}</div>}
              <div className="comment-input">
                <button onClick={CommentAdd}>Yorum Yap</button>
                <hr></hr>
                <hr></hr>
              </div>
              <div className="comment-list">
                {comments.map((cmnt, index) => {
                  return (
                    <Comment
                      key={index}
                      name={cmnt.user}
                      comment={cmnt.comment}
                      date={cmnt.date}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
