import { StaticImage } from 'gatsby-plugin-image';
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

const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	${({ theme }) => theme.mq.xl} {
		flex-direction: row;
	}
	width: 100%;
`;

const WaveWrapper = styled.div`
	position: absolute;
	width: 100%;
	z-index: 2;
	margin-top: -180px;
	display: none;
	${({ theme }) => theme.mq.md} {
		display: block;
		margin-top: -250px;
	}
	${({ theme }) => theme.mq.xl} {
		margin-top: -270px;
	}
	${({ theme }) => theme.mq.xxl} {
		margin-top: -360px;
	}
`;

const wavePath = (
	<WaveWrapper>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
			<path
				fill="#03131D"
				fillOpacity="1"
				d="M0,128L720,192L1440,128L1440,320L720,320L0,320Z"
			/>
		</svg>
	</WaveWrapper>
);

const ImageWrapper = styled.figure`
	${({ theme }) => theme.mq.xl} {
		padding: 25px 60px 0px 60px;
	}
	border-radius: 50%;
`;

const ContentWrapper = styled.div`
	width: 100%;
`;

const Heading = styled.h3`
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.xl};
	font-weight: 900;
	color: white;
	padding: 25px 0 25px 0;
`;

const SkinnyText = styled.span`
	font-weight: 400;
`;

const GrayText = styled.span`
	color: ${({ theme }) => theme.gray};
`;

const Link = styled.a`
	color: #ff6d43;
	&:hover {
		color: #ff6d43;
		opacity: 0.8;
	}
`;

const AboutMe = ({ lang }) => {
	const imageRef = useRef(null);
	const contentRef = useRef(null);

	useEffect(() => {
		const image = imageRef.current;
		const content = contentRef.current;

		if (image) {
			gsap.from(image, {
				autoAlpha: 0,
				x: '-=150',
				scrollTrigger: {
					trigger: image,
					start: 'top bottom-=200px',
				},
			});
			gsap.from(content.children, {
				autoAlpha: 0,
				y: '-=50',
				duration: 0.5,
				stagger: 0.1,
				scrollTrigger: {
					trigger: image,
					start: 'top bottom-=200px',
				},
			});
		}
	}, []);

	return (
		<Wrapper id="aboutme">
			<Element name="aboutme">
				{wavePath}
				<Content>
					<Main>
						<Separator />
						{lang === 'en' && (
							<SectionHeader
								heading="About Me"
								paragraph="This is how my programming journey looks like."
							/>
						)}
						{lang === 'pl' && (
							<SectionHeader
								heading="O mnie"
								paragraph="Poznaj moją historię"
							/>
						)}
						<InnerWrapper>
							<ImageWrapper ref={imageRef}>
								<StaticImage
									src="../../../assets/images/avatar.png"
									alt="Avatar picture"
									style={{
										height: '35rem',
										width: '35rem',
										borderRadius: '50%',
									}}
								/>
							</ImageWrapper>
							<ContentWrapper ref={contentRef}>
								<Heading>
									<GrayText>Current:</GrayText>{' '}
									<SkinnyText>
										Application Developer at{' '}
										<Link href="https://eviden.com/">Eviden</Link>
									</SkinnyText>
								</Heading>
							</ContentWrapper>
						</InnerWrapper>
					</Main>
				</Content>
			</Element>
		</Wrapper>
	);
};

export default AboutMe;
