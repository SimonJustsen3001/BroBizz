import classes from "../form/BroBizzForm.module.css";

interface Props {
  onClickAdd: () => void;
  onClickCancel: () => void;
}

const BroBizzButtons = ({ onClickAdd, onClickCancel }: Props) => {
  return (
    <>
      <div onClick={onClickAdd} className={classes.button}>
        Create Brobizz
      </div>
      <div className={classes.button}>Remove Brobizz</div>
    </>
  );
};

export default BroBizzButtons;
