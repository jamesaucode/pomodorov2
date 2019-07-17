import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Button = styled.button`
  background: #4267B2;
  border-radius: 3px;
  border: none;
  color: white;
  font-weight: bold;
  margin: 0 10px;
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
