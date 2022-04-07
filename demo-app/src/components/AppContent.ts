import styled from "styled-components";

export const AppContent = styled.main`
  flex: 1 1 auto;

  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;

  & > section {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
    max-width: 55ch;
  }
`;
