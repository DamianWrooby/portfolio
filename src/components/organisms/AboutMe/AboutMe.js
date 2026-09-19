import { StaticImage } from 'gatsby-plugin-image';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { Element } from 'react-scroll';
import styled from 'styled-components';

import Content from '../../atoms/Content/Content';
import Separator from '../../atoms/Separator/Separator';
import SectionHeader from '../../molecules/SectionHeader/SectionHeader';

const content = {
	en: {
		header: {
			heading: 'About Me',
			paragraph: 'Behind the Code: My Story and Expertise',
		},
		role: 'Frontend Engineer',
		facts: ['4+ years commercial experience', 'Angular', 'TypeScript'],
		intro: (
			<>
				I enjoy working on complex applications where architecture,
				maintainability, and a thoughtful user experience matter as much as
				getting the feature to work.
			</>
		),
		tabsLabel: 'About me sections',
		tabs: [
			{
				id: 'work',
				label: 'Work',
				paragraphs: [
					<>
						Most of my professional experience comes from large-scale enterprise
						applications, including <strong>Angular</strong> microfrontend
						architectures, state management with <strong>NgRx</strong> and{' '}
						<strong>RxJS</strong>, Java-based backends, and event-driven
						systems. I&apos;ve worked on applications that have to stay
						maintainable for years, modernize in steps rather than rewrites, and
						absorb changes without breaking the rest of a large codebase.
					</>,
					<>
						I&apos;m particularly interested in the engineering side of frontend
						development: designing clear boundaries, reducing unnecessary
						complexity, improving performance, and finding pragmatic solutions
						that remain understandable months or years later. Recently,
						I&apos;ve also been expanding toward backend development with{' '}
						<strong>Java</strong>, <strong>Spring Boot</strong>,{' '}
						<strong>Node.js</strong>, and databases, with the goal of becoming a
						more versatile full-stack engineer.
					</>,
				],
			},
			{
				id: 'projects',
				label: 'Projects',
				paragraphs: [
					<>
						Outside of my professional work, I like building things from
						scratch. One example is <strong>GymCraft</strong>, a personal
						project combining training analytics, Garmin data, AI-generated
						insights, and workout planning. It lets me experiment with product
						development, AI, APIs, data processing, and everything else that
						comes with turning an idea into a working application.
					</>,
					<>
						I&apos;m curious about new technologies, particularly AI-assisted
						software development, and I experiment with tools and workflows that
						can make development more efficient without sacrificing code
						quality.
					</>,
				],
			},
			{
				id: 'beyond',
				label: 'Beyond code',
				paragraphs: [
					<>
						I&apos;m also a runner, which probably explains why I approach both
						software and training the same way: consistent progress, measuring
						what matters, and improving things one iteration at a time.
					</>,
					<>
						When I&apos;m not writing code, I&apos;m usually running, working on
						a side project, or figuring out how to make something work that
						probably should have been simpler in the first place.
					</>,
				],
			},
		],
	},
	pl: {
		header: {
			heading: 'Kim jestem?',
			paragraph: 'Poznaj moją historię i doświadczenie',
		},
		role: 'Frontend Engineer',
		facts: ['4+ lata doświadczenia komercyjnego', 'Angular', 'TypeScript'],
		intro: (
			<>
				Lubię pracować nad złożonymi aplikacjami, w których równie ważne jak
				samo dostarczenie funkcjonalności są architektura, łatwość utrzymania i
				przemyślany interfejs użytkownika.
			</>
		),
		tabsLabel: 'Sekcje o mnie',
		tabs: [
			{
				id: 'work',
				label: 'Praca',
				paragraphs: [
					<>
						Większość mojego doświadczenia zawodowego zdobyłem przy dużych
						aplikacjach enterprise, pracując m.in. z architekturą
						mikrofrontendów w <strong>Angularze</strong>, <strong>NgRx</strong>,{' '}
						<strong>RxJS</strong>, backendem opartym o Javę oraz systemami
						wykorzystującymi komunikację zdarzeniową. Pracowałem przy
						projektach, które muszą pozostać utrzymywalne przez lata,
						modernizować się etapami zamiast przepisywania od zera i przyjmować
						zmiany bez rozbijania reszty dużej bazy kodu.
					</>,
					<>
						Szczególnie interesuje mnie inżynierska strona frontend
						developmentu: projektowanie czytelnych granic między elementami
						systemu, ograniczanie niepotrzebnej złożoności, poprawa wydajności
						oraz szukanie pragmatycznych rozwiązań, które pozostają zrozumiałe
						również wiele miesięcy czy lat później. Rozwijam również kompetencje
						backendowe, pracując z <strong>Javą</strong>,{' '}
						<strong>Spring Bootem</strong>, <strong>Node.js</strong> i bazami
						danych, ponieważ docelowo chcę być bardziej wszechstronnym
						inżynierem full-stack.
					</>,
				],
			},
			{
				id: 'projects',
				label: 'Projekty',
				paragraphs: [
					<>
						Poza pracą zawodową lubię budować własne projekty od podstaw. Jednym
						z nich jest <strong>GymCraft</strong> — aplikacja łącząca analizę
						treningów, dane z Garmina, generowane przez AI analizy oraz
						planowanie treningów. To dla mnie okazja do eksperymentowania nie
						tylko z programowaniem, ale również z projektowaniem produktu, AI,
						API, przetwarzaniem danych i wszystkimi problemami, które pojawiają
						się przy zamienianiu pomysłu w działającą aplikację.
					</>,
					<>
						Interesuję się nowymi technologiami, szczególnie wykorzystaniem AI w
						procesie tworzenia oprogramowania. Eksperymentuję z narzędziami i
						workflow, które pozwalają zwiększać produktywność bez rezygnowania z
						jakości kodu.
					</>,
				],
			},
			{
				id: 'beyond',
				label: 'Po godzinach',
				paragraphs: [
					<>
						Jestem również biegaczem, co prawdopodobnie wpływa na moje podejście
						zarówno do treningu, jak i programowania: systematyczny progres,
						mierzenie tego, co rzeczywiście ma znaczenie, i ciągłe ulepszanie
						rozwiązania krok po kroku.
					</>,
					<>
						Kiedy nie piszę kodu, zwykle biegam, dłubię przy własnym projekcie
						albo próbuję naprawić coś, co prawdopodobnie od początku powinno być
						prostsze.
					</>,
				],
			},
		],
	},
};

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

