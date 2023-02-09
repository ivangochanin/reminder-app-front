import React, { useState, useEffect, useRef } from 'react';
import { Home, Categories, Reminder, Error } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { showContainer } from './configs/animations';
import styled from 'styled-components';
import { LayoutWrapper } from './components/common/wrappers/Wrappers';
function App() {
	const [playAnimation, setPlayAnimation] = useState(false);
	const containerContent = useRef(null);

	useEffect(() => {
		const onPageLoad = () => {
			setPlayAnimation(true);
		};

		if (document.readyState === 'complete') {
			onPageLoad();
		} else {
			window.addEventListener('load', onPageLoad);
			return () => window.removeEventListener('load', onPageLoad);
		}
		if (playAnimation) {
			showContainer(containerContent);
		}
	}, [playAnimation]);

	return (
		<BrowserRouter>
			<LayoutWrapper>
				<Navbar />
				<AnimationWrapper ref={containerContent}>
					<Routes>
						<Route path="/" element={<Home />} exact={true} />
						<Route path=":slug" element={<Categories />}>
							<Route path=":reminderSlug" element={<Reminder />} />
						</Route>
						<Route path="*" element={<Error />} />
					</Routes>
				</AnimationWrapper>
			</LayoutWrapper>
		</BrowserRouter>
	);
}

export default App;

const AnimationWrapper = styled.div`
	visibility: hidden;
	display: flex;
`;
