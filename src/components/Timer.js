import React, { useState } from "react";
import styled from "@emotion/styled";
import Controls from "./Controls";
import ArrowUp from "../../static/assets/arrowup.svg";
import ArrowDown from "../../static/assets/arrowdown.svg";
import { useInterval } from "../hooks/useInterval";
import { secondsToMS } from "../../utils/helper";

const Wrapper = styled.div`
  align-items: center;
  background: #8cc63e;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  width: 100%;
  max-height: 800px;
  max-width: 600px;
`;
const SVGWrapper = styled.div`
  padding: 1em;
  &:hover {
    cursor: pointer;
  }
`;
const Heading = styled.h1`
  font-size: 3em;
  color: ${({ theme }) => theme.colors.primary};
`;
const Input = styled.input`
  font-size: 2em;
  color: ${({ theme }) => theme.colors.primary};
`;
const TimeAndControls = styled.div`
  display: flex;
  align-items: center;
`;
export default () => {
  const initTime = 1500;
  const [editing, setEditing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initTime);
  const [timeInput, setTimeInput] = useState();
  const [delay, setDelay] = useState(1000);
  useInterval(() => {
    setTimeLeft(timeLeft - 1);
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
      setDelay(delay ? null : 1000);
    },
    resetTimer: () => {
      setTimeLeft(initTime);
    },
  };
  const handleOnBlur = event => {
    const hms = event.target.value.split(":");
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
    const input = event.target.value;
    const inputLength = input.replace(/:/g, "").length;
    if (inputLength > 4) {
      return ;
    }
    const finalString =
      inputLength % 3 === 0 && inputLength !== 0
        ? input.slice(0, inputLength - 1) + ":" + input.slice(-1)
        : input;
    setTimeInput(finalString);
  };
  return (
    <Wrapper>
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
            <Heading onClick={() => setEditing(true)}>
              {secondsToMS(timeLeft)}
            </Heading>
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
