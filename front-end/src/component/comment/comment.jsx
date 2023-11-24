import { faPaperPlane, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDecode } from "../../redux/authSlice";
import { query } from "../../access";
import { axiosClient } from "../../access/api/axios-client";
import { CommentItem } from "./comment-item";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  comments: yup
    .string()
    .typeError("Không được để trống bình luận")
    .required("Không được để trống bình luận")
    .min(5, "Vui lòng điền tối thiểu 5 ký tự!")
    .nullable(),
});
export const Comment = (props) => {
  const { productId, name } = props;
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comments: "",
    },
    resolver: yupResolver(schema),
  });
  const [comment, setComment] = useState([]);
  const [update, setUpdate] = useState({ value: 1 });
  const userInfo = useSelector(getUserDecode);

  const handleFormSubmit = async (e) => {
    const comment = {
      content: getValues("comments"),
      user: userInfo._id,
      product: productId,
    };
    try {
      await axiosClient.post("/comment/add", comment);
      setUpdate((state) => ({ value: state.value + 1 }));
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    setUpdate((state) => ({ value: state.value + 1 }));
  };

  useEffect(() => {
    let isCancelling = false;
    (async () => {
      try {
        const {
          data: { productComment },
        } = await query().comment.getListByProductId(productId);
        if (isCancelling === false) {
          setComment(productComment);
        }
      } catch (error) {}
    })();

    return () => {
      isCancelling = true;
    };
  }, [productId, update.value]);

  return (
    <section className="comment-wrap">
      <div className="comment">
        <div className="comment-heading">
          <h5 className="comment-heading-text">Bình luận về {name}</h5>
        </div>
        <form
          className="comment-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <div className="form-field-bottom">
            <textarea
              placeholder="Nội dung tối thiểu 5 ký tự"
              type="text"
              required
              className="comment-form-area"
              {...register("comments")}
            ></textarea>
          </div>
          {errors.comments && (
            <span className="reply-error">{errors?.comments?.message}</span>
          )}
          <div className="comment-form-action">
            <div className="comment-form-action-text">
              {userInfo === null && (
                <p style={{ color: "#fd475a" }}>
                  * Bạn cần đăng nhập để bình luận!
                </p>
              )}
            </div>
            <button
              type={userInfo === null ? "button" : "submit"}
              className="btn comment-form-action-btn"
              style={{ cursor: userInfo === null ? "no-drop" : "pointer" }}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              <span>Gửi bình luận</span>
            </button>
          </div>
        </form>
        <div className="comment-list">
          {comment.length > 0 ? (
            comment.map((item) => (
              <CommentItem key={item._id} {...item} onRefesh={handleRefresh} />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>Chưa có bình luận!</p>
          )}
        </div>
      </div>
    </section>
  );
};
