import { ReactNode } from "react";

type CardType = {
  children: ReactNode;
  className: string;
};

const Card = ({ children, className }: CardType) => {
  return <div className={className}>{children}</div>;
};

export default Card;
