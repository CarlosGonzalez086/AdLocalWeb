export const getLocalStorageJWTUsuario = (): string => {
  try {
    return window.localStorage.getItem("jwtCliente") ?? "";
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const setLocalStorageJWTUsuario = (token: string): void => {
  try {
    window.localStorage.setItem("jwtCliente", token);
  } catch (error) {
    console.log(error);
  }
};

export const setLocalStorageUsuario = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const getLocalStorageUsuario = (key: string): string => {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const removeLocalStorageUsuario = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const clearStorageUsuario = (): void => {
  try {
    window.localStorage.removeItem("jwtCliente");

    window.localStorage.removeItem("cliente");
  } catch (error) {
    console.log(error);
  }
};
