import React from "react";
import styled from "@emotion/styled";
import Timer from "../components/Timer";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";

const Wrapper = styled.div`
	background: #FAFAFA;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.35vw + 16px);
  margin: 0 auto;
  height: 100vh;
`;
const Heading = styled.h1`
  font-size: 2em;
`;

const theme = {
	colors: {
		primary: '#222'
	}
}

export default () => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Global
        styles={css`
          html {
            font-family: Arial, Helvetica, sans-serif;
          }
          * > div {
          }
        `}
      />
      {/* <Heading>Pomodoro Timer</Heading> */}
      <Timer />
    </Wrapper>
  </ThemeProvider>
);