const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
	width: 100%;
	${({ theme }) => theme.mq.lg} {
		flex-direction: row;
		align-items: center;
		gap: 50px;
	}
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
	margin: 0;
	flex-shrink: 0;
	width: clamp(16rem, 45vw, 20rem);
	border-radius: 50%;
	box-shadow:
		0 0 0 1px rgba(22, 255, 255, 0.25),
		0 0 30px rgba(22, 255, 255, 0.08);
`;

const IntroWrapper = styled.div`
	width: 100%;
	text-align: center;
	${({ theme }) => theme.mq.lg} {
		text-align: left;
	}
`;

const Role = styled.h3`
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.xl};
	font-weight: ${({ theme }) => theme.extraBold};
	color: ${({ theme }) => theme.white};
	margin-bottom: 14px;
`;

const FactList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 8px;
	margin-bottom: 20px;
	${({ theme }) => theme.mq.lg} {
		justify-content: flex-start;
	}
`;

const Fact = styled.li`
	font-family: ${({ theme }) => theme.fonts.subFont};
	font-size: ${({ theme }) => theme.fontSize.xs};
	color: ${({ theme }) => theme.neonBlue};
	border: 1px solid rgba(22, 255, 255, 0.3);
	border-radius: 999px;
	padding: 5px 14px;
	white-space: nowrap;
`;

const Intro = styled.p`
	font-family: ${({ theme }) => theme.fonts.subFont};
	font-size: ${({ theme }) => theme.fontSize.lg};
	color: ${({ theme }) => theme.lightGray};
	line-height: 1.5;
	max-width: 60ch;
	margin: 0 auto;
	${({ theme }) => theme.mq.lg} {
		margin: 0;
	}
`;

const TabsWrapper = styled.div`
	width: 100%;
	margin-top: 50px;
`;

const TabList = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 6px;
	border-bottom: 1px solid rgba(22, 255, 255, 0.15);
	${({ theme }) => theme.mq.lg} {
		justify-content: flex-start;
		gap: 10px;
	}
`;

const Tab = styled.button`
	position: relative;
	background: none;
	cursor: pointer;
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.m};
	font-weight: ${({ theme }) => theme.bold};
	color: ${({ theme, $active }) => ($active ? theme.neonBlue : theme.gray)};
	padding: 12px 18px;
	transition: color 0.25s ease;
	&:hover {
		color: ${({ theme }) => theme.white};
	}
	&:focus-visible {
		box-shadow: inset 0 0 0 2px ${({ theme }) => theme.neonBlue};
		border-radius: 4px;
	}
	&::after {
		content: '';
		position: absolute;
		left: 12px;
		right: 12px;
		bottom: -1px;
		height: 2px;
		background-color: ${({ theme }) => theme.neonBlue};
		transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
		transition: transform 0.25s ease;
	}
