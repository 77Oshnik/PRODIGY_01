import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { CiHeart, CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";


const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const likehandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
            size="40"
            round={true}
          />
          <div className=" ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-1">
                @{tweet?.userDetails[0]?.username}
              </p>
            </div>
            <div>
              <p>{tweet.description}</p>
            </div>
            {/* <div className=''>
                            <img className='w-full object-cover' src="data:image/jpeg;base64,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" alt="" srcset="" />
                        </div> */}
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <FaRegComment size="20px" />
                </div>
                <p>{tweet?.comments}</p>
              </div>
              <div className="flex items-center">
                <div
                  onClick={() => likehandler(tweet?._id)}
                  className="p-2 hover:bg-pink-200 rounded-full cursor-pointer"
                >
                  <CiHeart size="24px" />
                </div>
                <p>{tweet?.likes.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
                  <CiBookmark size="24px" />
                </div>
                <p>0</p>
              </div>
              {user?._id === tweet?.userId && (
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className="flex items-center"
                >
                  <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
                    <MdOutlineDeleteOutline size="24px" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
