import styled from 'styled-components';

const Link = styled.a`
  display: block;
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin-bottom: 40px;
  padding: 15px 0;
  line-height: 1.5em;
  position: relative;
  text-decoration: none;
  transition: color 300ms;

  &:hover {
    color: #999;
  }

  &:last-child {
    border: 0;
  }
`;

export default Link;
