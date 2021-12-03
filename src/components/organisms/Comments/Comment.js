import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import userIcon from "../../../assets/icons/user.svg";
import getDate from "../../../utils/getDate";
import sortBy from "../../../utils/sortBy";
import Button from "../../atoms/Button/Button";
import CommentForm from "../../molecules/Forms/CommentForm";

const ReplyButton = styled(Button)`
	font-size: ${({ theme }) => theme.fontSize.s};
	padding: 15px 10px;
	cursor: pointer;
	margin-top: 15px !important;
	${({ theme }) => theme.mq.s} {
		margin-top: 30px;
	}
`;

const StyledSingleComment = styled.div`
	padding-bottom: 2rem;
`;

const CommentContainer = styled.article`
	border: 1px solid ${({ theme }) => theme.gray};
	border-radius: 10px;
	margin: 2rem 0 0 ${props => (props.child ? "20px" : "0")};
	padding: 3rem;
	.flex-container {
		display: flex;
		align-items: flex-start;
	}
	.comment {
		display: flex;
		flex-direction: column;
		margin-left: 1rem;
		font-size: ${({ theme }) => theme.fontSize.xs};
	}
	.author {
		font-size: ${({ theme }) => theme.fontSize.m};
		text-transform: uppercase;
		margin-bottom: 5px;
		font-weight: ${({ theme }) => theme.bold};
	}
	time {
		color: ${({ theme }) => theme.gray};
		padding: 0 0 1rem 0;
	}
`;

const SingleComment = ({ comment, lang }) => {
	const dateObj = comment.timestamp ? new Date(comment.timestamp) : undefined;
	const time = dateObj ? getDate(dateObj, lang) : "";
	const timeString = time ? `${time.date} ${time.month} ${time.year}` : "";

	return (
		<StyledSingleComment>
			<div className="flex-container">
				<img src={userIcon} alt="User avatar" width="50" height="50" />
				<div className="comment">
					<p className="author">{comment.author}</p>
					<time>{timeString}</time>
					<p>{comment.content}</p>
				</div>
			</div>
		</StyledSingleComment>
	);
};

const Comment = ({ lang, comment, children, postId }) => {
	const [showReplyBox, setShowReplyBox] = useState(false);
	const commentsRef = useRef(null);

	useEffect(() => {
		const commentList = commentsRef.current;

		if (commentList) {
			[...commentList.children].map(child => {
				gsap.from(child, {
					autoAlpha: 0,
					y: "-=20",
					scrollTrigger: {
						trigger: child,
						start: "top bottom-=50px",
					},
				});
			});
		}
	}, []);

	const nestedCommentList = sortBy(children, "timestamp").map(comment => (
		<CommentContainer child className="comment-reply" key={comment.id}>
			<SingleComment comment={comment} lang={lang} />
		</CommentContainer>
	));

	return (
		<CommentContainer ref={commentsRef}>
			<SingleComment comment={comment} lang={lang} />
			{children && nestedCommentList}

			<div>
				{showReplyBox ? (
					<div>
						<ReplyButton
							renderAs="button"
							label={lang === "en" ? "Cancel Reply" : "Anuluj"}
							clickHandler={() => setShowReplyBox(false)}
							animated={false}
						/>
						<CommentForm lang={lang} parentId={comment.id} postId={postId} />
					</div>
				) : (
					<ReplyButton
						renderAs="button"
						label={lang === "en" ? "Reply" : "Odpowiedz"}
						clickHandler={() => setShowReplyBox(true)}
						animated={false}
					/>
				)}
			</div>
		</CommentContainer>
	);
};

export default Comment;
