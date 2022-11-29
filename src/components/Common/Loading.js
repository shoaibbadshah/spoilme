import React from "react";
import * as Progress from "react-native-progress";

export const Loading = ({color, itemStyle, size = 100 }) => {
  return (
    <Progress.Circle
      style={[{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -50 }, { translateY: -50 }],
      },itemStyle]}
      indeterminate
      size={size}
      color={color}
    />
  );
};
