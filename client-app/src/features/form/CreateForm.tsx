import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import * as Yup from "yup";
import TextInputStandard from "../../app/common/form/TextInputStandard";
import { useStore } from "../../app/stores/store";
import ValidationError from "../errors/ValidationError";

export default observer(function CreateForm() {
  const { brobizzStore, modalStore } = useStore();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name cannot be empty"),
    id: Yup.string().required("Serial cannot be empty"),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{
        name: "",
        id: "",
        error: null,
      }}
      onSubmit={(value, { setErrors }) => {
        console.log(value);
        brobizzStore.addBroBizz(value).catch((error) => console.log({ error }));
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
            content="Add new BroBizz device"
            textAlign="center"
            color="green"
          />
          <TextInputStandard name="name" placeholder="Name" label="Name" />
          <TextInputStandard
            name="id"
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            label="Serial key"
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
            content="Add BroBizz"
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
