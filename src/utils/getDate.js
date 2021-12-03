const getDate = (date, lang) => {
	const daysOfWeek = lang === "en" ? [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday"
	] : [
		"niedziela",
		"poniedziałek",
		"wtorek",
		"środa",
		"czwartek",
		"piątek",
		"sobota"
	];
	const months = lang === "en" ? [
		"january",
		"february",
		"march",
		"april",
		"may",
		"june",
		"july",
		"august",
		"september",
		"october",
		"november",
		"december"
	] : [
		"styczeń",
		"luty",
		"marzec",
		"kwiecień",
		"maj",
		"czerwiec",
		"lipiec",
		"sierpień",
		"wrzesień",
		"październik",
		"listopad",
		"grudzień"
	];

	return {
		day: daysOfWeek[date.getDay()],
		date: date.getDate(),
		month: months[date.getMonth()],
		year: date.getFullYear()
	};
}

export default getDate;