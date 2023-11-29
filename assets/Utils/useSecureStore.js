import * as SecureStore from "expo-secure-store";

const useSecureStore = () => {
  const setValue = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  const getValue = async (key) => {
    const value = await SecureStore.getItemAsync(key);
    return value;
  };

  const removeValue = async (key) => {
    await SecureStore.deleteItemAsync(key);
  };

  return {
    setValue,
    getValue,
    removeValue,
  };
};

export default useSecureStore;
