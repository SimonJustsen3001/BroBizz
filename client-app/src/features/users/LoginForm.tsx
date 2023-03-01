import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Label } from "semantic-ui-react";
import * as Yup from "yup";
import TextInputStandard from "../../app/common/form/TextInputStandard";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
  const { userStore } = useStore();

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email(),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(value, { setErrors }) =>
        userStore
          .login(value)
          .catch((error) => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <TextInputStandard
            name="username"
            placeholder="Username"
            label="UserName"
          />
          <TextInputStandard name="email" placeholder="Email" label="Email" />
          <TextInputStandard
            name="password"
            placeholder="Password"
            label="Password"
            type="password"
          />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            floated="right"
            type="submit"
            content="Login"
          />
          <Button
            as={Link}
            to="./"
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>
      )}
    </Formik>
  );
});
