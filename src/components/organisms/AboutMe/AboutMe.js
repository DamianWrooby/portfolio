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
		margin: 0;
		padding: 25px 60px 0px 60px;
	}
	margin: auto;
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

const Description = styled.div`
	font-family: ${({ theme }) => theme.fonts.subFont};
	font-size: ${({ theme }) => theme.fontSize.lg};
	color: ${({ theme }) => theme.lightGray};
	line-height: 1.5;
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
		<Wrapper id="about-me">
			<Element name="about-me">
				{wavePath}
				<Content>
					<Main>
						<Separator />
						{lang === 'en' && (
							<SectionHeader
								heading="About Me"
								paragraph="Behind the Code: My Story and Expertise"
							/>
						)}
						{lang === 'pl' && (
							<SectionHeader
								heading="Kim jestem?"
								paragraph="Poznaj moją historię i doświadczenie"
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
							{lang === 'pl' && (
								<ContentWrapper ref={contentRef}>
									<Heading>
										<GrayText>Obecnie:</GrayText>{' '}
										<SkinnyText>
											Application Developer w{' '}
											<Link href="https://eviden.com/">Eviden</Link>
										</SkinnyText>
									</Heading>
									<Description>
										<p>
											Obecnie jestem częścią zespołu deweloperskiego w projekcie
											dla instytucji europejskiej, gdzie pomagam rozwijać i
											utrzymywać aplikację <strong>Angularową</strong> jako
											Frontend Developer.
										</p>
									</Description>
									<Description>
										<h3>Moja kariera w świecie programowania</h3>
										<p>
											W wieku 28 lat, w poszukiwaniu satysfakcji z pracy,
											postanowiłem kompletnie zmienić moją karierę i zostać
											programistą frontendu. Na początku postawiłem na{' '}
											<strong>Reacta</strong>, z pomocą którego po godzinach
											stworzyłem kilka projektów, które później pomogły mi
											trafić na programistyczny bootcamp organizowany w dużej
											firmie, gdzie pracuję do dziś. W trakcie bootcampu jako
											zespół tworzyliśmy aplikację której frontend oparty był o{' '}
											<strong>Vue</strong>. Po bootcampie trafiłem do obecnego
											projektu komercyjnego, gdzie z kolei frontend bazuje na
											trzecim frontendowym frameworku z jakim miałem do
											czynienia - <strong>Angularze</strong>.
										</p>
										<h3>Projekty poboczne</h3>
										<p>
											Poboczne projekty traktuję jako plac zabaw, gdzie mogę
											testować nowe technologie i zgłębiać wiedzę związaną z już
											poznanymi rozwiązaniami. W programowaniu, podobnie jak w
											życiu prywatnym lubię różnorodność, która w połączeniu z
											wrodzoną ciekawością sprawiają, że ciągle chcę odkrywać
											nieznane.
										</p>
										<h3>Po godzinach</h3>
										<p>
											W czasie wolnym zajmuję się głównie aktywnościami
											fizycznymi, jak piłka nożna, jazda na rowerze czy trening
											na siłowni. Sport pełni ważną rolę w moim życiu już od
											najmłodszych lat a obecnie pomaga mi zniwelować skutki
											siedzenia przed komputerem.
										</p>
									</Description>
								</ContentWrapper>
							)}
							{lang === 'en' && (
								<ContentWrapper ref={contentRef}>
									<Heading>
										<GrayText>Currently:</GrayText>{' '}
										<SkinnyText>
											Application Developer at{' '}
											<Link href="https://eviden.com/">Eviden</Link>
										</SkinnyText>
									</Heading>
									<Description>
										<p>
											I am currently part of a development team in a project for
											an European institution where I help develop and maintain
											an enterprise <strong>Angular</strong> application as
											Frontend Developer.
										</p>
									</Description>
									<Description>
										<h3>My career evolution</h3>
										<p>
											At the age of 28, in search of job satisfaction, I decided
											to completely change my career and become a frontend
											developer. At first I set my sights on{' '}
											<strong>React</strong>, with the help of which I created
											several projects after hours, which later helped me get to
											a programming bootcamp held at a large company, where I
											still work today. During the bootcamp, as a team we
											created an application whose frontend was based on another
											framework - <strong>Vue</strong>. After the bootcamp I
											ended up in my current commercial project, where in turn
											the frontend is based on the third frontend framework I
											had to deal with - <strong>Angular</strong>.
										</p>
										<h3>Side projects</h3>
										<p>
											I treat side projects as a playground where I can test new
											technologies and explore knowledge related to already
											learned solutions. In programming, as in my personal life,
											I like variety, which, combined with my innate curiosity,
											makes me constantly want to explore the unknown.
										</p>
										<h3>Beyond programming</h3>
										<p>
											After hours, I am mainly involved in various sports, such
											as soccer, cycling and training at the gym. Sports have
											played an important role in my life since I was young and
											are now helping me to offset the effects of sitting in
											front of a computer.
										</p>
									</Description>
								</ContentWrapper>
							)}
						</InnerWrapper>
					</Main>
				</Content>
			</Element>
		</Wrapper>
	);
};

export default AboutMe;
