import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import noImage from "../assets/noPosterSmall.png";

const Container = styled.div``;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 100px;
  background-size: cover;
  background-position: center center;
  transition: opacity 0.1s linear;
  margin-bottom: 10px;
`;

const Name = styled.h3`
  text-align: center;
`;

const Company = ({ logo, name }) => (
  <Container>
    <Image bgUrl={logo ? `https://image.tmdb.org/t/p/w300${logo}` : noImage} />
    <Name>{name}</Name>
  </Container>
);

Company.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Company;
