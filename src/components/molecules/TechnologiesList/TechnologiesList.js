import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import icons from '../../../utils/icons';
import ListItem from '../../atoms/ListItem/ListItem';

const ListsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 720px;
	${({ theme }) => theme.mq.s} {
		justify-content: space-between;
		flex-direction: row;
	}
	${({ theme }) => theme.mq.xl} {
		align-items: left;
	}
`;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	padding-right: 50px;
`;

const ListTitle = styled.h4`
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.lg};
	font-weight: ${({ theme }) => theme.bold};
	color: ${({ theme }) => theme.neonBlue};
	padding: 30px 0 10px 0;
`;

const TechnologiesList = ({ lang }) => {
	const list1Ref = useRef(null);
	const list2Ref = useRef(null);

	useEffect(() => {
		const firstList = list1Ref.current;
		const secondList = list2Ref.current;

		if (firstList && secondList) {
			[...firstList.children, ...secondList.children].forEach(child => {
				gsap.from(child, {
					autoAlpha: 0,
					y: '-=20',
					scrollTrigger: {
						trigger: child,
						start: 'top bottom-=50px',
					},
				});
			});
		}
	}, []);

	return (
		<ListsWrapper>
			<List ref={list1Ref}>
				{lang === 'en' && <ListTitle>Frameworks and meta-frameworks</ListTitle>}
				{lang === 'pl' && <ListTitle>Frameworki i meta-frameworki</ListTitle>}
				<ListItem icon={icons.angular} height="25" width="25">
					Angular
				</ListItem>
				<ListItem icon={icons.react} height="25">
					React
				</ListItem>
				<ListItem icon={icons.next}>Next.js</ListItem>
				<ListItem icon={icons.gatsby}>Gatsby</ListItem>
				<ListItem icon={icons.vue} height="25" width="25">
					Vue
				</ListItem>
				<ListItem icon={icons.nuxt} height="25" width="25">
					Nuxt
				</ListItem>
				{lang === 'en' && <ListTitle>State management</ListTitle>}
				{lang === 'pl' && <ListTitle>Zarządzanie stanem</ListTitle>}
				<ListItem icon={icons.redux} height="25" width="25">
					Redux
				</ListItem>
				<ListItem icon={icons.ngrx} height="28" width="28">
					NgRx
				</ListItem>
			</List>
			<List ref={list2Ref}>
				{lang === 'en' && <ListTitle>Testing</ListTitle>}
				{lang === 'pl' && <ListTitle>Testowanie</ListTitle>}
				<ListItem icon={icons.jasmine} height="23">
					Jasmine
				</ListItem>
				<ListItem icon={icons.jest} height="23">
					Jest
				</ListItem>
				{lang === 'en' && <ListTitle>Backend stuff</ListTitle>}
				{lang === 'pl' && <ListTitle>Narzędzia backendowe</ListTitle>}
				<ListItem icon={icons.nest} height="25" width="25">
					Nest
				</ListItem>
				<ListItem icon={icons.firebase} height="28">
					Firebase
				</ListItem>
				<ListItem icon={icons.prisma} height="25" width="25">
					Prisma ORM
				</ListItem>
			</List>
		</ListsWrapper>
	);
};

export default TechnologiesList;
