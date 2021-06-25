import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Button from '../../atoms/Button/Button';
import FormInput from './FormInput';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SubmitButton = styled(Button)`
  && {
    cursor: pointer;
    width: 100%;
    margin-top: 15px !important;
  }
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

const ContactSchemaEn = Yup.object().shape({
	name: Yup.string().required('Your name is required!'),
	email: Yup.string().email('Email address is invalid!').required('Email address is required!'),
	message: Yup.string().min(10, 'Message is too short!').required('Message is required!')
});
const ContactSchemaPl = Yup.object().shape({
	name: Yup.string().required('Podaj swoje imię'),
	email: Yup.string().email('Adres email jest niepoprawny').required('Wpisz swój adres email'),
	message: Yup.string().min(10, 'Wiadomość jest za krótka').required('Podaj treść wiadomości')
});

const initialValues = {
	name: '',
	email: '',
	message: ''
};

const encode = (data) => {
	return Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
};

const ContactForm = ({ lang }) => {
	let initialSubmitBtnContent, successSubmitBtnContent, errorSubmitBtnContent;
	if (lang === 'en') {
		initialSubmitBtnContent = {
			content: 'Send message',
			color: 'blue'
		};
		successSubmitBtnContent = {
			content: 'Success!',
			color: 'green'
		};
		errorSubmitBtnContent = {
			content: 'Coś poszło nie tak :(',
			color: 'red'
		};
	} else if (lang === 'pl') {
		initialSubmitBtnContent = {
			content: 'Wyślij',
			color: 'blue'
		};
		successSubmitBtnContent = {
			content: 'Wysłano!',
			color: 'green'
		};
		errorSubmitBtnContent = { content: 'Something went wrong!', color: 'red' };
	}
	const [
		submitBtn,
		setSubmitBtn
	] = useState(initialSubmitBtnContent);

	const clearButton = () => {
		setSubmitBtn(initialSubmitBtnContent);
	};

	const sendForm = (values, { setSubmitting, resetForm }) => {
		const sendMessage = async () => {
			try {
				await fetch('/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: encode({
						'form-name': 'contact-form',
						...values
					})
				});
				setSubmitting(false);
				setSubmitBtn(successSubmitBtnContent);
				resetForm();
				setTimeout(clearButton, 2500);
			} catch (err) {
				setSubmitting(false);
				setSubmitBtn(errorSubmitBtnContent);
				setTimeout(clearButton, 1500);
			}
		};
		sendMessage();
	};

	if (lang === 'en') {
		return (
			<Formik initialValues={initialValues} validationSchema={ContactSchemaEn} onSubmit={sendForm}>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<Form
						onSubmit={handleSubmit}
						autoComplete="off"
						name="contact-form"
						data-netlify="true"
						data-netlify-honeypot="bot-field"
					>
						<Field type="hidden" name="form-name" />
						<Field type="hidden" name="bot-field" />
						<FormInput
							id="name"
							label="Name"
							onChangeFn={handleChange}
							onBlurFn={handleBlur}
							value={values.name}
							touched={touched.name}
							errors={errors.name}
						/>
						<FormInput
							id="email"
							label="Email address"
							onChangeFn={handleChange}
							onBlurFn={handleBlur}
							value={values.email}
							touched={touched.email}
							errors={errors.email}
						/>
						<FormInput
							textarea
							id="message"
							label="Message"
							onChangeFn={handleChange}
							onBlurFn={handleBlur}
							value={values.message}
							touched={touched.message}
							errors={errors.message}
						/>
						<SubmitButton
							color={submitBtn.color}
							label={submitBtn.content}
							disabled={isSubmitting || submitBtn.color !== 'blue'}
							isSubmitting={isSubmitting}
							type="submit"
						>
							{!isSubmitting && submitBtn.content}
						</SubmitButton>
					</Form>
				)}
			</Formik>
		);
	} else if (lang === 'pl') {
		return (
			<Formik initialValues={initialValues} validationSchema={ContactSchemaPl} onSubmit={sendForm}>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<Form
						onSubmit={handleSubmit}
						autoComplete="off"
						name="contact-form"
						data-netlify="true"
						data-netlify-honeypot="bot-field"
					>
						<Field type="hidden" name="form-name" />
						<Field type="hidden" name="bot-field" />
						<FormInput
							id="name"
							label="Imię"
							onChangeFn={handleChange}
							onBlurFn={handleBlur}
							value={values.name}
							touched={touched.name}
							errors={errors.name}
						/>
						<FormInput
							id="email"
							label="Adres email"
							onChangeFn={handleChange}
							onBlurFn={handleBlur}
							value={values.email}
							touched={touched.email}
							errors={errors.email}
						/>
						<FormInput
							textarea
							id="message"
							label="Wiadomość"
							onChangeFn={handleChange}
							onBlurFn={handleBlur}
							value={values.message}
							touched={touched.message}
							errors={errors.message}
						/>
						<SubmitButton
							color={submitBtn.color}
							label={submitBtn.content}
							disabled={isSubmitting || submitBtn.color !== 'blue'}
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

export default ContactForm;
