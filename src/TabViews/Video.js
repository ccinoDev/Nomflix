import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 10px;
`;

const VideoFrame = styled.iframe`
  width: 560px;
  height: 315px;
`;

const Video = ({ id, youtubeKey }) => (
  <Container>
    <VideoFrame
      key={id}
      src={`https://www.youtube.com/embed/${youtubeKey}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></VideoFrame>
  </Container>
);

Video.propTypes = {
  id: PropTypes.string.isRequired,
  youtubeKey: PropTypes.string.isRequired,
};

export default Video;
