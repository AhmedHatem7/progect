import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ResetPassword = ({ token }) => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
     .min(6, 'Password must be at least 6 characters')
     .max(40, 'Password must not exceed 40 characters')
     .required('Required'),
    confirmPassword: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
     .required('Required'),
  });

  const handleSubmit = (values) => {
    axios
     .post(`http://fluffypet.runasp.net/Reset-Passward${token}`, values)
     .then((response) => {
        // handle successful response
      })
     .catch((error) => {
        // handle error response
      });
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field name="confirmPassword" type="password" />
            <ErrorMessage name="confirmPassword" component="div" />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;