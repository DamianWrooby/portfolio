import React from "react";
import styled from "styled-components";
import ListItem from "../../atoms/ListItem/ListItem";
import htmlIcon from "../../../assets/icons/html-5.svg";
import cssIcon from "../../../assets/icons/css3.svg";

const ItemList = () => {
  return (
    <>
      <ListItem icon={htmlIcon}>HTML5</ListItem>
      <ListItem icon={cssIcon}>CSS3</ListItem>
    </>
  );
};

export default ItemList;
