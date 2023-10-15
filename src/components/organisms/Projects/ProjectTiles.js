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

const ProjectSection = styled.section`
	color: ${({ theme }) => theme.lightGray};
	max-width: 1200px;
	margin: auto;
`;

const ProjectsWrapper = styled.ul`
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

const ProjectTiles = ({ projects, lang }) => {
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
		<Wrapper id="projects">
			<Element name="projects">
				<Content>
					<Main>
						<Separator />
						{lang === 'en' && (
							<React.Fragment>
								<SectionHeader
									heading="Side projects"
									paragraph={
										<span>
											My side projects building which, I learned web development
											and discovered new technologies.
											<br />
											All of them are also available on my{' '}
											<a href="https://github.com/DamianWrooby" rel="nofollow">
												GitHub profile.
											</a>
										</span>
									}
								/>
							</React.Fragment>
						)}
						{lang === 'pl' && (
							<React.Fragment>
								<SectionHeader
									heading="Projekty poboczne"
									paragraph={
										<span>
											Moje projekty poboczne budując które, uczyłem się web
											developmentu i odkrywałem nowe technologie.
											<br />
											Pełna lista projektów dostępna na moim{' '}
											<a href="https://github.com/DamianWrooby" rel="nofollow">
												profilu GitHub
											</a>
											.
										</span>
									}
								/>
							</React.Fragment>
						)}
						<ProjectSection ref={TilesRef}>
							{projects.length === 0 ? (
								<InfoWrapper>
									<p>There are no blog projects yet.</p>
								</InfoWrapper>
							) : (
								<ProjectsWrapper>{projects}</ProjectsWrapper>
							)}
							<LinkWrapper>
								{lang === 'en' && (
									<Link to="/projects">→ See all projects</Link>
								)}
								{lang === 'pl' && (
									<Link to="/pl/projects">→ Zobacz wszystkie projekty</Link>
								)}
							</LinkWrapper>
						</ProjectSection>
					</Main>
				</Content>
			</Element>
		</Wrapper>
	);
};

export default ProjectTiles;
