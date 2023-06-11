import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import {
	AppContextInterface,
	AppProviderProps,
	LongetivityForm,
} from "../types";
import { HANDLE_CHANGE, LIFE_SPAN } from "./actionTypes";

const initialState: LongetivityForm = {
	age: 10,
	gender: "male",
	exercise: "Active",
	diet: "Moderate",
	smoking: "Non smoker",
	stress: "Not stressed",
	sleep: 0,
	lifeExpectancy: 0,
	message: "",
};

// const AppContext = createContext(initialState);
const AppContext = createContext<AppContextInterface>(
	{} as AppContextInterface
);

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleChange = (name: string, value: string) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
	};

	//dynamically get state for looped input
	const getState = (key: keyof LongetivityForm) => {
		if (Object.keys(state).includes(key)) {
			return state[key];
		}
	};

	let getGraphData: { key: string; value: number }[] = [];

	const calculateAge = (): number => {
		const { age, gender } = state;

		let newAge: number = 0;
		const potentialMaxMaleAge: number = 80;
		const potentialMaxWomanAge: number = 100;
		const potentialMaxOtherAge: number = 85;

		if (age !== null) {
			if (gender === "male") {
				newAge = potentialMaxMaleAge - age;
			} else if (gender === "female") {
				newAge = potentialMaxWomanAge - age;
			} else {
				newAge = potentialMaxOtherAge - age;
			}
		}
		getGraphData.push({ key: "age", value: age });
		return newAge;
	};

	const calculateExercises = (): number => {
		const { exercise } = state;
		let computedExercise = -5;
		if (exercise === "Not active") {
			computedExercise = -5;
		} else if (exercise === "Active") {
			computedExercise = 3;
		} else {
			computedExercise = 5;
		}
		getGraphData.push({ key: "exercise", value: computedExercise });
		return computedExercise;
	};

	const calculateDiet = (): number => {
		const { diet } = state;

		let computedDiet: number = -3;

		if (diet === "Poor") {
			computedDiet = -5;
		} else if (diet === "Moderate") {
			computedDiet = 3;
		} else {
			computedDiet = 5;
		}

		getGraphData.push({ key: "diet", value: computedDiet });
		return computedDiet;
	};

	const calculateSmoking = (): number => {
		const { smoking } = state;

		let computedSmoking: number = 5;

		if (smoking === "Non smoker") {
			computedSmoking = 5;
		} else if (smoking === "Occassionally") {
			computedSmoking = 1;
		} else {
			computedSmoking = -10;
		}
		getGraphData.push({ key: "smoking", value: computedSmoking });

		return computedSmoking;
	};

	const calculateSleepTime = (): number => {
		const { sleep } = state;
		let sleepTime: number = 0;
		if (sleep !== undefined) {
			if (sleep >= 8 && sleep < 12) {
				sleepTime = 5;
			} else {
				sleepTime = -2;
			}
		}

		getGraphData.push({ key: "sleep", value: sleepTime });

		return sleepTime;
	};

	const calculateStressLevel = (): number => {
		const { stress } = state;
		let sleepLevel: number = 0;
		if (stress !== undefined) {
			if (stress === "Not stressed") {
				sleepLevel = 5;
			} else if (stress === "Passively stressed") {
				sleepLevel = 3;
			} else {
				sleepLevel = -5;
			}
		}

		getGraphData.push({ key: "stress", value: sleepLevel });

		return sleepLevel;
	};

	const getLifeExpectancy = () => {
		const { age } = state;
		let lifeExpectancy: number = 0;

		// Calculate life expectancy based on gender
		lifeExpectancy = calculateAge();

		// Calculate Exercise
		lifeExpectancy = lifeExpectancy + calculateExercises();

		// Calculate Diet
		lifeExpectancy = lifeExpectancy + calculateDiet();

		// Calculate smoking level
		lifeExpectancy = lifeExpectancy + calculateSmoking();

		// Calculate sleep time
		lifeExpectancy = lifeExpectancy + calculateSleepTime();

		// Calculate stress level
		lifeExpectancy = lifeExpectancy + calculateStressLevel();

		lifeExpectancy = lifeExpectancy < 0 ? 0 : lifeExpectancy;

		const year: string = lifeExpectancy > 1 ? "years" : "year";

		//compute message
		let message: string = "";
		if (age > 59 && lifeExpectancy < 10) {
			message = `You have ${lifeExpectancy} to live. You made it past the average age.`;
		} else if (age < 60 && lifeExpectancy < 10) {
			message = `You have ${lifeExpectancy} to live. You must maintain a healthy lifestyle.`;
		} else {
			message = `You have ${lifeExpectancy} ${year} to live.`;
		}

		dispatch({
			type: LIFE_SPAN,
			payload: { lifeExpectancy, message, getGraphData },
		});
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				getState,
				getGraphData,
				getLifeExpectancy,
				handleChange,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
