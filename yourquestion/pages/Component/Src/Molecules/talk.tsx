import React, { useState, useEffect } from "react";
import { decodeToken } from "../api/token/userJWT";
import {
  fetchUserMessages,
  fetchAdminMessages,
} from "../api/fetch/talkPageFetch/massageApi";
import { Message } from "../interface/massage";

interface TalkProps {
  title: string; // title을 prop으로 받음
}

export const Talk: React.FC<TalkProps> = ({ title }) => {
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [adminMessages, setAdminMessages] = useState<Message[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const combinedMessages = [...userMessages, ...adminMessages].sort(
    (a, b) => a.sequenceNumber - b.sequenceNumber
  );

  useEffect(() => {
    if (isPopupOpen) {
      const token = localStorage.getItem("token");
      const decoded = token ? decodeToken(token) : null;
      const userID = decoded ? decoded.userID : "";

      console.log("UserID:", userID); // userID 로깅
      console.log("Title:", title); // title 로깅

      if (userID && title) {
        fetchUserMessages(userID, title)
          .then(setUserMessages)
          .catch(console.error);
        fetchAdminMessages(userID, title)
          .then(setAdminMessages)
          .catch(console.error);

        const intervalUser = setInterval(
          () =>
            fetchUserMessages(userID, title)
              .then(setUserMessages)
              .catch(console.error),
          5000
        );
        const intervalAdmin = setInterval(
          () =>
            fetchAdminMessages(userID, title)
              .then(setAdminMessages)
              .catch(console.error),
          5000
        );

        return () => {
          clearInterval(intervalUser);
          clearInterval(intervalAdmin);
        };
      }
    }
  }, [isPopupOpen, title]);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <>
      <button className="p-2 bg-red-200 rounded-full" onClick={togglePopup}>
        💬
      </button>
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-15 flex justify-end items-start"
          onClick={togglePopup}
        >
          <div
            className="bg-white p-4 w-1/2 mt-14 mr-10 h-4/5 rounded-lg shadow-lg max-w-md "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button onClick={togglePopup} className="text-xl">
                📌
              </button>
            </div>
            <div className=" mt-10 w-full h-5/6 overflow-y-auto whitespace-nowrap bg-gray-500">
              <div className="flex flex-col space-y-4 p-2">
                {combinedMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sequenceNumber % 2 === 0
                        ? "justify-end ml-auto w-11/12"
                        : "justify-start mr-auto w-11/12"
                    } items-start `}
                  >
                    <div
                      className={`rounded px-4 py-2 shadow text-white break-words overflow-y-auto whitespace-normal w-auto ${
                        message.sequenceNumber % 2 === 0
                          ? "bg-pink-300"
                          : "bg-blue-300"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Talk;
