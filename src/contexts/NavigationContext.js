import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { createContext, useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const defaultValues = {
	activeLink: 'home',
	isTransparent: true,
	mobileNavVisible: false,
	handleMobileNav: () => null,
	currentPage: 'home',
};

export const NavigationContext = createContext(defaultValues);

const NavigationProvider = ({ children }) => {
	const [activeLink, setActiveLink] = useState('home-page');
	const [isTransparent, setIsTransparent] = useState(true);
	const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState('home-page');

	const handleMobileNav = isVisible => {
		setIsMobileNavVisible(isVisible);
		if (isVisible) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';
	};

	useEffect(() => {
		let isMounted = true;
		const sections = document.querySelectorAll('section');
		const footer = document.querySelector('footer');
		const url =
			typeof window !== 'undefined'
				? window.location.pathname.replace('/', '')
				: '';

		if ((url === '' || url === 'pl/') && isMounted) {
			setCurrentPage('home-page');
			setActiveLink('home-page');
		} else if (isMounted) {
			setCurrentPage(`${url}-page`);
			setActiveLink(`${url}-page`);
		}

		ScrollTrigger.create({
			trigger: sections[0],
			start: 'top bottom',
			endTrigger: footer,
			end: 'top top',
			onToggle: ({ isActive }) => setIsTransparent(!isActive),
		});

		ScrollTrigger.create({
			trigger: 'header',
			start: 'top center',
			end: 'bottom 90%',
			onToggle: ({ isActive }) => isActive && setActiveLink('home-page'),
		});

		sections.forEach(section => {
			ScrollTrigger.create({
				trigger: section,
				start: 'top center',
				end: 'bottom bottom',
				onToggle: ({ isActive }) => {
					if (isActive && section.id === 'contact') {
						setActiveLink(section.id);
					}
				},
				// change active section only for contact in home page
			});
		});
		return () => {
			isMounted = false;
		};
	}, []);

	const context = {
		activeLink,
		isTransparent,
		isMobileNavVisible,
		handleMobileNav,
		currentPage,
	};

	return (
		<NavigationContext.Provider value={context}>
			{children}
		</NavigationContext.Provider>
	);
};

export default NavigationProvider;
