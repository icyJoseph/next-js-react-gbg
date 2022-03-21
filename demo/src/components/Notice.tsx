import styled from "styled-components";

export const Notice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 2rem;

  > div {
    width: 100%;
    max-width: 550px;
  }

  > div > i {
    margin-left: -1rem;
  }
`;
