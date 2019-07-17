import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Controls from "./Controls";
import Heading from './Heading';
import ArrowUp from "../../static/assets/arrowup.svg";
import ArrowDown from "../../static/assets/arrowdown.svg";
import { useInterval } from "../hooks/useInterval";
import { secondsToMS } from "../../utils/helper";

const Wrapper = styled.div`
  align-items: center;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  max-height: 300px;
  width: 100%;
`;
const SVGWrapper = styled.div`
  padding: 1em;
  &:hover {
    cursor: pointer;
  }
`;
const StyledHeading = styled.h1`
  font-size: 3em;
  color: ${({ theme }) => theme.colors.primary};
`;
const Input = styled.input`
  font-size: 2em;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;
const TimeAndControls = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;
export default () => {
  const initTime = 2;
  const [rounds, setRounds] = useState(4);
  const [editing, setEditing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initTime);
  const [timeInput, setTimeInput] = useState();
  const [delay, setDelay] = useState(false);
  useEffect(() => {
    document.title = delay ? `${secondsToMS(timeLeft)}` : 'Pomodoro Timer v2' ;
  }, [delay,timeLeft])
  useInterval(() => {
    setTimeLeft(timeLeft - 1);
    if (timeLeft <= 0) {
      setRounds(rounds - 1);
      setTimeLeft(initTime);
      setDelay(false);
      if (rounds === 0) {
        alert('You have completed all rounds!');
        setDelay(false);
      }
    }
  }, delay);
  const controls = {
    addMinute: () => {
      setTimeLeft(timeLeft + 60);
    },
    minusMinute: () => {
      if (timeLeft - 60 >= 0) {
        setTimeLeft(timeLeft - 60);
      }
    },
    toggleTimer: () => {
      console.log(Date.now());
      setDelay(delay ? null : 1001);
    },
    resetTimer: () => {
      setDelay(false);
      setTimeLeft(initTime);
    },
  };
  const handleOnBlur = event => {
    const trimmedInput = event.target.value.trim();
    if (!trimmedInput) {
      setEditing(false);
      return ;
    }
    const hms = trimmedInput.split(":");
    let factor = Math.pow(60, hms.length - 1);
    let final = 0;
    for (let i = 0; i < hms.length; i++) {
      final += isNaN(parseInt(hms[i])) ? 0 : parseInt(hms[i]) * factor;
      factor /= 60;
    }
    setTimeLeft(final);
    setEditing(false);
  };
  const handleFocus = event => {
    event.target.select();
    setTimeInput("");
  };
  const handleChange = event => {
    const trimmedInput = event.target.value.trim();
    const trimmedInputLength = trimmedInput.replace(/:/g, "").length;
    if (trimmedInputLength > 4) {
      return;
    }
    const finalString =
      trimmedInputLength % 3 === 0 && trimmedInputLength !== 0
        ? trimmedInput.slice(0, trimmedInputLength - 1) + ":" + trimmedInput.slice(-1)
        : trimmedInput;
    setTimeInput(finalString);
  };
  return (
    <Wrapper>
      <Heading />
      <TimeAndControls>
        {editing ? (
          <Input
            autoFocus
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleOnBlur}
            value={timeInput}
            placeholder={secondsToMS(timeLeft)}
          />
        ) : (
            <>
              <SVGWrapper onClick={controls.addMinute}>
                <ArrowUp />
              </SVGWrapper>
              <StyledHeading onClick={() => setEditing(true)}>
                {secondsToMS(timeLeft)}
              </StyledHeading>
              <SVGWrapper onClick={controls.minusMinute}>
                <ArrowDown />
              </SVGWrapper>
            </>
          )}
      </TimeAndControls>
      <Controls controls={controls} delay={delay} />
    </Wrapper>
  );
};
