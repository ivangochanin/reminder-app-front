import React from 'react'
import styled from 'styled-components'
import { color, transition } from '../../../configs/utilities'
import { Link } from 'react-router-dom';


const ButtonLink = (props) => {
  return (
    <InternalLink to={props.to}>
      <ButtonStyle>{props.buttonText}</ButtonStyle>
    </InternalLink>
  )
}

export default ButtonLink

const InternalLink = styled(Link)``

const ButtonStyle = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${color.white};
	color: ${color.blue};
	border: 1px solid ${color.blue};
	font-size: 14px;
	font-weight: 700;
	letter-spacing: 1px;
	border-radius: 4px;
	padding: 15px 30px;
  text-align: center;
  cursor: pointer;
  transition: ${transition.default};

  &:hover {
    opacity: 0.8;
  }
`