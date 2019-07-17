import React, { useState } from 'react';
import styled from '@emotion/styled';

const StyledHeading = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 3em;
  padding: 1em;
`;
const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 3em;
  padding: 0.25em;
  text-align: center;
`;
const Heading = () => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState('This is a heading');
    const toggleSetEditing = () => {
        setEditing(!editing);
    }
    const handleChange = (event) => {
        setText(event.target.value);
    }
    return (
        editing ?
            <StyledInput autoFocus value={text} onBlur={toggleSetEditing} onChange={handleChange} />
            :
            <StyledHeading onClick={toggleSetEditing}>{text}</StyledHeading>
    )
}

export default Heading;