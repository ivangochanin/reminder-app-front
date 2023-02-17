import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { showContainer } from './configs/animations';
import { LayoutWrapper } from './components/utils/Wrappers';
import Navbar from './components/layout/navbar/Navbar';
import { Home, Reminders, Error } from './pages';
import Reminder from './components/common/reminder/Reminder';

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
						<Route path=":slug" element={<Reminders />}>
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
