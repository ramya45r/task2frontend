import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPostDetailsAction,
} from "../../../redux/slices/Posts/PostSlices";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import * as DOMPurify from "dompurify";
import DateFormatter from "../../../utils/DateFormatter";
import LoadingComponent from "../../../utils/LoadingComponent";


import { FiShare2 } from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import alert css
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
import { FaRegBookmark, FaBookmark, FaFlag, FaRegFlag } from "react-icons/fa";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "3%",
  },
};
const PostDetails = () => {
  const { id } = useParams();
  console.log(id,'vvvvvvvvvvvvvvvvvvvvvvvvvvv');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  //Select post details from store
  const post = useSelector((state) => state?.post);
  const {
    postDetails,
    loading,
    appErr,
    serverErr,
  
  } = post;

  
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch]);

  //Get login user
  const user = useSelector((state) => state.users);
  const { userAuth } = user;
  const isCreatedBy = postDetails?.user?._id === userAuth?._id;

  console.log(isCreatedBy);
  const tostAlert = (msg) => {
    toast.success(msg);
  };
 


  const shareUrl = `http://localhost:3000/posts/${postDetails?._id}`;
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  return (
  
    <>
      {loading ? (
        <div className="h-screen">
          <LoadingComponent />
        </div>
      ) : appErr || serverErr ? (
        <h1 className="h-screen text-red-400 text-xl">
          {appErr} {serverErr}
        </h1>
      ) : (
        <section className="py-20 2xl:py-40 bg-gray-200 overflow-hidden">
          <div className="container px-4 mx-auto">
            {/* Post Image */}
            <img
              className="mx-auto w-100 h-96 "
              src={postDetails?.image}
              alt=""
            />
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-7 mb-5 text-4xl 2xl:text-4xl text-black font-bold font-heading font-serif">
                {postDetails?.title}
              </h2>
              {/* Post description */}
              <div className="max-w-xl mx-auto">
                <p className="mb-6 text-left  text-xl text-black-200 text-center ">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(postDetails?.description),
                    }}
                  ></div>

                
                </p>
              </div>
            </div>
          </div>
        

          <Toaster position="top-center" reverseOrder={false} />
        </section>
      )}
    </>
  );
};

export default PostDetails;
