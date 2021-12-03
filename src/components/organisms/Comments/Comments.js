import React from "react";
import styled from "styled-components";

import CommentForm from "../../molecules/Forms/CommentForm";
import Comment from "./Comment";

const CommentsContainer = styled.div`
	max-width: ${({ theme }) => theme.articleContainerWidth};
	margin: auto;
	padding: 10px 15px;
	${({ theme }) => theme.mq.md} {
		padding: 20px 45px;
	}
	color: ${({ theme }) => theme.white};
	font-size: ${({ theme }) => theme.fontSize.lg};

	h2 {
		font-size: ${({ theme }) => theme.fontSize.xl};
		padding-bottom: 4rem;
	}
`;

const CommentList = styled.div`
	article {
		margin-bottom: 20px;
	}
`;

const Comments = ({ lang, comments, postId }) => {
	return (
		<CommentsContainer>
			{lang === "en" && <h2>Join the discussion</h2>}
			{lang === "pl" && <h2>Dołącz do dyskusji</h2>}
			<CommentForm lang={lang} postId={postId} />
			<CommentList>
				{comments.length > 0 &&
					comments
						.filter(comment => !comment.parentId)
						.map(comment => {
							let children;
							if (comment.id) {
								children = comments.filter(c => comment.id === c.parentId);
							}
							return (
								<Comment
									key={comment.id}
									lang={lang}
									children={children}
									comment={comment}
									postId={postId}
								/>
							);
						})}
			</CommentList>
		</CommentsContainer>
	);
};

export default Comments;
