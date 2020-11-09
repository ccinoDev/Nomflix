import React, { useEffect, useState } from "react";
import { tvApi } from "../api";
import styled from "styled-components";
import Section from "../Components/Section";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Poster from "../Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
  padding: 20px;
`;

const TV = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tv, setTv] = useState({
    topRated: null,
    popular: null,
    airingToday: null,
  });

  const handleTV = async () => {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      setTv({ topRated, popular, airingToday });
    } catch {
      setError("Can't find TV information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleTV();
  }, []);

  return (
    <>
      <Helmet>
        <title>TV Shows | Nomflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {tv.topRated && tv.topRated.length > 0 && (
            <Section title="Top Rated Shows">
              {tv.topRated.map((show) => (
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
          {tv.popular && tv.popular.length > 0 && (
            <Section title="Popular Shows">
              {tv.popular.map((show) => (
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
          {tv.airingToday && tv.airingToday.length > 0 && (
            <Section title="Airing Today">
              {tv.airingToday.map((show) => (
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
        </Container>
      )}
    </>
  );
};

export default TV;
