// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const required = (inputs: any, keys: string[]) => {
  const required: string[] = []

  keys.forEach((key: string) => {
    const valueInput = inputs[key] || ''

    if (!valueInput.trim()) {
      required.push(key)
    }
  });

  return required;
}