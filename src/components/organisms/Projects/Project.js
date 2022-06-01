import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage } from "gatsby-plugin-image";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import gsap from "gsap";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import listIcon from "../../../assets/images/favicon.png";
import Button from "../../atoms/Button/Button";

const Wrapper = styled.article`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding-bottom: 100px;
	${({ theme }) => theme.mq.xl} {
		flex-direction: row;
	}
`;

const ImageWrapper = styled.figure`
	width: 100%;
	${({ theme }) => theme.mq.xl} {
		margin: 25px 60px 0px 60px;
	}
`;

const ContentWrapper = styled.div`
	width: 100%;
`;

const Title = styled.h3`
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.xl};
	font-weight: 900;
	text-transform: uppercase;
	color: white;
	padding: 25px 0 25px 0;
`;

const Description = styled.div`
	font-family: ${({ theme }) => theme.fonts.subFont};
	font-size: ${({ theme }) => theme.fontSize.m};
	font-weight: ${({ theme }) => theme.light};
	color: ${({ theme }) => theme.lightGray};
	line-height: 1.5;
`;

const StyledImg = styled(GatsbyImage)`
	border-radius: 20px;
`;

const ListTitle = styled.h4`
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.lg};
	font-weight: ${({ theme }) => theme.bold};
	color: ${({ theme }) => theme.white};
	padding: 40px 0 20px 0;
`;

const List = styled.ul`
	display: flex;
	flex-flow: row wrap;
	font-size: ${({ theme }) => theme.fontSize.s};
	color: ${({ theme }) => theme.white};
	list-style-type: none;
`;

const Item = styled.li`
	padding: 10px 15px 10px 0;
	&:before {
		content: "";
		display: inline-block;
		width: 20px;
		height: 10px;
		background: url(${listIcon}) no-repeat top center;
		background-size: 100%;
		margin-right: 7px;
	}
`;

const ButtonsWrapper = styled.div`
	display: flex;
	flex-flow: row nowrap;
	margin: 30px 0;
	justify-content: flex-start;
`;

const Project = ({
	lang,
	title,
	description,
	technologies,
	codeUrl,
	liveDemoUrl,
	image,
	imgKey,
	imgAlt,
}) => {
	const imageRef = useRef(null);
	const contentRef = useRef(null);

	useEffect(() => {
		const image = imageRef.current;
		const content = contentRef.current;

		if (content && image) {
			gsap.from(image, {
				autoAlpha: 0,
				x: "-=150",
				scrollTrigger: {
					trigger: image,
					start: "top bottom-=200px",
				},
			});
			gsap.from(content.children, {
				autoAlpha: 0,
				y: "-=50",
				duration: 0.5,
				stagger: 0.1,
				scrollTrigger: {
					trigger: image,
					start: "top bottom-=200px",
				},
			});
		}
	}, []);

	const techList = technologies.map(el => {
		return <Item key={el}>{el}</Item>;
	});

	return (
		<Wrapper>
			<ImageWrapper ref={imageRef}>
				<StyledImg image={image} key={imgKey} alt={imgAlt} />
			</ImageWrapper>
			<ContentWrapper ref={contentRef}>
				<Title>{title}</Title>
				<Description>
					<MDXProvider>
						<MDXRenderer>{description}</MDXRenderer>
					</MDXProvider>
				</Description>
				{lang === "en" && <ListTitle>Technologies & Tools</ListTitle>}
				{lang === "pl" && <ListTitle>Technologie i narzędzia</ListTitle>}
				<List>{techList}</List>
				<ButtonsWrapper>
					{lang === "en" && (
						<Button renderAs="a" label="Code" link={codeUrl} animated={false} />
					)}
					{lang === "pl" && (
						<Button renderAs="a" label="Kod" link={codeUrl} animated={false} />
					)}
					<Button
						renderAs="a"
						label="Live Demo"
						link={liveDemoUrl}
						animated={true}
					/>
				</ButtonsWrapper>
			</ContentWrapper>
		</Wrapper>
	);
};

Project.propTypes = {
	codeUrl: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.object.isRequired,
	imgAlt: PropTypes.string.isRequired,
	imgKey: PropTypes.string.isRequired,
	liveDemoUrl: PropTypes.any.isRequired,
	technologies: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
};

export default Project;
