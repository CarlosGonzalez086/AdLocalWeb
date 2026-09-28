export const getLocalStorageJWTUsuario = (): string => {
  try {
    return window.localStorage.getItem("jwtCliente") ?? "";
  } catch {
    return "";
  }
};

export const setLocalStorageJWTUsuario = (token: string): void => {
  try {
    window.localStorage.setItem("jwtCliente", token);
  } catch {
    // Manejo seguro en entornos sin localStorage
  }
};

export const setLocalStorageUsuario = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Manejo seguro
  }
};

export const getLocalStorageUsuario = (key: string): string => {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
};

export const removeLocalStorageUsuario = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Manejo seguro
  }
};

export const getLocalStorageRefreshTokenUsuario = (): string => {
  try {
    return window.localStorage.getItem("refreshTokenCliente") ?? "";
  } catch {
    return "";
  }
};

export const setLocalStorageRefreshTokenUsuario = (token: string): void => {
  try {
    window.localStorage.setItem("refreshTokenCliente", token);
  } catch {
    // Manejo seguro
  }
};

export const clearStorageUsuario = (): void => {
  try {
    window.localStorage.removeItem("jwtCliente");
    window.localStorage.removeItem("refreshTokenCliente");
    window.localStorage.removeItem("cliente");
  } catch {
    // Manejo seguro
  }
};
