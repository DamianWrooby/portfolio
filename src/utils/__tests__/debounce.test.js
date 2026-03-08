import debounce from "../debounce";

describe("debounce", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("does not call the function before the timeout elapses", () => {
		const fn = jest.fn();
		const debounced = debounce(fn, 300);
		debounced();
		expect(fn).not.toHaveBeenCalled();
	});

	it("calls the function once after the timeout", () => {
		const fn = jest.fn();
		const debounced = debounce(fn, 300);
		debounced();
		jest.advanceTimersByTime(300);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it("passes arguments through to the wrapped function", () => {
		const fn = jest.fn();
		const debounced = debounce(fn, 300);
		debounced("hello", 42);
		jest.advanceTimersByTime(300);
		expect(fn).toHaveBeenCalledWith("hello", 42);
	});

	it("resets the timer when called again before the timeout", () => {
		const fn = jest.fn();
		const debounced = debounce(fn, 300);
		debounced();
		jest.advanceTimersByTime(200);
		debounced();
		jest.advanceTimersByTime(200);
		expect(fn).not.toHaveBeenCalled();
		jest.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it("uses 300ms as the default timeout", () => {
		const fn = jest.fn();
		const debounced = debounce(fn);
		debounced();
		jest.advanceTimersByTime(299);
		expect(fn).not.toHaveBeenCalled();
		jest.advanceTimersByTime(1);
		expect(fn).toHaveBeenCalledTimes(1);
	});
});
