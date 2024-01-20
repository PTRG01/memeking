export const toUppercase = (value: string) =>
  value?.charAt(0).toUpperCase() + value.slice(1);

export const toUppercaseArr = (values: string[]) =>
  values
    ?.map((value) => value?.charAt(0).toUpperCase() + value.slice(1))
    .join(', ');
