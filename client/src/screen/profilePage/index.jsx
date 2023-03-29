import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import ListFriend from "screen/widgets/ListFriend";
import MyPostWidget from "screen/widgets/MyPostWidget";
import PostsWidget from "screen/widgets/PostsWidget";
import UserWidget from "screen/widgets/UserWidget";
import NavBar from "screen/navbar";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    console.log(userId);
    const response = await axios.get(`//localhost:5000/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    // fetch(`http://localhost:5000/user/${userId}`, {
    //   method: "GET",
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // console.log(response.json());
    // const data = await response.json();
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          {/* <ListFriend userId={userId} /> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
