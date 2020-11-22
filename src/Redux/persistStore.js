export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("to-do_state");
    if (!serializedState) return undefined;
    else return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("to-do_state", serializedState);
  } catch(err) {
    console.log(err);
  }
};