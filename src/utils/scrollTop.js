export default function scrollTop() {
	if (typeof window !== undefined && !window.location.href.includes('#')) {
		window.scrollTo(0, 0);
	}
}
