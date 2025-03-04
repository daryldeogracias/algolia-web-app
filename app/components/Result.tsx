import React from "react";

import { Hit } from "instantsearch.js";
import { Highlight } from "react-instantsearch";

interface Props {
  hit: Hit;
}

const Result: React.FC<Props> = ({ hit }) => {
  return (
    <article>
      <div>
        <h1>
          <Highlight attribute="name" hit={hit} />
        </h1>
        <p>
          <Highlight attribute="description" hit={hit} />
        </p>
      </div>
    </article>
  );
};

export default Result;
