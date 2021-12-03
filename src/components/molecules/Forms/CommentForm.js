import {
	addDoc,
	collection,
	doc,
	increment,
	updateDoc,
} from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import * as Yup from "yup";

import { db } from "../../../services/firebase";
import Button from "../../atoms/Button/Button";
import FormInput from "./FormInput";

const StyledFormInput = styled(FormInput)`
	padding: 0.5rem 1rem;
`;

const Honeypot = styled(Field)`
	display: none;
`;

const SubmitButton = styled(Button)`
	font-size: ${({ theme }) => theme.fontSize.s};
	padding: 15px 10px;
	cursor: pointer;
	margin-top: 15px !important;
	${({ theme }) => theme.mq.s} {
		margin-top: 30px;
	}
	${({ disabled }) =>
		disabled &&
		css`
			content: "";
			background: #03e9f4;
			color: ${({ theme }) => theme.dark};
			cursor: default;
		`}
`;

const CommentSchemaEn = Yup.object().shape({
	author: Yup.string().required("Your name is required!"),
	content: Yup.string().required("Provide comment message!"),
});
const CommentSchemaPl = Yup.object().shape({
	author: Yup.string().required("Podaj swoje imię"),
	content: Yup.string().required("Wpisz treść komentarza"),
});

const initialValues = {
	author: "",
	content: "",
	honeypot: false,
};

const CommentForm = ({ lang, postId, parentId = null }) => {
	let initialSubmitBtnContent, successSubmitBtnContent, errorSubmitBtnContent;

	if (lang === "en") {
		initialSubmitBtnContent = {
			content: "Submit",
			color: "blue",
		};
		successSubmitBtnContent = {
			content: "Success!",
			color: "green",
		};
		errorSubmitBtnContent = { content: "Something went wrong!", color: "red" };
	} else if (lang === "pl") {
		initialSubmitBtnContent = {
			content: "Wyślij",
			color: "blue",
		};
		successSubmitBtnContent = {
			content: "Wysłano!",
			color: "green",
		};
		errorSubmitBtnContent = {
			content: "Coś poszło nie tak :(",
			color: "red",
		};
	}

	const [submitBtn, setSubmitBtn] = useState(initialSubmitBtnContent);

	const clearButton = () => {
		setSubmitBtn(initialSubmitBtnContent);
	};

	const sendForm = (values, { setSubmitting, resetForm }) => {
		const sendComment = async () => {
			try {
				const docRef = await addDoc(collection(db, "comments"), {
					author: values.author,
					content: values.content,
					postId,
					parentId: parentId || null,
					timestamp: new Date().getTime(),
				});
				setSubmitting(false);
				setSubmitBtn(successSubmitBtnContent);
				resetForm();
				setTimeout(clearButton, 2500);
			} catch (e) {
				setSubmitting(false);
				setSubmitBtn(errorSubmitBtnContent);
				setTimeout(clearButton, 1500);
				console.warn("Error adding document: ", e);
			}
		};

		const sendBotInfo = async () => {
			try {
				const counterRef = doc(db, "bot-info", "counter");

				await updateDoc(counterRef, {
					value: increment(1),
				});
				setSubmitting(false);
				setSubmitBtn(successSubmitBtnContent);
				resetForm();
				setTimeout(clearButton, 2500);
			} catch (e) {
				setSubmitting(false);
				setSubmitBtn(errorSubmitBtnContent);
				setTimeout(clearButton, 1500);
				console.warn("Error adding document: ", e);
			}
		};

		values.honeypot ? sendBotInfo() : sendComment();
	};

	if (lang === "en") {
		return (
			<Formik
				initialValues={initialValues}
				validationSchema={CommentSchemaEn}
				onSubmit={sendForm}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<Form onSubmit={handleSubmit} autoComplete="off" name="comment-form">
						<StyledFormInput
							id="author"
							label="Name"
							onChangeFn={handleChange}
							onBlurFn={handleBlur}
							value={values.author}
							touched={touched.author}
							errors={errors.author}
						/>
						<StyledFormInput
							textarea
							id="content"
							label="Comment"
							onChangeFn={handleChange}
							onBlurFn={handleBlur}
							value={values.content}
							touched={touched.content}
							errors={errors.content}
						/>
						<Honeypot type="checkbox" name="honeypot" />
						<SubmitButton
							color={submitBtn.color}
							label={submitBtn.content}
							disabled={isSubmitting || submitBtn.color !== "blue"}
							isSubmitting={isSubmitting}
							type="submit"
						>
							{!isSubmitting && submitBtn.content}
						</SubmitButton>
					</Form>
				)}
			</Formik>
		);
	} else if (lang === "pl") {
		return (
			<Formik
				initialValues={initialValues}
				validationSchema={CommentSchemaPl}
				onSubmit={sendForm}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<Form onSubmit={handleSubmit} autoComplete="off" name="comment-form">
						<StyledFormInput
							id="author"
							label="Imię"
							onChangeFn={handleChange}
							onBlurFn={handleBlur}
							value={values.author}
							touched={touched.author}
							errors={errors.author}
						/>
						<StyledFormInput
							textarea
							id="content"
							label="Komentarz"
							onChangeFn={handleChange}
							onBlurFn={handleBlur}
							value={values.content}
							touched={touched.content}
							errors={errors.content}
						/>
						<Honeypot type="checkbox" name="honeypot" />
						<SubmitButton
							color={submitBtn.color}
							label={submitBtn.content}
							disabled={isSubmitting || submitBtn.color !== "blue"}
							isSubmitting={isSubmitting}
							type="submit"
						>
							{!isSubmitting && submitBtn.content}
						</SubmitButton>
					</Form>
				)}
			</Formik>
		);
	}
};

export default CommentForm;
