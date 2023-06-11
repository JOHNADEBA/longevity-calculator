
type handleChange = (name: string, value: string | number | null) => void;
type getState = (state: string) => string;
type allVoidFunctions = () => void;

export interface ChartData {
	labels?: (string | undefined)[] | undefined
	datasets?: [
		{
			data: (number | undefined)[] | undefined;
			backgroundColor: string[];
			borderWidth: number
		}
	]
}


export interface LongetivityForm {
	age: number | null;
	gender: string;
	exercise: string;
	diet: string;
	smoking: string;
	stress?: string;
	sleep?: number | null;
	lifeExpectancy?: number;
	message?: string;
	chartData?: ChartData
	graphData?: [{ key?: string | undefined; value?: number | undefined; }]
};

export interface AppProviderProps {
	children: React.ReactNode;
}

export interface AppContextInterface extends LongetivityForm {
	handleChange: handleChange;
	getState: getState
	getLifeExpectancy: allVoidFunctions;
};

export interface ResultsModalInterface {
	showResultsModal: boolean;
	toggleResultsModal: allVoidFunctions
} 