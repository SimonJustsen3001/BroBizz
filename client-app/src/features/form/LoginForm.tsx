import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import * as Yup from "yup";
import TextInputStandard from "../../app/common/form/TextInputStandard";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
  const { userStore, modalStore } = useStore();

  const validationSchema = Yup.object({
    email: Yup.string().required("Email cannot be empty").email(),
    password: Yup.string().required("Password cannot be empty"),
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
          <Header
            as="h2"
            content="Login to BMS"
            textAlign="center"
            color="green"
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
            primary
            loading={isSubmitting}
            positive
            floated="right"
            type="submit"
            content="Login"
          />
          <Button
            onClick={modalStore.closeModal}
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>
      )}
    </Formik>
  );
});
