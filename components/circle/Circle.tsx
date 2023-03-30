import style from './Circle.module.css';

export const Circle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style.circle}>
      <div className={style.flex}>{children}</div>
    </div>
  );
};
