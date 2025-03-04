"use client";

import React from "react";

import { IndexUiState, UiState } from "instantsearch.js";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { search } from "./fetch/search";

interface Props {
  children: React.ReactNode;
}

function cleanState<TIndexUiState extends IndexUiState>(
  uiState: TIndexUiState
): TIndexUiState {
  // @ts-ignore
  const { configure, objectID, ...trackedUiState } = uiState;
  return trackedUiState as TIndexUiState;
}

const AlgoliaInstantProvider: React.FC<Props> = ({ children }) => {
  return (
    <InstantSearchNext
      searchClient={{
        search,
      }}
      indexName="instant_search"
      insights={false}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
      routing={{
        router: {
          cleanUrlOnDispose: false,
          createURL({ qsModule, routeState, location }) {
            const { protocol, hostname, port = "", pathname, hash } = location;
            const queyrString = qsModule.stringify(routeState, {
              encode: false,
            });
            const portWithPrefix = port === "" ? "" : `:${port}`;

            if (!queyrString) {
              return `${protocol}//${hostname}${portWithPrefix}${pathname}${hash}`;
            }

            return `${protocol}//${hostname}${portWithPrefix}${pathname}?${queyrString}${hash}`;
          },
        },
        stateMapping: {
          stateToRoute(uiState: UiState) {
            let objectID;

            if (typeof window !== "undefined") {
              objectID =
                new URLSearchParams(window.location.search).get("objectID") ||
                undefined;
            }

            return Object.keys(uiState).reduce(
              (state, indexId) => ({
                ...state,
                [indexId]: cleanState(uiState[indexId] || {}),
              }),
              {
                objectID,
              } as UiState
            );
          },
          routeToState(routeState = {} as UiState) {
            return Object.keys(routeState).reduce(
              (state, indexId) => ({
                ...state,
                [indexId]: cleanState(routeState[indexId] || {}),
              }),
              {} as UiState
            );
          },
        },
      }}
    >
      {children}
    </InstantSearchNext>
  );
};

export default AlgoliaInstantProvider;
