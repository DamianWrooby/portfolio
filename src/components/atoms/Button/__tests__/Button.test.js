import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../../../theme/mainTheme';
import Button from '../Button';

const renderWithTheme = ui =>
	render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Button', () => {
	it('renders the label text', () => {
		renderWithTheme(<Button label="Click me" />);
		expect(screen.getByText('Click me')).toBeInTheDocument();
	});

	it('renders as a <button> element by default', () => {
		renderWithTheme(<Button label="Click me" />);
		const btn = screen.getByRole('button');
		expect(btn.tagName).toBe('BUTTON');
		expect(btn).toHaveAttribute('type', 'button');
	});

	it("renders as an <a> element when renderAs='a' with a link", () => {
		renderWithTheme(
			<Button label="Visit" renderAs="a" link="https://example.com" />,
		);
		const el = screen.getByRole('link');
		expect(el.tagName).toBe('A');
		expect(el).toHaveAttribute('href', 'https://example.com');
		expect(el).toHaveAttribute('target', '_blank');
		expect(el).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it("falls back to <button> when renderAs='a' but no link is provided", () => {
		renderWithTheme(<Button label="No link" renderAs="a" />);
		expect(screen.getByRole('button').tagName).toBe('BUTTON');
		expect(screen.queryByRole('link')).not.toBeInTheDocument();
	});

	it('does not set target/rel for internal (relative) links', () => {
		renderWithTheme(<Button label="Internal" renderAs="a" link="/about" />);
		const el = screen.getByRole('link');
		expect(el).toHaveAttribute('href', '/about');
		expect(el).not.toHaveAttribute('target');
		expect(el).not.toHaveAttribute('rel');
	});

	it('allows overriding target and rel', () => {
		renderWithTheme(
			<Button
				label="Same tab"
				renderAs="a"
				link="https://example.com"
				target="_self"
				rel="nofollow"
			/>,
		);
		const el = screen.getByRole('link');
		expect(el).toHaveAttribute('target', '_self');
		expect(el).toHaveAttribute('rel', 'nofollow');
	});

	it('calls onClick when clicked', () => {
		const handler = jest.fn();
		renderWithTheme(<Button label="Click me" onClick={handler} />);
		fireEvent.click(screen.getByRole('button'));
		expect(handler).toHaveBeenCalledTimes(1);
	});

	it('does not call onClick when disabled', () => {
		const handler = jest.fn();
		renderWithTheme(<Button label="Click me" onClick={handler} disabled />);
		fireEvent.click(screen.getByRole('button'));
		expect(handler).not.toHaveBeenCalled();
	});

	it('sets the disabled attribute when disabled', () => {
		renderWithTheme(<Button label="Click me" disabled />);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('forwards the title attribute', () => {
		renderWithTheme(<Button label="Visit" title="Open project site" />);
		expect(screen.getByRole('button')).toHaveAttribute(
			'title',
			'Open project site',
		);
	});

	it('does not leak transient props to the DOM', () => {
		renderWithTheme(<Button label="Click me" color="green" animated />);
		const btn = screen.getByRole('button');
		expect(btn).not.toHaveAttribute('color');
		expect(btn).not.toHaveAttribute('animation');
		expect(btn).not.toHaveAttribute('animated');
		expect(btn).not.toHaveAttribute('$color');
		expect(btn).not.toHaveAttribute('$animated');
	});

	it('renders 4 decorative spans marked aria-hidden', () => {
		const { container } = renderWithTheme(<Button label="Click me" />);
		const spans = container.querySelectorAll('span');
		expect(spans).toHaveLength(4);
		spans.forEach(span => {
			expect(span).toHaveAttribute('aria-hidden', 'true');
		});
	});

	it('uses the submit type when requested', () => {
		renderWithTheme(<Button label="Send" type="submit" />);
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
	});
});
