import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { theme } from '../styles/theme'

const Wrapper = styled.div`
  --switch-width: 64px;
  --switch-height: 32px;
  --switch-padding: 3px;
  --switch-animation-duration: 0.2s;

  .switch__input,
  .label {
    position: absolute;
    left: 0;
    top: 0;
  }

  .switch__input {
    margin: 0;
    padding: 0;
    opacity: 0;
    height: 0;
    width: 0;
    pointer-events: none;

    &:checked + .label {
      background-color: var(--color-primary);
    }

    &:checked + .label + .switch__marker {
      left: calc(100% - var(--switch-height) + var(--switch-padding));
    }

    &:focus + .label,
    &:active + .label {
      box-shadow: 0 0 0 3px alpha(var(--color-primary), 0.2);
    }
  }

  .label {
    width: 100%;
    height: 100%;
    color: transparent;
    user-select: none;
    background-color: var(--color-contrast-low);
    border-radius: inherit;
    z-index: 1;
    transition: background var(--switch-animation-duration);
  }

  .switch__marker {
    position: relative;
    background-color: ${theme.light.colors.primary};
    width: calc(var(--switch-height) - var(--switch-padding) * 2);
    height: calc(var(--switch-height) - var(--switch-padding) * 2);
    border-radius: 50%;
    z-index: 2;
    pointer-events: none;
    box-shadow: 0 1px 1px hsla(0, 0%, 0%, 0.25);
    left: var(--switch-padding);
    transition: left var(--switch-animation-duration);
    will-change: left;
  }
`

const Switch = styled.div`
  background-color: ${theme.light.colors.secondary};
  display: inline-block;
  flex-shrink: 0;
  align-items: center;
  position: relative;
  width: var(--switch-width);
  height: var(--switch-height);
  border-radius: 50em;
  padding: var(--switch-padding) 0;
`

const DEFAULT_THEME = 'light'

const useEffectDarkMode = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME)

  useEffect(() => {
    const themeSaved = localStorage.getItem('theme')
    setTheme(themeSaved)
  }, [])

  return [theme, setTheme]
}

const SwitchTheme = () => {
  const [theme, setTheme] = useEffectDarkMode(DEFAULT_THEME)

  const toggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', JSON.stringify(newTheme))
    setTheme(newTheme)
  }

  return (
    <Wrapper>
      <Switch>
        <input className="switch__input" type="checkbox" id="switchCheckbox1" />
        <label
          aria-hidden="true"
          className="label"
          htmlFor="switchCheckbox1"
          onClick={() => toggle()}
        >
          On
        </label>
        <div aria-hidden="true" className="switch__marker"></div>
      </Switch>
    </Wrapper>
  )
}

export default SwitchTheme
