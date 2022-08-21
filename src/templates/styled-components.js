import styled from "styled-components";
import SectionHeader from "../components/molecules/SectionHeader/SectionHeader";
import Content from "../components/atoms/Content/Content";

export const PostsSection = styled.section`
	color: ${({ theme }) => theme.lightGray};
	max-width: 1200px;
	margin: auto;
`;

export const BlogHeader = styled(SectionHeader)`
	&& {
		padding: 120px 0 20px 0;
		${({ theme }) => theme.mq.md} {
			padding: 200px 0 20px 0;
		}
		${({ theme }) => theme.mq.xl} {
			padding: 250px 0 20px 0;
		}
	}
`;

export const PostsWrapper = styled.ul`
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

export const InfoWrapper = styled.div`
	width: 100%;
	text-align: center;
	color: ${({ theme }) => theme.lightGray};
`;

export const PageTemplate = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const ArticleContent = styled.article`
	max-width: ${({ theme }) => theme.articleContainerWidth};
	margin: auto;
`;

export const PostHeader = styled(SectionHeader)`
	&& {
		padding: 120px 0 20px 0;
		${({ theme }) => theme.mq.md} {
			padding: 200px 0 20px 0;
		}
		${({ theme }) => theme.mq.xl} {
			padding: 250px 0 20px 0;
		}
		p {
			width: 100%;
			text-align: center;
		}
		h1 {
			font-size: ${({ theme }) => theme.fontSize.lg};
			${({ theme }) => theme.mq.md} {
				font-size: ${({ theme }) => theme.fontSize.xxl};
			}
		}
	}
`;

export const Text = styled(Content)`
	&& {
		font-family: ${({ theme }) => theme.fonts.subFont};
		font-size: ${({ theme }) => theme.fontSize.lg};
		font-weight: ${({ theme }) => theme.light};
		color: ${({ theme }) => theme.lightGray};
		line-height: 1.5;
		margin: 7rem 0;
	}
	img {
		max-width: 100%;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: "Sarala", sans-serif;
		font-weight: ${({ theme }) => theme.bold};
		color: ${({ theme }) => theme.white};
		padding: 20px 0;
	}
	h2 {
		font-size: 3.2rem;
	}
	h3 {
		font-size: 2.8rem;
	}
	ul {
		padding-left: 2rem;
		list-style-type: circle;
	}
	p {
		padding-bottom: 30px;
		text-align: justify;
		line-height: 1.3;
	}
	em {
		font-style: italic;
	}
`;

export const FeatureImageWrapper = styled.figure`
	max-height: 500px;
	overflow: hidden;
	padding: 0 15px;
	${({ theme }) => theme.mq.md} {
		padding: 0 45px;
	}
`;

export const HorizontalLine = styled.hr`
	background-color: ${({ theme }) => theme.lightGray};
	height: 1px;
	max-width: calc(${({ theme }) => theme.articleContainerWidth} - 30px);
	${({ theme }) => theme.mq.md} {
		max-width: calc(${({ theme }) => theme.articleContainerWidth} - 90px);
	}
	margin: 2rem auto;
`;