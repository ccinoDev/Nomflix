/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import styled, { keyframes } from "styled-components";

const imgRotate = keyframes`
	100% {
    	transform: rotate(360deg);
    }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 70px;
  margin-top: 100px;
`;

const LoadingImg = styled.span`
  animation: ${imgRotate} 3s linear infinite;
  transform-origin: 50% 50%;
`;

export default () => (
  <Container>
    <LoadingImg role="img" aria-label="loading">
      ⏳
    </LoadingImg>
  </Container>
);
