import classes from "../form/BroBizzForm.module.css";

interface Props {
  onClickAdd: () => void;
}

const BroBizzButtons = ({ onClickAdd }: Props) => {
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
