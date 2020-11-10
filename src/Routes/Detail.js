import React, { useEffect, useState } from "react";
import { moviesApi, tvApi } from "../api";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Helmet from "react-helmet";
import { DetailTabs } from "../Components/DetailTabs";
import { Link } from "react-router-dom";

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

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const SmallImg = styled.img`
  padding-top: 5px;
  width: 30px;
  height: 15px;
  object-fit: cover;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 30px;
`;

const Rating = styled.span`
  font-size: 18px;
  margin-left: 10px;
`;

const Detail = ({
  location: { pathname, state },
  match: {
    params: { id },
  },
  history: { push },
}) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const isMovie = pathname.includes("/movie/");

  const handleDetail = async () => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let tmpResult = null;
    try {
      if (isMovie) {
        ({ data: tmpResult } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: tmpResult } = await tvApi.showDetail(parsedId));
      }

      setResult(tmpResult);
    } catch {
      setError("Can't find anything.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDetail();
  }, []);

  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result && result.original_title
            ? result.original_title
            : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result && result.original_title
              ? result.original_title
              : result.original_name}
            <Rating>
              (
              <span role="img" aria-label="rating">
                ⭐️
              </span>{" "}
              {state.rating} / 10)
            </Rating>
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <Item>
              <a
                href={`https://www.imdb.com/title/${result.imdb_id}`}
                target="_sub"
              >
                <SmallImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png"></SmallImg>
              </a>
            </Item>
            {result.belongs_to_collection ? (
              <>
                <Divider>•</Divider>
                <Link to={`/collection/${result.belongs_to_collection.id}`}>
                  <Item>
                    <span style={{ color: "#44bd32" }}>COLLECTIONS</span>
                  </Item>
                </Link>
              </>
            ) : (
              ""
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <DetailTabs
            key={result.id}
            id={result.id}
            result={result}
          ></DetailTabs>
        </Data>
      </Content>
    </Container>
  );
};

export default Detail;
