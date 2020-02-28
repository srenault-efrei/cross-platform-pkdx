

export default function Deconnexion() {
    return (
        clearAsyncStorage = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                await AsyncStorage.multiRemove(keys);
            } catch (error) {
                console.error('Error clearing app data.');
            }
        }
    );
  }