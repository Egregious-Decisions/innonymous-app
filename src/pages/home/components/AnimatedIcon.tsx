import styled from 'styled-components';
import IconAnimation from './IconAnimation';

export default styled.div`
  font-family: 'Noto Color Emoji', sans-serif;
  font-size: 2em;
  animation: ${IconAnimation} 3s linear infinite;
  > div {
    width: 1.2em;
    height: 1em;
  }
`;
