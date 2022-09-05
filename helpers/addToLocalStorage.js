export const addToLocalStorage = (name, dataItem, check = false) => {
  const data = window.localStorage.getItem(name);

  if (data === null) {
    window.localStorage.setItem(name, JSON.stringify([dataItem]));
  } else {
    const getCurrentData = window.localStorage.getItem(name);
    const currentData = JSON.parse(getCurrentData);
    if (check) {
      if (currentData.includes(dataItem)) return;

      if (currentData.length > 20) {
        currentData.shift();
      }
    }

    currentData.push(dataItem);

    window.localStorage.setItem(name, JSON.stringify(currentData));
  }
};
