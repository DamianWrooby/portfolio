import React, { useState, useEffect, createContext } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const defaultValues = {
	activeLink: 'home',
	isTransparent: true,
	mobileNavVisible: false,
	handleMobileNav: () => null,
	currentPage: 'home'
};

export const NavigationContext = createContext(defaultValues);

const NavigationProvider = ({ children }) => {
	const [
		activeLink,
		setActiveLink
	] = useState('home');
	const [
		isTransparent,
		setIsTransparent
	] = useState(true);
	const [
		isMobileNavVisible,
		setIsMobileNavVisible
	] = useState(false);
	const [
		currentPage,
		setCurrentPage
	] = useState('home');

	const handleMobileNav = (isVisible) => {
		setIsMobileNavVisible(isVisible);
		if (isVisible) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';
	};

	useEffect(() => {
		const sections = document.querySelectorAll('section');
		const footer = document.querySelector('footer');
		const url = typeof window !== 'undefined' ? window.location.pathname.replace('/', '') : '';
		// url === '' ? setCurrentPage('home') : setCurrentPage(url);
		// url === '' ? setActiveLink('home') : setActiveLink(url);

		if (url === '') {
			setCurrentPage('home');
			setActiveLink('home');
			console.log('Setted home');
		} else {
			setCurrentPage(url);
			setActiveLink(url);
			console.log('Setted url');
		}

		console.log(activeLink, currentPage, window.location.pathname, url);

		ScrollTrigger.create({
			trigger: sections[0],
			start: 'top bottom',
			endTrigger: footer,
			end: 'top top',
			onToggle: ({ isActive }) => setIsTransparent(!isActive)
		});

		ScrollTrigger.create({
			trigger: 'header',
			start: 'top center',
			end: 'bottom 90%',
			onToggle: ({ isActive }) => isActive && setActiveLink('home')
		});

		sections.forEach((section) => {
			ScrollTrigger.create({
				trigger: section,
				start: 'top center',
				end: 'bottom bottom',
				onToggle: ({ isActive }) => isActive && setActiveLink(section.id)
			});
		});
	}, []);

	const context = {
		activeLink,
		isTransparent,
		isMobileNavVisible,
		handleMobileNav,
		currentPage
	};

	return <NavigationContext.Provider value={context}>{children}</NavigationContext.Provider>;
};

export default NavigationProvider;
