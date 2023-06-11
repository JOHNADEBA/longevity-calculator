export const formInputsData = [
  { id: 1, type: 'text', label: "age" },
  { id: 2, type: 'radio', label: "gender", items: ["male", "female", "Other"] },
  {
    id: 3,
    type: 'select',
    label: "exercise",
    items: ["Not active", "Active", "Very active"],
  },
  {
    id: 4,
    type: 'select',
    label: "diet",
    items: [
      "Poor",
      "Moderate",
      "Very healthy",
    ],
  },
  {
    id: 5,
    type: 'select',
    label: "smoking habits",
    items: ["Non smoker", "Occassionally", "Heavy smoker"],
  },
];

export const additionalFormInputData = [
  {
    id: 6,
    type: 'select',
    label: "stress level",
    items: ["Not stressed", "Passively stressed", "very stressed"],
  },
  { id: 7, type: 'text', label: "sleep hours" },
];
