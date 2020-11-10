/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { getCollections } from "../api";
import styled from "styled-components";
import Section from "../Components/Section";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Poster from "../Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 80%;
  margin-bottom: 30px;
`;

const Collection = ({
  match: {
    params: { id },
  },
  history: { push },
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collections, setCollections] = useState(null);

  const handleCollections = async () => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    try {
      const { data: collections } = await getCollections(parsedId);
      setCollections(collections);
    } catch {
      setError("Can't find movie information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCollections();
  }, []);

  return (
    <>
      <Helmet>
        <title>Collections | Nomflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Backdrop
            bgImage={`https://image.tmdb.org/t/p/original${collections.backdrop_path}`}
          />
          <Content>
            <Data>
              <Title>{collections && collections.name}</Title>
              <Overview>{collections.overview}</Overview>

              {collections.parts && collections.parts.length > 0 && (
                <Section title="Collections">
                  {collections.parts.map((collection) => (
                    <Poster
                      key={collection.id}
                      id={collection.id}
                      imageUrl={collection.poster_path}
                      title={collection.title}
                      rating={collection.vote_average}
                      isMovie={true}
                    />
                  ))}
                </Section>
              )}
              {error && <Message color="#e74c3c" text={error} />}
            </Data>
          </Content>
        </Container>
      )}
    </>
  );
};

export default Collection;
