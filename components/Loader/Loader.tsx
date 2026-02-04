import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.overlay}>
      <div className={css.loader}>
        <div className={css.circle}></div>
        <div className={css.carIcon}>
          <svg width="40" height="40">
            <use href="/sprite.svg#car" />
          </svg>
        </div>
      </div>
    </div>
  );
};
