import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import firebaseIcon from "../../../assets/icons/firebase.svg";
import gatsbyIcon from "../../../assets/icons/gatsby.svg";
import gsapIcon from "../../../assets/icons/gsap.svg";
import jestIcon from "../../../assets/icons/jest.svg";
import nextIcon from "../../../assets/icons/next.svg";
import nuxtIcon from "../../../assets/icons/nuxt.svg";
import prismaIcon from "../../../assets/icons/prisma.svg";
import reactIcon from "../../../assets/icons/react.svg";
import vueIcon from "../../../assets/icons/vue.svg";
import wpIcon from "../../../assets/icons/wp.svg";
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
			[...firstList.children, ...secondList.children].map(child => {
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
				<ListItem icon={reactIcon} height="25">React</ListItem>
				<ListItem icon={nextIcon}>Next.js</ListItem>
				<ListItem icon={gatsbyIcon}>Gatsby</ListItem>
				<ListItem icon={vueIcon} height="25" width="25">Vue + Vuex</ListItem>
				<ListItem icon={nuxtIcon} height="25" width="25">Nuxt</ListItem>
			</List>
			<List ref={list2Ref}>
				<ListItem icon={jestIcon} height="23">
					Jest
				</ListItem>
				<ListItem icon={gsapIcon} height="23">
					GSAP
				</ListItem>
				<ListItem icon={firebaseIcon} height="28">
					Firebase
				</ListItem>
				<ListItem icon={prismaIcon} height="25" width="25">
					Prisma
				</ListItem>
				<ListItem icon={wpIcon}>WordPress</ListItem>
			</List>
		</ListsWrapper>
	);
};

export default ItemList;
