import React from "react";
import LoadingGif from "../../images/loading.gif";

const Loading = ({ styles }) => {
  console.log(styles);
  return (
    <React.Fragment>
      <img style={styles} src={LoadingGif} alt="loading" />
    </React.Fragment>
  );
};

export default Loading;
