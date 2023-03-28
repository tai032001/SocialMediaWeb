import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "screen/navbar";
import UserWidget from "screen/widgets/UserWidget";
import MyPostWidget from "screen/widgets/MyPostWidget";
import PostsWidget from "screen/widgets/PostsWidget";
import AdvertWidget from "screen/widgets/AdvertWidget";
import ListFriend from "screen/widgets/ListFriend";
const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <NavBar />
      <Box
        width={"100%"}
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent={"space-between"}
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis={"26%"}>
            <AdvertWidget />
            <Box m={"2rem 0"} />
            <ListFriend userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
