import styled from 'styled-components';
import React from 'react';
import { Props } from '.';
import { flexCenter, mainCard } from 'styles';

export const style = (Component: React.FC<Props>) => styled(Component)`
  ${mainCard}
  background-color: #2E2833;
  justify-content: space-between;
  .count_num {
    ${flexCenter}
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6rem;
    height: 5.6rem;
    transform: translate(-50%, -58%);
    & > span {
      display: block;
      &:first-child {
        font-size: 1.5em;
      }
      &:last-child {
        text-align: right;
      }
    }
  }
  .count {
    & > div {
      &:nth-child(2) {
        
        margin: 0 auto;
        padding-bottom: 1rem;
        position: relative;
      }

      &:nth-child(3) {
        padding-top: 0.5rem;
        text-align: center;
      }
    }
  }
  .clock {
    font-size: 1.2rem;
  }
`;
