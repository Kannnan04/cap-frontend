// eslint-disable-next-line no-unused-vars
import React from "react";
import "./ForgotPassword.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

import axios from "axios";

const ForgotPassword = () => {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.put(
                "https://cap-backend-1-6zog.onrender.com/api/forgotpassword",
                values
            );

            if (response.status === 200) {
                window.alert("Password Updated successfully");
                setTimeout(() => {
                    window.location.href = "/login";
                });
            } else {
                window.alert("An error occurred while updating the password.");
            }
        } catch (error) {
            console.error(error);
            window.alert("An error occurred while updating the password.");
        } finally {
            setSubmitting(false);
            resetForm();
        }
    };

    return (
        <div className="update-container">
            <h2>Update Password</h2>
            <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = "Required";
                    }
                    if (!values.password) {
                        errors.password = "Required";
                    }
                    return errors;
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label>Email:</label>
                            <Field type="email" name="email" required />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>
                        <div className="form-group">
                            <label>New Password:</label>
                            <Field type="password" name="password" required />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="error"
                            />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Update Password
                        </button>
                    </Form>
                )}
            </Formik>

        </div>
    );
};

export default ForgotPassword;