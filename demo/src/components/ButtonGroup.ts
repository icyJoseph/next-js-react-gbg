import styled from "styled-components";

type ButtonGroupProps = { gap?: string };

export const ButtonGroup = styled.div<ButtonGroupProps>`
  margin: 0 auto;
  text-align: center;

  margin-bottom: 2rem;

  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.gap || "0.5rem"};
`;
