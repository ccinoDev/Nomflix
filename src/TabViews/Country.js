import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const Country = ({ id, name }) => (
  <Container>
    <Image
      bgUrl={
        id
          ? `https://cdn.ipregistry.co/flags/twemoji/${id.toLowerCase()}.svg`
          : require("../assets/noPosterSmall.png")
      }
    />
    <Name>{name}</Name>
  </Container>
);

Country.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Country;
