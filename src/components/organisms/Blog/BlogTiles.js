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
	padding: 110px 0;
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

const PostsSection = styled.section`
	color: ${({ theme }) => theme.lightGray};
	max-width: 1200px;
	margin: auto;
`;

const PostsWrapper = styled.ul`
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

const BlogTiles = ({ posts, lang }) => {
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
		<Wrapper id="blog">
			<Element name="blog">
				<Content>
					<Main>
						<Separator />
						{lang === 'en' && (
							<SectionHeader
								heading="Blog"
								paragraph="Check out recent blog articles"
							/>
						)}
						{lang === 'pl' && (
							<SectionHeader
								heading="Blog"
								paragraph="Sprawdź ostatnie artykuły na blogu"
							/>
						)}
						<PostsSection ref={TilesRef}>
							{posts.length === 0 ? (
								<InfoWrapper>
									<p>There are no blog posts yet.</p>
								</InfoWrapper>
							) : (
								<PostsWrapper>{posts}</PostsWrapper>
							)}
							<LinkWrapper>
								{lang === 'en' && <Link to="/blog">→ See all articles</Link>}
								{lang === 'pl' && (
									<Link to="/pl/blog">→ Zobacz wszystkie artykuły</Link>
								)}
							</LinkWrapper>
						</PostsSection>
					</Main>
				</Content>
			</Element>
		</Wrapper>
	);
};

export default BlogTiles;
