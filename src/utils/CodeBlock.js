import Highlight, { defaultProps } from "prism-react-renderer";
import prismTheme from "prism-react-renderer/themes/nightOwl";
import React from "react";
import styled from "styled-components";

const Line = styled.div`
	display: table-row;
	&&:last-child {
		display: none;
	}
`;

const LineNo = styled.span`
	display: table-cell;
	text-align: right;
	padding-right: 1em;
	user-select: none;
	opacity: 0.5;
`;

const LineContent = styled.span`
	display: table-cell;
`;

const StyledPre = styled.pre`
	font-size: ${({ theme }) => theme.fontSize.xs} !important;
	${({ theme }) => theme.mq.md} {
		font-size: ${({ theme }) => theme.fontSize.m} !important;
	}
	margin: 0 0 30px 0;
	padding: 20px;
	border: 1px solid #349898;
	border-radius: 5px;
	background-color: #001929 !important;
	font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
	font-weight: 400;
	white-space: pre-wrap;
`;

let highlightStart = false;
const highlightClassName = "gatsby-highlight-code-line";

const highlightLine = (lineArray, lineProps) => {
	let shouldExclude = false;

	lineArray.forEach((line, i) => {
		const content = line.content;

		// Highlight lines with "// highlight-line"
		if (content.replace(/\s/g, "").includes("highlightLine")) {
			lineProps.className = `${lineProps.className} ${highlightClassName}`;
			line.content = content.replace("highlightLine", "");
		}

		// Stop highlighting
		if (!!highlightStart && content.replace(/\s/g, "") === "highlightLineEnd") {
			highlightStart = false;
			shouldExclude = true;
		}

		// Start highlighting after "//highlight-start"
		if (content.replace(/\s/g, "") === "highlightLineStart") {
			highlightStart = true;
			shouldExclude = true;
		}
	});

	// Highlight lines between //highlight-start & //highlight-end
	if (!!highlightStart) {
		lineProps.className = `${lineProps.className} ${highlightClassName}`;
	}

	return shouldExclude;
};

const CodeBlock = ({ children }) => {
	return (
		<Highlight
			{...defaultProps}
			code={children}
			theme={prismTheme}
			language="javascript">
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<StyledPre className={className} style={{ ...style }}>
					{tokens.map((line, i) => {
						const lineProps = getLineProps({ line, key: i });
						const shouldExclude = highlightLine(line, lineProps);
						let lineNumberElem;

						if (
							line.length === 1 &&
							line[0].empty === true &&
							i === tokens.length - 1
						) {
							lineNumberElem = null;
						} else {
							lineNumberElem = <LineNo>{i + 1}</LineNo>;
						}

						return !shouldExclude ? (
							<Line key={i} {...lineProps}>
								{tokens.length > 3 && lineNumberElem}
								<LineContent>
									{line.map((token, key) => (
										<span key={key} {...getTokenProps({ token, key })} />
									))}
								</LineContent>
							</Line>
						) : null;
					})}
				</StyledPre>
			)}
		</Highlight>
	);
};

export default CodeBlock;
