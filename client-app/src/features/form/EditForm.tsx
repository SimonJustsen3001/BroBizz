import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import * as Yup from "yup";
import TextInputStandard from "../../app/common/form/TextInputStandard";
import { BroBizzFormValues } from "../../app/interfaces/brobizzInterface";
import { useStore } from "../../app/stores/store";

export default observer(function EditForm({ id, name }: BroBizzFormValues) {
  const { brobizzStore, modalStore } = useStore();

  const validationSchema = Yup.object({
    newname: Yup.string().required("Name cannot be empty"),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{
        newname: name,
        error: null,
      }}
      onSubmit={(value, { setErrors }) => {
        const name = value.newname;
        const obj = { id, name };
        return brobizzStore
          .editBroBizz(obj)
          .catch((error) => setErrors({ error: "Invalid email or password" }));
      }}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Change BroBizz Name"
            textAlign="center"
            color="green"
          />
          <TextInputStandard
            name="newname"
            placeholder="New Name"
            label="New Name"
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
            onClick={() => {
              setTimeout(brobizzStore.loadBroBizzs, 500);
            }}
            primary
            loading={isSubmitting}
            positive
            floated="right"
            type="submit"
            content="Change"
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
