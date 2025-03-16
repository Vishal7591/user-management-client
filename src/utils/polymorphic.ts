import React from 'react';

export type ExtendedProps<T = {}, OverrideProps = {}> = OverrideProps &
  Omit<T, keyof OverrideProps>;

export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

export type ComponentProp<C extends React.ElementType> = {
  component?: C;
};

export type InheritedProps<
  C extends React.ElementType,
  Props = {}
> = ExtendedProps<PropsOf<C>, Props>;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = InheritedProps<C, Props & ComponentProp<C>>;