import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { Element } from 'react-scroll';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import * as ScrollMagic from 'scrollmagic-with-ssr';
import styled from 'styled-components';

import FirstLayerImg from './BackgroundImages/FirstLayerImg';
import SecondLayerBg from './BackgroundImages/SecondLayerBg';
import SecondLayerImg from './BackgroundImages/SecondLayerImg';

let controller = undefined;

if (typeof window !== `undefined`) {
	ScrollMagicPluginGsap(ScrollMagic, gsap);
	controller = new ScrollMagic.Controller();
}

const Wrapper = styled.header`
	position: relative;
	width: 100%;
	padding: 0;
	overflow: hidden;
`;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	z-index: 1;
`;

const Title = styled.h1`
	opacity: 0;
	position: relative;
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.xxl};
	left: 0;
	margin-bottom: 20px;
	text-align: center;
	font-weight: 700;
	color: white;
	z-index: 3;
	text-shadow: 0px 4px 3px rgba(0, 0, 0, 1), 0px 8px 13px rgba(0, 0, 0, 1),
		0px 18px 23px rgba(0, 0, 0, 0.6);
	${({ theme }) => theme.mq.md} {
		font-size: ${({ theme }) => theme.fontSize.xxxl};
	}
	${({ theme }) => theme.mq.lg} {
		text-shadow: none;
	}
`;

const Subtitle = styled.h2`
	opacity: 0;
	position: relative;
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.xl};
	left: 0;

	text-align: center;
	color: white;
	z-index: 3;
	text-shadow: 0px 4px 3px rgba(0, 0, 0, 1), 0px 8px 13px rgba(0, 0, 0, 1),
		0px 18px 23px rgba(0, 0, 0, 0.6);
	${({ theme }) => theme.mq.md} {
		font-size: ${({ theme }) => theme.fontSize.xxl};
	}
	${({ theme }) => theme.mq.lg} {
		text-shadow: none;
	}
`;

const SecondTitle = styled.p`
	opacity: 0;
	position: absolute;
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.xxlm};
	text-align: center;
	top: 30vh;
	margin: 0 5%;
	font-weight: 700;
	color: white;
	z-index: 3;
	text-shadow: 0px 4px 3px rgba(0, 0, 0, 1), 0px 8px 13px rgba(0, 0, 0, 1),
		0px 18px 23px rgba(0, 0, 0, 0.6);
	${({ theme }) => theme.mq.lg} {
		top: 39vh;
		font-size: ${({ theme }) => theme.fontSize.xxl};
		text-align: left;
		text-shadow: none;
	}
`;

const SecondSubtitle = styled.p`
	opacity: 0;
	position: absolute;
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.xxlm};
	text-align: center;
	top: 50vh;
	margin: 0 5%;
	font-weight: 700;
	color: white;
	z-index: 3;
	text-shadow: 0px 4px 3px rgba(0, 0, 0, 1), 0px 8px 13px rgba(0, 0, 0, 1),
		0px 18px 23px rgba(0, 0, 0, 0.6);
	${({ theme }) => theme.mq.lg} {
		top: 49vh;
		font-size: ${({ theme }) => theme.fontSize.xxl};
		text-align: left;
		text-shadow: none;
	}
`;

const ColorSpan = styled.span`
	color: ${({ theme }) => theme.neonBlue};
`;

const BackgroundWrapper = styled.div`
	position: absolute !important;
	left: -18%;
	width: 100%;
	height: 100vh;
	background-size: cover;
	background-attachment: unset;
	z-index: 1;
	${({ theme }) => theme.mq.s} {
		width: 100%;
		left: 0;
	}
	${({ theme }) => theme.mq.xl} {
		background-size: contain;
		background-attachment: fixed;
	}
`;

const BackgroundWrapperCenter = styled.div`
	position: absolute !important;
	left: 0;
	width: 100%;
	height: 100vh;
	background-size: cover;
	background-attachment: unset;
	z-index: 1;
	${({ theme }) => theme.mq.s} {
		width: 100%;
		left: 0;
	}
	${({ theme }) => theme.mq.xl} {
		background-size: contain;
		background-attachment: fixed;
	}
`;

const StyledFirsLayerImg = styled(FirstLayerImg)`
	&& {
		width: 100%;
		height: 100%;
	}
`;

const StyledSecondLayerImg = styled(SecondLayerImg)`
	&& {
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 2;
	}
`;

const StyledSecondLayerBg = styled(SecondLayerBg)`
	&& {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 115vh;
		background-size: cover;
		background-attachment: fixed;
		z-index: 1;
	}
`;

const HeaderBackground = styled.div`
	position: absolute;
	width: 100%;
	height: 115vh;
	background: '#040e18';
	z-index: -1;
