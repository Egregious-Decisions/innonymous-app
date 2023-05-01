import { keyframes } from 'styled-components';

export default keyframes`
0%, 100% {
  transform: translateX(-100%);
}
10% {
  transform: translateX(-100%) rotateY(180deg);
}
50% {
  transform: translateX(100%) rotateY(180deg);
}
60% {
  transform: translateX(100%) rotateY(0deg);
}
`;
