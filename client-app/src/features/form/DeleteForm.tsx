import { observer } from "mobx-react-lite";
import { Button, Form, Header, Label } from "semantic-ui-react";
import { BroBizzFormValues } from "../../app/interfaces/brobizzInterface";
import { useStore } from "../../app/stores/store";

export default observer(function DeleteForm({ id, name }: BroBizzFormValues) {
  const { brobizzStore, modalStore } = useStore();
  const obj = { id, name };

  function handleSubmit() {
    brobizzStore.deleteBroBizz(obj);
    setTimeout(brobizzStore.loadBroBizzs, 500);
  }

  return (
    <Form>
      <Header>Remove BroBizz "{name}"?</Header>
      <Button
        onClick={handleSubmit}
        color="green"
        floated="right"
        type="submit"
      >
        Remove it
      </Button>
      <Button onClick={modalStore.closeModal} floated="right" type="button">
        Cancel
      </Button>
    </Form>
  );
});
