/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { moviesApi } from "../api";
import styled from "styled-components";
import Section from "../Components/Section";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Poster from "../Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
  padding: 20px;
`;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState({
    nowPlaying: null,
    upcoming: null,
    popular: null,
  });

  const handleMovies = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      setMovies({
        nowPlaying,
        upcoming,
        popular,
      });
    } catch {
      setError("Can't find movie information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMovies();
  }, []);

  return (
    <>
      <Helmet>
        <title>Movies | Nomflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Helmet>
            <title>Movies | Nomflix</title>
          </Helmet>
          {movies.nowPlaying && movies.nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {movies.nowPlaying.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {movies.upcoming && movies.upcoming.length > 0 && (
            <Section title="Upcoming Movies">
              {movies.upcoming.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {movies.popular && movies.popular.length > 0 && (
            <Section title="Popular Movies">
              {movies.popular.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {error && <Message color="#e74c3c" text={error} />}
        </Container>
      )}
    </>
  );
};

export default Home;
