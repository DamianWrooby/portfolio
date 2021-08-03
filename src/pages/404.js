import React from 'react';
import styled from 'styled-components';

import Content from '../components/atoms/Content/Content';
import Seo from '../components/atoms/Seo/Seo';
import Navigation from '../components/organisms/Navigation/Navigation';
import NavigationProvider from '../contexts/NavigationContext';
import Layout from '../layouts/layout';

const StyledContent = styled(Content)`
&& {
	color: ${({ theme }) => theme.white};
}
h1 {
	font-size: ${({ theme }) => theme.fontSize.xl};
	${({ theme }) => theme.mq.md} {
	font-size: ${({ theme }) => theme.fontSize.xxl};
	}
	font-weight: ${({ theme }) => theme.extraBold};
	padding-bottom: 1rem;
}
`;

const PageTemplate = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
`;

const FourtyFour = styled.div`
	color: ${({ theme }) => theme.neonBlue};
	font-size: ${({ theme }) => theme.fontSize.xxxl};
	${({ theme }) => theme.mq.md} {
		font-size: 18rem;
	}
	font-weight: ${({ theme }) => theme.extraBold};
	font-family: ${({ theme }) => theme.fonts.subFont};
	letter-spacing: -1rem;
`;

const NotFoundPage = () => (
	<NavigationProvider>
		<Layout>
			<Seo title="404: Not found" />
			<Navigation lang="en" />
			<PageTemplate>
				<StyledContent>
					<FourtyFour>404</FourtyFour>
					<h1>Page not found</h1>
					<p>Check if URL address is correct or use main navigation</p>
				</StyledContent>
			</PageTemplate>
		</Layout>
	</NavigationProvider>
);

export default NotFoundPage;
