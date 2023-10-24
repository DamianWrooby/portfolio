import { Link } from 'gatsby';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { Element } from 'react-scroll';
import styled from 'styled-components';

import Content from '../../atoms/Content/Content';
import Separator from '../../atoms/Separator/Separator';
import SectionHeader from '../../molecules/SectionHeader/SectionHeader';

const Wrapper = styled.section`
	position: relative;
	background-color: ${({ theme }) => theme.dark};
	min-height: 100vh;
	margin-top: 110px;
`;

const Main = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 0 80px;
	flex-direction: column;
	color: ${({ theme }) => theme.white};
	${({ theme }) => theme.mq.md} {
		padding: 20px 0 80px;
	}
	${({ theme }) => theme.mq.xxl} {
		padding: 20px 0 60px;
	}
`;

const WebsiteSection = styled.section`
	color: ${({ theme }) => theme.lightGray};
	max-width: 1200px;
	margin: auto;
`;

const WebsitesWrapper = styled.ul`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(1, minmax(0, 1fr));
	gap: 2rem;
	grid-gap: 2rem;
	padding: 2rem 3rem 4rem 3rem;
	${({ theme }) => theme.mq.md} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

const InfoWrapper = styled.div`
	width: 100%;
	text-align: center;
	color: ${({ theme }) => theme.lightGray};
`;

const LinkWrapper = styled.div`
	width: 100%;
	padding-right: 3rem;
	font-size: ${({ theme }) => theme.fontSize.lg};
	text-align: center;
	${({ theme }) => theme.mq.md} {
		text-align: right;
	}
`;

const WaveWrapper = styled.div`
	position: absolute;
	width: 100%;
	z-index: 2;
	margin-top: 90px;
`;

const wavePath = (
	<WaveWrapper>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
			<path
				fill="#03131D"
				fillOpacity="1"
				d="M0,64L720,96L1440,32L1440,0L720,0L0,0Z"
			/>
		</svg>
	</WaveWrapper>
);

const WebsiteTiles = ({ websites, lang }) => {
	const TilesRef = useRef(null);

	useEffect(() => {
		const Tiles = TilesRef.current;

		gsap.from(Tiles, {
			autoAlpha: 0,
			y: '-=50',
			duration: 2,
			scrollTrigger: {
				trigger: Tiles,
				start: 'top bottom-=300px',
			},
		});
	}, []);

	return (
		<Wrapper id="websites">
			<Element name="websites">
				<Content>
					<Main>
						<Separator />
						{lang === 'en' && (
							<React.Fragment>
								<SectionHeader
									heading="Web design"
									paragraph={
										<span>
											In addition to web applications, I also create website
											designs for companies.
											<br />
											Here are some of them.
										</span>
									}
								/>
							</React.Fragment>
						)}
						{lang === 'pl' && (
							<React.Fragment>
								<SectionHeader
									heading="Strony internetowe"
									paragraph={
										<span>
											Poza aplikacjami webowymi, tworzę również projekty stron
											internetowych dla firm.
											<br />
											Poniżej niektóre z nich.
										</span>
									}
								/>
							</React.Fragment>
						)}
						<WebsiteSection ref={TilesRef}>
							{websites.length === 0 ? (
								<InfoWrapper>
									<p>There are no projects yet.</p>
								</InfoWrapper>
							) : (
								<WebsitesWrapper>{websites}</WebsitesWrapper>
							)}
							<LinkWrapper>
								{lang === 'en' && (
									<Link to="/websites">→ See all web design projects</Link>
								)}
								{lang === 'pl' && (
									<Link to="/pl/websites">
										→ Zobacz wszystkie projekty stron
									</Link>
								)}
							</LinkWrapper>
						</WebsiteSection>
					</Main>
				</Content>
				{wavePath}
			</Element>
		</Wrapper>
	);
};

export default WebsiteTiles;
