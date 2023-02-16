import React from 'react';
import styled from 'styled-components';
import { color } from '../../../configs/utilities';
import { Link } from 'react-router-dom';

const SearchResults = ({ items, onSelect }) => {
	return (
		<Wrapper>
			{items.map((item, index) => (
				<li key={index} onClick={() => onSelect(item)}>
					<Link to={`${item.subcategory.category.slug}/${item.slug}`}>
						<span>{item.name}</span>
						<Details>
							<span>{item.subcategory.category.name}</span>
							<span>/</span>
							<span>{item.subcategory.name}</span>
						</Details>
					</Link>
				</li>
			))}
		</Wrapper>
	);
};

export default SearchResults;

const Wrapper = styled.ul`
	box-shadow: 0px 1px 2px 0px rgba(163, 153, 153, 0.75);
	background: ${color.black};
	position: absolute;
	width: 400px;
	text-align: left;
	top: 45px;
	left: 0;
	list-style: none;
	padding: 0 15px;
	height: auto;
	z-index: 999999999;
	border-bottom-right-radius: 4px;
	border-bottom-left-radius: 4px;

	li {
		margin: 15px 0;
		width: fit-content;
		a {
			color: ${color.white};
		}
	}
`;

const Details = styled.span`
	font-size: 12px;
	color: ${color.gray};
	display: flex;
	column-gap: 3px;
`;
