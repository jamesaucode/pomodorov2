import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Button = styled.button`
  border: none;
  border-radius: 3px;
  background: #666;
  color: white;
  font-weight: bold;
  padding: 0.5em 1.5em;
`;
export default ({ controls, delay }) => {
  return (
    <Wrapper>
      <Button onClick={controls.toggleTimer}>{`${
        delay ? "Stop" : "Start"
      } Timer`}</Button>
      <Button onClick={controls.resetTimer}>Reset</Button>
    </Wrapper>
  );
};
