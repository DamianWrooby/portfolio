import React from 'react';
import styled from 'styled-components';

const Toc = styled.section`
	color: #16ffff;
	border: 1px solid white;
	padding: 1rem 2rem;
	margin-bottom: 4rem;
	${({ theme }) => theme.mq.md} {
		padding: 2rem 4rem;
	}
`;

const ToC = ({ headings, lang }) => (
	<Toc>
		{lang === 'en' && <h2>Table of contents</h2>}
		{lang === 'pl' && <h2>Spis treści</h2>}
		<ol>
			{headings.map((heading) => {
				return (
					<li key={heading.title}>
						<a href={`${heading.url}`}>{heading.title}</a>
						{heading.items && (
							<ul>
								{heading.items.map((nestedHeading) => {
									return (
										<li key={heading.title}>
											<a href={`${nestedHeading.url}`}>{nestedHeading.title}</a>
										</li>
									);
								})}
							</ul>
						)}
					</li>
				);
			})}
		</ol>
	</Toc>
);

export default ToC;
