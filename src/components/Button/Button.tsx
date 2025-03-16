import React, { forwardRef } from "react";
import {
  PolymorphicComponentProps,
  PolymorphicRef
} from "./../../utils/polymorphic";
import style from "./button.module.scss";

type ButtonProps<T extends React.ElementType> = PolymorphicComponentProps<
  T,
  {
    disabled?: boolean;
    className?: string;
  }
>;

export const Button = forwardRef(
  <T extends React.ElementType = "button">(
    props: ButtonProps<T>,
    ref: PolymorphicRef<T>
  ) => {
    const { ...rest } = props;
    return <button ref={ref} {...rest} className={style.button} />;
  }
);

Button.displayName = "Button";
