import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import Links from '../../organisms/Navigation/Links';
import { NavigationContext } from '../../../contexts/NavigationContext';
import MobileNav from './MobileNav';

const Wrapper = styled.nav`
	position: absolute;
	max-width: 100vw;
	top: 0;
	left: 0;
	right: 0;
	height: 80px;
	z-index: 10;
	box-shadow: none;
	background-color: transparent;
	transition: 0.3s;
	${({ theme }) => theme.mq.md} {
		position: fixed;
		${({ active }) =>
			active &&
			css`
				box-shadow: 0 0 10px rgba(84, 227, 255, 0.7);
				background-color: ${({ theme }) => theme.dark};
			`};
	}
`;

const InnerWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	color: ${({ theme }) => theme.white};
`;

const Content = styled.div`
	margin: 0 auto;
	width: 100%;
	height: 100%;
	max-width: 1440px;
	padding: 0;
	${({ theme }) => theme.mq.md} {
		padding: 0 45px;
	}
`;

const List = styled.ul`
	display: none;
	align-items: center;
	${({ theme }) => theme.mq.md} {
		display: flex;
	}
`;

const Navigation = ({ lang }) => {
	const { isTransparent } = useContext(NavigationContext);

	return (
		<React.Fragment>
			<Wrapper active={!isTransparent}>
				<Content>
					<InnerWrapper>
						<List>
							<Links lang={lang} />
						</List>
					</InnerWrapper>
					<MobileNav lang={lang} />
				</Content>
			</Wrapper>
		</React.Fragment>
	);
};

export default Navigation;
