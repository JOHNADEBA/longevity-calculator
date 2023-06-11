import { HANDLE_CHANGE, LIFE_SPAN } from "./actionTypes";

export const reducer = (state: any, action: any) => {
  if (action.type === HANDLE_CHANGE) {
    const matchedKey = Object.keys(state).find(
      (key) => key === action.payload.name
    );

    return matchedKey && { ...state, [matchedKey]: action.payload.value };
  }

  if (action.type === LIFE_SPAN) {
    const { lifeExpectancy, message, getGraphData } = action.payload;
    return {
      ...state,
      lifeExpectancy,
      message,
      graphData: getGraphData,
    };
  }

  return state;
};
