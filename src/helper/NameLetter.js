export const NameLetter = (name) => {
  let first_name = name.split(' ')[0];
  let last_name = name.split(' ')[1];
  if (last_name) {
    return first_name
      .charAt(0)
      .toUpperCase()
      .concat(last_name.charAt(0).toUpperCase());
  }
  return first_name.charAt(0).toUpperCase();
};
