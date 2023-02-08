import styled from 'styled-components'
import { color, breakpoint } from '../../../configs/utilities'

export const PageTitle = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  text-transform: uppercase;
  color: ${color.blue};

  @media screen and (min-width: ${breakpoint.xxl}) {
    font-size: 28px;
  }
`

export const SectionTitle = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.13em;
  text-transform: uppercase;

  @media screen and (min-width: ${breakpoint.xxl}) {
    font-size: 36px;
    line-height: 44px;
  }
`

export const SectionDescription = styled.p`
  font-weight: 300;
  font-size: 16px;
  line-height: 28px;
  text-transform: uppercase;

  @media screen and (min-width: ${breakpoint.xxl}) {
    font-size: 18px;
    line-height: 30px;
  }
`

export const SectionText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin: 10px 0;
`
