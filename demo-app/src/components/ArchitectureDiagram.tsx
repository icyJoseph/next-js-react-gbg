"use client";

import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 1.5rem;
  align-items: start;
  font-size: 0.75rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  display: grid;
  gap: 0.75rem;
  justify-items: stretch;
`;

const LaneLabel = styled.p`
  margin: 0;
  text-align: center;
  font-size: 0.65rem;
  color: #888;
`;

const Box = styled.section`
  margin: 0;
  font-size: 0.7rem;
  text-align: center;

  & > .title {
    font-size: 0.65rem;
  }
`;

const Arrow = styled.span`
  display: block;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1;
  color: #555;
`;

const Children = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Child = styled.div`
  border: 2px dashed #888;
  padding: 0.5rem;
  font-size: 0.65rem;
  line-height: 1.3;
`;

const ChildTag = styled.span`
  display: inline-block;
  margin-top: 0.25rem;
  font-size: 0.55rem;
  color: #888;
`;

export function ArchitectureDiagram() {
  return (
    <Grid>
      <Column>
        <LaneLabel>Build time</LaneLabel>

        <Box className="nes-container with-title is-rounded">
          <p className="title">next build</p>
          Prerendered static output
          <Children>
            <Child>/</Child>
            <Child>/pokemon/capture</Child>
            <Child>/pokemon/1, /pokemon/4, /pokemon/7</Child>
          </Children>
        </Box>
      </Column>

      <Column>
        <LaneLabel>Runtime</LaneLabel>

        <Box className="nes-container with-title is-rounded">
          <p className="title">Browser</p>
          Visitor session
        </Box>

        <Arrow aria-hidden>↕</Arrow>

        <Box className="nes-container with-title is-rounded">
          <p className="title">proxy</p>
          Issues / refreshes the app-token cookie
        </Box>

        <Arrow aria-hidden>↕</Arrow>

        <Box className="nes-container with-title is-rounded">
          <p className="title">Next.js Server</p>
          <Children>
            <Child>
              Pages
              <br />
              <ChildTag>Server Components</ChildTag>
            </Child>
            <Child>
              /api/wild
              <br />
              <ChildTag>Route Handler</ChildTag>
            </Child>
            <Child>
              capturePokemonAction
              <br />
              <ChildTag>Server Function</ChildTag>
            </Child>
          </Children>
        </Box>

        <Arrow aria-hidden>↓</Arrow>

        <Box className="nes-container with-title is-rounded">
          <p className="title">Poké API</p>
          External REST API
        </Box>
      </Column>
    </Grid>
  );
}
