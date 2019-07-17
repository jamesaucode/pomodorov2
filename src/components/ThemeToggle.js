import React from 'react';
import styled from '@emotion/styled';

const THEMES = ['green', 'sassy'];

const ThemeToggle = () => {
    return (
        <select>
            {THEMES.map(theme => <option value={theme}>{theme}</option>)}
        </select>
    )
}

export default ThemeToggle;