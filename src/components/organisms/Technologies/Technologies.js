import React from 'react';
import { Element } from 'react-scroll';
import styled from 'styled-components';

import laptopAnimation from '../../../assets/lotties/laptop.json';
import Content from '../../atoms/Content/Content';
import Separator from '../../atoms/Separator/Separator';
import LottieAnimation from '../../molecules/LottieAnimation/LottieAnimation';
import SectionHeader from '../../molecules/SectionHeader/SectionHeader';
import TechnologiesList from '../../molecules/TechnologiesList/TechnologiesList';

const Wrapper = styled.section`
	position: relative;
	background-color: ${({ theme }) => theme.darker};
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
	${({ theme }) => theme.mq.xl} {
		flex-direction: row;
	}
`;

const Technologies = ({ lang }) => {
	return (
		<Wrapper id="technologies">
			<Element name="technologies">
				<Content>
					<Main>
						<Separator />
						{lang === 'en' && (
							<SectionHeader
								heading="Technologies"
								paragraph="Frameworks and tools I use when building commercial and private projects"
							/>
						)}
						{lang === 'pl' && (
							<SectionHeader
								heading="Technologie"
								paragraph="Frameworki, narzędzia i rozwiązania, które wykorzystuję w projektach komercyjnych i prywatnych"
							/>
						)}
						<InnerWrapper>
							<TechnologiesList lang={lang} />
							<LottieAnimation
								animationData={laptopAnimation}
								width={600}
								height={450}
							/>
						</InnerWrapper>
					</Main>
				</Content>
			</Element>
		</Wrapper>
	);
};

export default Technologies;
