import React from "react";
import { useSelector } from "react-redux";
import CardRow from "@components/cardRow";
const MoviesAll = () => {
  const { categories } = useSelector((state) => state.general);
  return (
    <>
      {categories.map((item) => (
        <CardRow category={item} key={item.id} />
      ))}
    </>
  );
};

export default React.memo(MoviesAll);
