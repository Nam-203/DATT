import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify/dist";
import { query } from "../../access";
import { axiosClient } from "../../access/api/axios-client";
import { getUserDecode } from "../../redux/authSlice";

export const CommentItem = (props) => {
  const { _id, user, updatedAt, content, product, replyComment, onRefesh } =
    props;
  const [replyActive, setReplyActive] = useState(false);
  const replyRef = useRef(null);
  const [error, setError] = useState("");
  const userInfo = useSelector(getUserDecode);
  const handleReplyClick = () => {
    setReplyActive(!replyActive);
  };

  const handleReplySubmit = async () => {
    if (replyRef.current.value.length < 5) {
      setError(true);
      return;
    }
    setError(false);
    const replyComment = {
      content: replyRef.current.value,
      user: userInfo._id,
      product: product._id,
    };
    try {
      await axiosClient.post("/comment/reply?id=" + _id, replyComment);
      replyRef.current.value = "";
      setReplyActive(false);
      onRefesh();
    } catch (error) {
      console.log(
        "🚀 ~ file: comment-item.jsx ~ line 30 ~ handleReplySubmit ~ error",
        error
      );
    }
  };
  const deleteComment = (_id) => {
    axiosClient
      .delete(`/comment/delete/${_id}`)
      .then(() => {
        query()
          .store.getAll()
          .then(({ data }) => {
            onRefesh();
            toast.success("Bình luận đã được xóa thành công!");
          });
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };
  const deleteCommentReply = (_id) => {
    axiosClient
      .delete(`/RepCmt/deleteReply/${_id}`)
      .then(() => {
        query()
          .store.getAll()
          .then(({ data }) => {
            onRefesh();
            toast.success("Bình luận đã được xóa thành công!");
          });
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };
  return (
    <div key={_id} className="comment-list-item">
      <div className="comment-item-media">
        <img
          src={"https://hoanghamobile.com/Content/web/img/no-avt.png"}
          alt="No avatar"
          className="rounded-circle comment-item-img"
        />
      </div>
      <div className="comment-item-content">
        <div className="comment-item-detail">
          <div className="comment-detail-heading">
            <p className="comment-detail-heading-text">
              {user.firstName + " " + user.lastName}
            </p>
            <time className="comment-detail-time">
              {moment(updatedAt).fromNow()}
            </time>
          </div>
          <p className="comment-detail-text">{content}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button onClick={handleReplyClick} className="comment-action">
          <FontAwesomeIcon icon={faReply} />
        </button>

        <>
          {user._id === userInfo._id ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              style={{ marginTop: "53px" }}
              onClick={() => deleteComment(_id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          ) : null}
        </>
      </div>

      <div className="reply-comment-list">
        {replyComment?.map(({ content, _id, user }) => (
          <div key={_id} className="comment-list-item reply-comment-item">
            <div className="comment-item-media media">
              <img
                src={user.image}
                alt=""
                className="rounded-circle comment-item-img"
              />
            </div>

            <div className="comment-item-detail reply-comment-content">
              <div className="comment-detail-heading">
                <p className="comment-detail-heading-text">
                  {user.firstName + " " + user.lastName}
                  {user.role === "admin" ? (
                    <span className="comment-manager">Quản trị viên</span>
                  ) : null}
                </p>
                <time className="comment-detail-time">
                  {moment(updatedAt).fromNow()}
                </time>
              </div>
              <p className="comment-detail-text content-main">{content}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              <>
                {user._id === userInfo._id ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    width="15px"
                    onClick={() => deleteCommentReply(_id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                ) : null}
              </>
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="comment-reply-input"
        ref={replyRef}
        placeholder="Nhập tối thiểu 5 ký tự."
        style={{ display: replyActive ? "block" : "none" }}
      />
      <button
        type="button"
        onClick={handleReplySubmit}
        className="comment-reply-btn"
        style={{ display: replyActive ? "block" : "none" }}
      >
        Gửi
      </button>
      {error && (
        <span className="reply-error">Vui lòng điền tối thiểu 5 ký tự!</span>
      )}
    </div>
  );
};
