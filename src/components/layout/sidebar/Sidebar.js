import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AccordionCustom from '../../common/accordion/AccordionCustom';
import { color } from '../../../configs/utilities';
import { showContainer } from '../../../configs/animations';
import { useParams } from 'react-router-dom';

const Sidebar = (props) => {
	const containerContent = useRef(null);
	const [isCollapsable, setIsCollapsable] = useState([]);
/* 	const { slug } = useParams(); */

	console.log(useParams());
	useEffect(() => {
		if (props.loading) {
			containerContent.current.style.visibility = 'hidden';
		}
		if (!props.loading) {
			showContainer(containerContent);
		}
	}, [props.loading]);

	const updateIndex = (index) => {
		let copyInitialState = [...isCollapsable];
		let item = isCollapsable[index];
		item = !item;
		copyInitialState[index] = item;
		setIsCollapsable(copyInitialState);
	};

	useEffect(() => {
	    const itemsArray = props.subCategories.map(() => {
			return false;
		});
		setIsCollapsable(itemsArray);
	}, [props.subCategories]);

	return (
		<AnimationWrapper ref={containerContent}>
			{props.subCategories.length ? (
				<Wrapper>
					<h1>{props.slug}</h1>
					{props.subCategories.map((item, index) =>
						item.reminders.length ? (
							<AccordionCustom
								key={index}
								item={item}
								loading={props.loading}
								isCollapsable={isCollapsable[index]}
								index={index}
								clicked={(index) => {
									updateIndex(index);
								}}
							/>
						) : null
					)}
				</Wrapper>
			) : null}
		</AnimationWrapper>
	);
};

export default Sidebar;

const AnimationWrapper = styled.div`
	visibility: hidden;
	display: block;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 20px;
	text-align: center;

	h1 {
		text-transform: capitalize;
		color: ${color.gray};
		margin-bottom: 30px;
	}

	a {
		font-family: 'Roboto Mono', monospace;
		color: ${color.black};
		font-size: 14px;
	}

	.active {
		color: ${color.yellow};
	}
`;
