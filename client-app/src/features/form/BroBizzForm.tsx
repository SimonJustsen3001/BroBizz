import { Form, Formik } from "formik";
import React from "react";

export default function BroBizzForm() {
  return (
    <div>
      <Formik
        initialValues={{ name: "", brobizzId: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <p>Email</p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
