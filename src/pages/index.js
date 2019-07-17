import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Timer from "../components/Timer";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";

const Wrapper = styled.div`
  background: #9acc58;
  background: ${({ theme }) => theme.background.primary };
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.35vw + 16px);
  margin: 0 auto;
  height: 100vh;
  transition: 0.5s ease-out background;
`;

const THEMES = ['green', 'sassy'];

const ThemeToggle = () => {
  return (
    <select>
      {THEMES.map(theme => <option value={theme}>{theme}</option>)}
    </select>
  )
}

const theme = {
  green: {
    colors: {
      primary: '#222'
    },
    background: {
      primary: '#9acc58'
    }
  },
  sassy: {
    colors: {
      primary: '#fff'
    },
    background: {
      primary: '#DB7093'
    }
  }
}

export default () => {
  const [currentTheme, setCurrentTheme] = useState('green');
  return (
    <>
      <select onChange={(event) => setCurrentTheme(event.target.value)}>
        {THEMES.map((theme, index) => <option key={index} value={theme}>{theme}</option>)}
      </select>
      <ThemeProvider theme={theme[currentTheme]}>
        <Wrapper>
          <Global
            styles={css`
          html {
            font-family: Arial, Helvetica, sans-serif;
          }
        `}
          />
          <Timer />
        </Wrapper>
      </ThemeProvider>
    </>
  );
}