`;

const Header = ({ lang }) => {
	const firstLayerRef = useRef(null);
	const secondLayerRef = useRef(null);
	const secondLayerBgRef = useRef(null);
	const titleRef = useRef(null);
	const subtitleRef = useRef(null);
	const secondTitleRef = useRef(null);
	const secondSubtitleRef = useRef(null);
	const wrapperRef = useRef(null);

	const setOverflow = () => {
		document.body.style.overflow = 'auto';
	};

	useEffect(() => {
		const wrapper = wrapperRef.current;
		const firstLayer = firstLayerRef.current;
		const secondLayer = secondLayerRef.current;
		const secondLayerBg = secondLayerBgRef.current;
		const title = titleRef.current;
		const subtitle = subtitleRef.current;
		const secondTitle = secondTitleRef.current;
		const secondSubtitle = secondSubtitleRef.current;

		document.body.style.overflow = 'hidden';

		gsap.set([title, subtitle], { autoAlpha: 0 });

		const tl = gsap.timeline({
			onComplete: setOverflow,
			defaults: { ease: 'power3.inOut' },
		});
		const tl2 = gsap.timeline({ paused: true });

		tl.fromTo(
			title,
			{ y: '-=200' },
			{ duration: 1, y: '+=200', autoAlpha: 1 }
		).fromTo(
			subtitle,
			{ x: '-=100' },
			{ duration: 1, x: '+=100', autoAlpha: 1 }
		);

		tl2
			.fromTo(
				secondLayer,
				{
					autoAlpha: 0,
				},
				{
					duration: 3,
					ease: 'power4.in',
					autoAlpha: 1,
				}
			)
			.to(
				[title, subtitle],
				{
					duration: 1,
					y: -100,
					autoAlpha: 0,
				},
				'-=3'
			)
			.fromTo(
				secondTitle,
				{
					autoAlpha: 0,
					y: '+=200',
				},
				{
					duration: 2,
					y: '-=200',
					ease: 'power1.in',
					autoAlpha: 1,
				},
				'-=3'
			)
			.fromTo(
				secondSubtitle,
				{
					y: '+=200',
				},
				{
					duration: 2,
					y: '-=200',
					ease: 'power1.in',
				},
				'-=2'
			)
			.fromTo(
				secondSubtitle,
				{
					autoAlpha: 0,
				},
				{
					duration: 2,
					ease: 'power4.in',
					autoAlpha: 1,
				},
				'-=2'
			)
			.fromTo(
				firstLayer,
				{
					autoAlpha: 1,
				},
				{
					duration: 2,
					ease: 'power4.in',
					autoAlpha: 0,
				},
				'-=2'
			)
			.fromTo(
				secondLayerBg,
				{
					autoAlpha: 0,
				},
				{
					duration: 1,
					ease: 'power4.in',
					autoAlpha: 0.4,
				},
				'-=1'
			)
			.to(secondTitle, {
				autoAlpha: 1,
				duration: 0.3,
			})
			.to(secondSubtitle, {
				autoAlpha: 1,
				duration: 0.3,
			})
			.to(secondTitle, {
				y: '-=50',
				autoAlpha: 0,
				duration: 0.5,
			})
			.to(
				secondSubtitle,
				{
					y: '-=50',
					autoAlpha: 0,
					duration: 0.5,
				},
				'-=0.5'
			);

		const scene = new ScrollMagic.Scene({
			triggerElement: wrapper,
			duration: 1000,
			triggerHook: 0,
		})
			.addTo(controller)
			.setTween(tl2.resume())
			.setPin(wrapper);
	}, []);

	return (
		<Element name="home">
			<Wrapper ref={wrapperRef}>
				<Container>
					<BackgroundWrapper ref={firstLayerRef}>
						<StyledFirsLayerImg />
					</BackgroundWrapper>
					<BackgroundWrapperCenter ref={secondLayerBgRef}>
						<StyledSecondLayerBg />
					</BackgroundWrapperCenter>
					<BackgroundWrapper ref={secondLayerRef}>
						<StyledSecondLayerImg />
					</BackgroundWrapper>
					<HeaderBackground />
					<Title ref={titleRef}>
						{lang === 'en' && (
							<>
								Hi, I'm <ColorSpan>Damian</ColorSpan>
							</>
						)}
						{lang === 'pl' && (
							<>
								Cześć, jestem <ColorSpan>Damian</ColorSpan>
							</>
						)}
					</Title>
					{lang === 'en' && (
						<>
							<Subtitle ref={subtitleRef}>I'm a Frontend Developer</Subtitle>
						</>
					)}
					{lang === 'pl' && (
						<>
							<Subtitle ref={subtitleRef}>Jestem Frontend Developerem</Subtitle>
						</>
					)}
					{lang === 'en' && (
						<>
							<SecondTitle ref={secondTitleRef}>
								I turn business <ColorSpan>ideas</ColorSpan>
							</SecondTitle>
						</>
					)}
					{lang === 'pl' && (
						<>
							<SecondTitle ref={secondTitleRef}>
								Zamieniam biznesowe <ColorSpan>pomysły</ColorSpan>
							</SecondTitle>
						</>
					)}
					{lang === 'en' && (
						<>
							<SecondSubtitle ref={secondSubtitleRef}>
								Into efficient <ColorSpan>web apps</ColorSpan>
							</SecondSubtitle>
						</>
					)}
					{lang === 'pl' && (
						<>
							<SecondSubtitle ref={secondSubtitleRef}>
								W gotowe <ColorSpan>aplikacje webowe</ColorSpan>
							</SecondSubtitle>
						</>
					)}
				</Container>
			</Wrapper>
		</Element>
	);
};

export default Header;