`;

const Panel = styled.div`
	padding-top: 30px;
	${({ theme }) => theme.mq.md} {
		min-height: 26rem;
	}
	&[hidden] {
		display: none;
	}
	p {
		font-family: ${({ theme }) => theme.fonts.subFont};
		font-size: ${({ theme }) => theme.fontSize.lg};
		color: ${({ theme }) => theme.lightGray};
		line-height: 1.6;
		max-width: 75ch;
		animation: fade-in 0.4s ease both;
	}
	p + p {
		margin-top: 20px;
	}
	strong {
		color: ${({ theme }) => theme.white};
		font-weight: ${({ theme }) => theme.semiBold};
	}
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		p {
			animation: none;
		}
	}
`;

const AboutMe = ({ lang }) => {
	const imageRef = useRef(null);
	const introRef = useRef(null);
	const tabRefs = useRef([]);
	const data = content[lang] ?? content.en;
	const [activeTab, setActiveTab] = useState(data.tabs[0].id);

	useEffect(() => {
		const image = imageRef.current;
		const intro = introRef.current;

		if (image) {
			gsap.from(image, {
				autoAlpha: 0,
				x: '-=150',
				scrollTrigger: {
					trigger: image,
					start: 'top bottom-=200px',
				},
			});
			gsap.from(intro.children, {
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

	const handleKeyDown = event => {
		const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
		if (!keys.includes(event.key)) return;

		event.preventDefault();
		const current = data.tabs.findIndex(tab => tab.id === activeTab);
		const last = data.tabs.length - 1;
		let next = current;

		if (event.key === 'ArrowLeft') next = current === 0 ? last : current - 1;
		if (event.key === 'ArrowRight') next = current === last ? 0 : current + 1;
		if (event.key === 'Home') next = 0;
		if (event.key === 'End') next = last;

		setActiveTab(data.tabs[next].id);
		tabRefs.current[next]?.focus();
	};

	return (
		<Wrapper id="about-me">
			<Element name="about-me">
				{wavePath}
				<Content>
					<Main>
						<Separator />
						<SectionHeader
							heading={data.header.heading}
							paragraph={data.header.paragraph}
						/>
						<InnerWrapper>
							<ImageWrapper ref={imageRef}>
								<StaticImage
									src="../../../assets/images/avatar.png"
									alt="Avatar picture"
									style={{
										width: '100%',
										height: 'auto',
										borderRadius: '50%',
										display: 'block',
									}}
								/>
							</ImageWrapper>
							<IntroWrapper ref={introRef}>
								<Role>{data.role}</Role>
								<FactList>
									{data.facts.map(fact => (
										<Fact key={fact}>{fact}</Fact>
									))}
								</FactList>
								<Intro>{data.intro}</Intro>
							</IntroWrapper>
						</InnerWrapper>
						<TabsWrapper>
							<TabList role="tablist" aria-label={data.tabsLabel}>
								{data.tabs.map((tab, index) => (
									<Tab
										key={tab.id}
										type="button"
										role="tab"
										id={`about-tab-${tab.id}`}
										aria-selected={activeTab === tab.id}
										aria-controls={`about-panel-${tab.id}`}
										tabIndex={activeTab === tab.id ? 0 : -1}
										$active={activeTab === tab.id}
										ref={element => {
											tabRefs.current[index] = element;
										}}
										onClick={() => setActiveTab(tab.id)}
										onKeyDown={handleKeyDown}>
										{tab.label}
									</Tab>
								))}
							</TabList>
							{data.tabs.map(tab => (
								<Panel
									key={tab.id}
									role="tabpanel"
									id={`about-panel-${tab.id}`}
									aria-labelledby={`about-tab-${tab.id}`}
									hidden={activeTab !== tab.id}
									tabIndex={0}>
									{tab.paragraphs.map((paragraph, index) => (
										// eslint-disable-next-line react/no-array-index-key
										<p key={`${tab.id}-${index}`}>{paragraph}</p>
									))}
								</Panel>
							))}
						</TabsWrapper>
					</Main>
				</Content>
			</Element>
		</Wrapper>
	);
};

export default AboutMe;
