import React from 'react';
import { Element } from 'react-scroll';
import styled from 'styled-components';
import Content from '../../atoms/Content/Content';
import SectionHeader from '../../molecules/SectionHeader/SectionHeader';
import Separator from '../../atoms/Separator/Separator';
import LottieAnimation from '../../molecules/LottieAnimation/LottieAnimation';
import laptopAnimation from '../../../assets/lotties/laptop.json';
import TechnologiesList from '../../molecules/TechnologiesList/TechnologiesList';

// import loadable from "@loadable/component";

// const TechnologiesList = loadable(() =>
//   import("../../molecules/TechnologiesList/TechnologiesList")
// );

const Wrapper = styled.section`
  position: relative;
  background-color: ${({ theme }) => theme.dark};
  min-height: 100vh;
  margin-top: 110px;
  }
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
`;

const WaveWrapper = styled.div`
	position: absolute;
	width: 100%;
	z-index: 2;
	margin-top: -180px;
	${({ theme }) => theme.mq.md} {
		margin-top: -250px;
	}
	${({ theme }) => theme.mq.xl} {
		margin-top: -270px;
	}
	${({ theme }) => theme.mq.xxl} {
		margin-top: -360px;
	}
`;

const CustomSvg = styled.svg`
	min-height: 100px;
	${({ theme }) => theme.mq.xxl} {
		min-height: 200px;
	}
`;

const wavePath = (
	<WaveWrapper>
		<CustomSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
			<path fill="#03131D" fillOpacity="1" d="M0,128L720,192L1440,128L1440,320L720,320L0,320Z" />
		</CustomSvg>
	</WaveWrapper>
);

const Technologies = () => {
	return (
		<Wrapper id="technologies">
			<Element name="technologies">
				{wavePath}
				<Content>
					<Main>
						<Separator />
						<SectionHeader
							heading="Technologies"
							paragraph="These are technologies, tools and methodologies that I use in my projects. I'm currently improving my skills in the field of building and testing more complex React applications."
						/>
						<InnerWrapper>
							<TechnologiesList />
							<LottieAnimation animationData={laptopAnimation} width={600} height={450} />
						</InnerWrapper>
					</Main>
				</Content>
			</Element>
		</Wrapper>
	);
};

export default Technologies;
