import React from 'react';
import { Element } from 'react-scroll';
import styled from 'styled-components';

import laptopAnimation from '../../../assets/lotties/laptop.json';
import Content from '../../atoms/Content/Content';
import Separator from '../../atoms/Separator/Separator';
import LottieAnimation from '../../molecules/LottieAnimation/LottieAnimation';
import SectionHeader from '../../molecules/SectionHeader/SectionHeader';
import SkillCards from '../../molecules/SkillCards/SkillCards';

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

const LottieWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 60px;
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
								heading="How I Build Software"
								paragraph="Frontend-focused product engineer with fullstack and AI integration experience."
							/>
						)}
						{lang === 'pl' && (
							<SectionHeader
								heading="Jak buduję oprogramowanie"
								paragraph="Inżynier produktu z doświadczeniem we frontendzie, fullstack i integracji AI."
							/>
						)}
						<SkillCards lang={lang} />
						<LottieWrapper>
							<LottieAnimation
								animationData={laptopAnimation}
								width={600}
								height={450}
							/>
						</LottieWrapper>
					</Main>
				</Content>
			</Element>
		</Wrapper>
	);
};

export default Technologies;
