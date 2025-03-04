import React from "react";
import Search from "./components/Search";
import AlgoliaInstantProvider from "./algolia-insta.provider";

export const dynamic = "force-dynamic";

const Home = () => {
  return (
    <AlgoliaInstantProvider>
      <Search />
    </AlgoliaInstantProvider>
  );
};

export default Home;
