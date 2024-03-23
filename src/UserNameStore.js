let username = null;

export const storeUsername = (name) => {
  username = name;
};

export const getUsername = () => {
  return username;
};
