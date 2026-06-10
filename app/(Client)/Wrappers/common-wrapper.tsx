import { ComponentType } from "react";

type CommonWrapperProps<T extends object, K extends keyof T> = {
  component: ComponentType<T>;
  func: (param?: any) => Promise<T[K]>;
  propName: K;
} & Omit<T, K>;

export default async function CommonWrapper<
  T extends object,
  K extends keyof T,
>({ component: Component, func, propName, ...rest }: CommonWrapperProps<T, K>) {
  const result = await func();
  return <Component {...({ ...rest, [propName]: result } as T)} />;
}
