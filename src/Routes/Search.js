/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import { moviesApi, tvApi } from "../api";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Message from "../Components/Message";
import Poster from "../Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState({
    movieResults: null,
    tvResults: null,
  });
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search !== "") {
      searchByTerm();
    }
  };

  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setSearch(value);
  };

  const searchByTerm = async () => {
    setLoading(true);
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(search);
      const {
        data: { results: tvResults },
      } = await tvApi.search(search);
      setResult({
        movieResults,
        tvResults,
      });
    } catch {
      setError("Can't find results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Search | Nomflix</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or TV Shows..."
          value={search}
          onChange={updateTerm}
        />
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {result.movieResults && result.movieResults.length > 0 && (
            <Section title="Movie Results">
              {result.movieResults.map((movie) => (
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
          {result.tvResults && result.tvResults.length > 0 && (
            <Section title="TV Show Results">
              {result.tvResults.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {error && <Message color="#e74c3c" text={error} />}
          {result.tvResults &&
            result.movieResults &&
            result.tvResults.length === 0 &&
            result.movieResults.length === 0 && (
              <Message text="Nothing found" color="#95a5a6" />
            )}
        </>
      )}
    </Container>
  );
};

export default Search;
