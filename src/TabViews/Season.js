import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import noImage from "../Assets/noPosterSmall.png";

const Container = styled.div``;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 200px;
  background-size: cover;
  background-position: center center;
  transition: opacity 0.1s linear;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const Name = styled.h3`
  text-align: center;
  margin-bottom: 5px;
`;

const Date = styled.div`
  text-align: center;
  color: grey;
`;

const Season = ({ poster, name, date }) => (
  <Container>
    <Image
      bgUrl={poster ? `https://image.tmdb.org/t/p/w300${poster}` : noImage}
    />

    <Name>{name}</Name>
    <Date>{date}</Date>
  </Container>
);

Season.propTypes = {
  id: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Season;
