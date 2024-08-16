import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaImages } from "react-icons/fa";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh ,getIsActive,getAllTweets} from "../redux/tweetSlice";

const Createpost = () => {
  const [description, useDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    useDescription("");
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };
  const followingHandler = () => {
    dispatch(getIsActive(false));
  };
  return (
    <div>
      <div className="">
        <div className="flex justify-evenly border-b border-gray-200 items-center">
          <div
            onClick={forYouHandler}
            className={`${
              isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg">For you</h1>
          </div>
          <div
            onClick={followingHandler}
            className={`${
              !isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center">
          <div>
            <Avatar
              src="data:image/jpeg;base64,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"
              size="50"
              round={true}
            />
          </div>
          <input
            type="text"
            value={description}
            onChange={(e) => useDescription(e.target.value)}
            placeholder="What is happening?!"
            className="ml-2 w-full outline-none border-none text-lg"
          />
        </div>
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <FaImages className="size-7" />
          <div>
            <button
              onClick={submitHandler}
              className=" bg-[#1A8CD8] px-6  py-2 rounded-full border-none text-white text-lg"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createpost;
