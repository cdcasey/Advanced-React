import Link from 'next/link';
import styled from 'styled-components';

import Nav from './Nav';

export default function Header() {
  return (
    <HeaderStyled>
      <div className="bar">
        <Logo>
          <Link href="/">Sick Fits</Link>
        </Logo>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </HeaderStyled>
  );
}

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  z-index: 2;
  position: relative;
  background: red;
  transform: skew(-7deg);
  a {
    text-decoration: none;
    text-transform: uppercase;
    color: white;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyled = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;
