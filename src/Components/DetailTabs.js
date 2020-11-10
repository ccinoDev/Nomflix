import React, { useState } from "react";
import styled from "styled-components";
import Video from "../TabViews/Video";
import Company from "../TabViews/Company";
import Country from "../TabViews/Country";
import Section from "./Section";

const Header = styled.header`
  width: 100%;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  color: white;
  box-shadow: 1px 1px 2px black, 0 0 25px yello, 0 0 5px rgb(225, 177, 44);
  padding-bottom: 20px;
`;

const List = styled.ul`
  display: flex;
  font-size: 18px;
  padding-left: 20px;
  margin-bottom: 10px;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-right: 20px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.isClicked ? "#f9ca24" : "transparent")};
  &:hover {
    color: rgb(246, 229, 141);
  }
  transition: border-bottom 0.5s ease-in-out;
`;

const tabNamesMovie = ["Videos", "Companies", "Countries"];
const tabNamesTV = ["Videos", "Companies", "Seasons"];

export const DetailTabs = ({ result, isMovie }) => {
  const [clickState, setClickState] = useState(0);
  const handleTabs = (idx) => {
    setClickState(idx);
  };
  const selectTab = (idx, result, isMovie) => {
    let renderData = null;
    switch (idx) {
      case 0:
        if (result.videos.results) {
          renderData = result.videos.results.map((video) => (
            <Video key={video.id} id={video.id} youtubeKey={video.key}></Video>
          ));
        }
        break;
      case 1:
        if (result.production_companies) {
          renderData = (
            <Section title="Production Companies">
              {result.production_companies.map((company) => {
                return (
                  <Company
                    key={company.id}
                    id={company.id}
                    logo={company.logo_path}
                    name={company.name}
                  ></Company>
                );
              })}
            </Section>
          );
        }
        break;
      case 2:
        if (isMovie) {
          if (result.production_countries) {
            renderData = (
              <Section title="Production Countries">
                {result.production_countries.map((countries) => (
                  <Country
                    key={countries.iso_3166_1}
                    id={countries.iso_3166_1}
                    name={countries.name}
                  ></Country>
                ))}
              </Section>
            );
          }
        } else {
        }
        break;
      default:
        break;
    }

    return renderData;
  };

  return (
    <Header>
      <List>
        {isMovie
          ? tabNamesMovie.map((name, idx) => (
              <Item
                key={idx}
                onClick={() => handleTabs(idx)}
                isClicked={clickState === idx}
              >
                {name}
              </Item>
            ))
          : tabNamesTV.map((name, idx) => (
              <Item
                key={idx}
                onClick={() => handleTabs(idx)}
                isClicked={clickState === idx}
              >
                {name}
              </Item>
            ))}
      </List>
      {selectTab(clickState, result, isMovie)}
    </Header>
  );
};
