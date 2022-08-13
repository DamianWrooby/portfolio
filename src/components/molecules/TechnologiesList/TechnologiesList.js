import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import icons from "../../../utils/icons";
import ListItem from "../../atoms/ListItem/ListItem";

const ListsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
	padding: 0 50px 0 0px;
`;

const ItemList = () => {
	const list1Ref = useRef(null);
	const list2Ref = useRef(null);

	useEffect(() => {
		const firstList = list1Ref.current;
		const secondList = list2Ref.current;

		if (firstList && secondList) {
			[...firstList.children, ...secondList.children].forEach(child => {
				gsap.from(child, {
					autoAlpha: 0,
					y: "-=20",
					scrollTrigger: {
						trigger: child,
						start: "top bottom-=50px",
					},
				});
			});
		}
	}, []);

	return (
		<ListsWrapper>
			<List ref={list1Ref}>
				<ListItem icon={icons.react} height="25">
					React
				</ListItem>
				<ListItem icon={icons.next}>Next.js</ListItem>
				<ListItem icon={icons.gatsby}>Gatsby</ListItem>
				<ListItem icon={icons.redux} height="25" width="25">
					Redux
				</ListItem>
				<ListItem icon={icons.vue} height="25" width="25">
					Vue + Vuex
				</ListItem>
				<ListItem icon={icons.nuxt} height="25" width="25">
					Nuxt
				</ListItem>
				<ListItem icon={icons.angular} height="25" width="25">
					Angular
				</ListItem>
			</List>
			<List ref={list2Ref}>
				<ListItem icon={icons.ts} height="23">
					TypeScript
				</ListItem>
				<ListItem icon={icons.docker} height="23">
					Docker
				</ListItem>
				<ListItem icon={icons.jest} height="23">
					Jest
				</ListItem>
				<ListItem icon={icons.gsap} height="23">
					GSAP
				</ListItem>
				<ListItem icon={icons.firebase} height="28">
					Firebase
				</ListItem>
				<ListItem icon={icons.prisma} height="25" width="25">
					Prisma
				</ListItem>
				<ListItem icon={icons.contentful} height="23">
					Contentful
				</ListItem>
			</List>
		</ListsWrapper>
	);
};

export default ItemList;
