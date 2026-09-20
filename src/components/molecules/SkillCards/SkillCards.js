import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const cards = {
	en: [
		{
			number: '01',
			title: 'Angular at Enterprise Scale',
			description:
				'My core specialization — 4+ years of microfrontend systems built to stay maintainable for years.',
			bullets: [
				'Angular microfrontends (led 8+ migrations, v10 → v21)',
				'State management - NgRx, RxJS, signals API',
				'Composition based architecture (interfaces + strategy pattern)',
				'Performance optimization - bundle size reduction, OnPush, performant CSS',
				'Refactoring - module decoupling, segregation of concerns, cohesion enhancement',
				'Unit & integration testing (Jasmine/Karma, Jest)',
				'E2E testing (Cypress), CI/CD quality gates',
				'PWA, WCAG accessibility, i18n',
				'Also productive in React, Vue and SvelteKit',
			],
		},
		{
			number: '02',
			title: 'Backend, APIs & Data',
			description:
				'Designing clean APIs and backend services that integrate seamlessly with frontend layers.',
			bullets: [
				'Node.js (Express, NestJS)',
				'REST API design & integration with Java based services',
				'PostgreSQL, Oracle DB, Prisma ORM',
				'Backend as a service - Firebase / Supabase',
				'Auth flows & session handling',
				'Python microservice design',
			],
		},
		{
			number: '03',
			title: 'AI & Product Engineering',
			description:
				'Integrating AI capabilities into real-world products — from API wiring to structured output pipelines.',
			bullets: [
				'LLM API integrations (GymCraft)',
				'Prompt engineering for structured JSON outputs',
				'AI coding agent workflows (Claude Code, Kiro)',
				'PDF generation & export pipelines',
				'Garmin Connect integration',
				'Full-stack side projects end to end (SvelteKit, Angular + Supabase)',
			],
		},
	],
	pl: [
		{
			number: '01',
			title: 'Angular w skali enterprise',
			description:
				'Moja główna specjalizacja — ponad 4 lata przy mikrofrontendach, które muszą pozostać utrzymywalne przez lata.',
			bullets: [
				'Mikrofrontendy w Angularze (8+ migracji, v10 → v21)',
				'Zarządzanie stanem – NgRx, RxJS, signals API',
				'Architektura oparta na kompozycji (interfejsy + wzorzec strategii)',
				'Optymalizacja wydajności – redukcja rozmiaru bundla, OnPush, wydajny CSS',
				"Refactoring – zmniejszanie coupling'u w modułach, rozdzielenie odpowiedzialności, poprawa spójności",
				'Testy jednostkowe i integracyjne (Jasmine/Karma, Jest)',
				'Testy E2E (Cypress), bramki jakości w CI/CD',
				'PWA, dostępność WCAG, i18n',
				'Pracuję również w React, Vue i SvelteKicie',
			],
		},
		{
			number: '02',
			title: 'Backend, API i dane',
			description:
				'Projektowanie przewidywalnych API i serwisów backendowych zintegrowanych z warstwą frontend.',
			bullets: [
				'Node.js (Express, NestJS)',
				'Projektowanie REST API i integracja z serwisami w Javie',
				'PostgreSQL, Oracle DB, Prisma ORM',
				'Backend as a service – Firebase / Supabase',
				'Uwierzytelnianie i zarządzanie sesjami',
				'Projektowanie mikroserwisów w Pythonie',
			],
		},
		{
			number: '03',
			title: 'AI i Product Engineering',
			description:
				"Integrowanie możliwości AI w rzeczywistych produktach — od podłączenia API po pipeline'y ustrukturyzowanych odpowiedzi.",
			bullets: [
				'Integracje z API modeli językowych (GymCraft)',
				'Prompt engineering dla ustrukturyzowanych odpowiedzi JSON',
				'Workflow dla agentów AI (Claude Code, Kiro)',
				'Generowanie i eksport PDF',
				'Integracja Garmin Connect',
				'Własne projekty full-stack od zera (SvelteKit, Angular + Supabase)',
			],
		},
	],
};

const CardsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 24px;
	width: 100%;
	${({ theme }) => theme.mq.md} {
		grid-template-columns: repeat(2, 1fr);
	}
	${({ theme }) => theme.mq.lg} {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const Card = styled.article`
	position: relative;
	overflow: hidden;
	background: ${({ theme }) => theme.darkBlue};
	border: 1px solid rgba(22, 255, 255, 0.12);
	border-radius: 12px;
	padding: 32px 28px;
	transition:
		transform 0.3s ease,
		box-shadow 0.3s ease,
		border-color 0.3s ease;
	&:hover {
		transform: scale(1.02);
		border-color: rgba(22, 255, 255, 0.45);
		box-shadow:
			0 0 20px rgba(22, 255, 255, 0.12),
			0 0 40px rgba(22, 255, 255, 0.06);
	}
`;

const CardNumber = styled.span`
	position: absolute;
	top: -10px;
	right: 16px;
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: 9rem;
	font-weight: ${({ theme }) => theme.extraBold};
	color: rgba(22, 255, 255, 0.05);
	line-height: 1;
	user-select: none;
	pointer-events: none;
`;

const CardTitle = styled.h3`
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.xl};
	font-weight: ${({ theme }) => theme.bold};
	color: ${({ theme }) => theme.neonBlue};
	margin-bottom: 12px;
	line-height: 1.2;
`;

const CardDescription = styled.p`
	font-family: ${({ theme }) => theme.fonts.subFont};
	font-size: ${({ theme }) => theme.fontSize.s};
	color: ${({ theme }) => theme.gray};
	line-height: 1.6;
	margin-bottom: 20px;
`;

const Divider = styled.hr`
	border: none;
	border-top: 1px solid rgba(22, 255, 255, 0.15);
	margin: 0 0 20px;
`;

const BulletList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const BulletItem = styled.li`
	font-family: ${({ theme }) => theme.fonts.subFont};
	font-size: ${({ theme }) => theme.fontSize.s};
	color: ${({ theme }) => theme.white};
	font-weight: ${({ theme }) => theme.light};
	padding-left: 20px;
	position: relative;
	&::before {
		content: '→';
		position: absolute;
		left: 0;
		color: ${({ theme }) => theme.neonBlue};
	}
`;

const SkillCards = ({ lang = 'en' }) => {
	const gridRef = useRef(null);
	const data = cards[lang] ?? cards.en;

	useEffect(() => {
		const grid = gridRef.current;
		if (!grid) return;

		[...grid.children].forEach((card, i) => {
			gsap.from(card, {
				autoAlpha: 0,
				y: 40,
				duration: 0.6,
				delay: i * 0.15,
				scrollTrigger: {
					trigger: card,
					start: 'top bottom-=80px',
				},
			});
		});
	}, []);

	return (
		<CardsGrid ref={gridRef}>
			{data.map(card => (
				<Card key={card.number}>
					<CardNumber>{card.number}</CardNumber>
					<CardTitle>{card.title}</CardTitle>
					<CardDescription>{card.description}</CardDescription>
					<Divider />
					<BulletList>
						{card.bullets.map(bullet => (
							<BulletItem key={bullet}>{bullet}</BulletItem>
						))}
					</BulletList>
				</Card>
			))}
		</CardsGrid>
	);
};

export default SkillCards;
