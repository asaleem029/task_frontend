export const readFromLocalStorage = (key: any) => {
    try {
        if (typeof window !== undefined && typeof window !== 'undefined') {
            const jsonData: any = localStorage.getItem(key);
            return (jsonData !== 'undefined' && jsonData !== undefined) ? JSON.parse(jsonData) : null;
        }
    } catch (error) {
        console.error('Error reading data from Local Storage:', error);
        return null;
    }
    return null;
};

// Function to update data in Local Storage
export const updateLocalStorageData = (key: any, updateFunction: any) => {
    try {
        // Read existing data
        const existingData = readFromLocalStorage(key);

        // Apply the update function to modify the data
        const updatedData = updateFunction(existingData);

        // Write the updated data back to Local Storage
        writeToLocalStorage(key, updatedData);
    } catch (error) {
        console.error('Error updating data in Local Storage:', error);
    }
};

// Function to write data to Local Storage
export const writeToLocalStorage = (key: any, data: any) => {
    try {
        if (typeof window !== undefined && typeof window !== 'undefined') {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
        }
    } catch (error) {
        console.error('Error writing data to Local Storage:', error);
    }
};
