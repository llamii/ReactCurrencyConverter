export const validateInput = (input: string): string => {
  const maxChars = 10

  const inputTrimmed = input.slice(0, maxChars)

  const inputWithDot = inputTrimmed.replace(/,/g, '.')

  const isValidNumber = /^[0-9.,]*$/.test(inputWithDot)

  if (/^[.,]/.test(inputWithDot)) {
    return ''
  }

  if ((inputWithDot.match(/\./g) || []).length > 1 || (inputWithDot.match(/,/g) || []).length > 1) {
    return inputWithDot.slice(0, -1)
  }

  return isValidNumber ? inputWithDot : inputWithDot.slice(0, -1)
}
