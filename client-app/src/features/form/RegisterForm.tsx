import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import * as Yup from "yup";
import TextInputStandard from "../../app/common/form/TextInputStandard";
import { useStore } from "../../app/stores/store";
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm() {
  const { userStore, modalStore } = useStore();

  const validationSchema = Yup.object({
    displayName: Yup.string().required("Display name cannot be empty"),
    email: Yup.string().required("Email cannot be empty").email(),
    password: Yup.string().required("Password cannot be empty"),
    username: Yup.string().required("Username cannot be empty"),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(value, { setErrors }) => {
        console.log(value);
        userStore.register(value).catch((error) => setErrors({ error }));
      }}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Sign up to BMS"
            textAlign="center"
            color="green"
          />
          <TextInputStandard
            name="displayName"
            placeholder="Display Name"
            label="Enter a name to be displayed on the profile"
          />
          <TextInputStandard
            name="username"
            placeholder="Username"
            label="Enter a username for your profile"
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
            render={() => <ValidationError errors={errors.error} />}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            floated="right"
            type="submit"
            content="Register"
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
