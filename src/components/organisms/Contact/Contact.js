import React from 'react';
import { Element } from 'react-scroll';
import styled from 'styled-components';
import Content from '../../atoms/Content/Content';
import SectionHeader from '../../molecules/SectionHeader/SectionHeader';
import Separator from '../../atoms/Separator/Separator';
import SocialLinks from './SocialLinks';
import Form from '../../molecules/Form/Form';

const Wrapper = styled.section`
  position: relative;
  background-color: #16232e;
  min-height: 100vh;
  margin-top: 100px;
  }
`;

const Main = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 100px 0 80px;
	flex-direction: column;
	color: ${({ theme }) => theme.white};
	${({ theme }) => theme.mq.md} {
		padding: 200px 0 80px;
	}
	${({ theme }) => theme.mq.xxl} {
		padding: 200px 0 60px;
	}
`;

const InnerWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	${({ theme }) => theme.mq.xl} {
		flex-direction: row;
		justify-content: space-evenly;
		align-items: flex-start;
	}
`;

const FormWrapper = styled.div`
	width: 100%;
	max-width: 500px;
`;

const Contact = ({ lang }) => {
	return (
		<Wrapper id="contact">
			<Element name="contact">
				<Content>
					<Main>
						<Separator />
						{lang === 'en' && (
							<SectionHeader
								heading="Contact"
								paragraph="Do you have any questions? Feel free to contact me. I am also open to cooperation with back-end developers or UX/UI designers to gain more experience. Let's get in touch!"
							/>
						)}
						{lang === 'pl' && (
							<SectionHeader
								heading="Kontakt"
								paragraph="Masz pytania lub sugestie odnośnie moich projektów lub chcesz porozmawiać na
										temat web developmentu? Zapraszam do kontaktu :)"
							/>
						)}
						<InnerWrapper>
							<SocialLinks lang={lang} />
							<FormWrapper>
								<Form lang={lang} />
							</FormWrapper>
						</InnerWrapper>
					</Main>
				</Content>
			</Element>
		</Wrapper>
	);
};

export default Contact;
