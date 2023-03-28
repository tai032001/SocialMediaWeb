import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight={"500"}>
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ads</Typography>
      </FlexBetween>
      <img
        width={"100%"}
        height="auto"
        alt="advert"
        src="//localhost:5000/assets/ads.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      ></img>
      <FlexBetween>
        <Typography color={main}>Name of advertising</Typography>
        <Typography color={medium}>facebook.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Desciption of your ads
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
