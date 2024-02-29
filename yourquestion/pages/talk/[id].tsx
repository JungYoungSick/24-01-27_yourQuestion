// pages/talk/[id].tsx
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MainPage from "../index";

const TalkPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTitle = async () => {
      setTitle(`${id}`);
    };

    if (id) {
      fetchTitle();
    }
  }, [id]);

  return <MainPage title={title} />;
};

export default TalkPage;
