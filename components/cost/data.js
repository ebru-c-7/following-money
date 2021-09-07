export const COST_FORM = [
  {
    label: "Name: ",
    name: "name",
    element: "input",
    type: "text",
    placeholder: "Name of the cost item",
    config: { required: true },
  },
  {
    label: "Date: ",
    name: "date",
    element: "input",
    type: "date",
    placeholder: "Date of the cost item",
    config: { required: true },
  },
  {
    label: "Amount: ",
    name: "amount",
    element: "input",
    type: "number",
    placeholder: "Amount",
    config: { step: "0.01" },
  },
  {
    label: "Type: ",
    name: "cost-type",
    element: "select",
    config: { required: true },
    options: [
      {
        value: "",
        text: "Select",
      },
      {
        value: "grocery",
        text: "Grocery",
      },
      {
        value: "electronic",
        text: "Electronic",
      },
      {
        value: "home",
        text: "Home",
      },
      {
        value: "vacation",
        text: "Vacation",
      },
      {
        value: "education",
        text: "Education",
      },
      {
        value: "entertainment",
        text: "Entertainment",
      },
      {
        value: "credit",
        text: "Credit",
      },
      {
        value: "other",
        text: "Other",
      },
    ],
  },
  // {
  //   label: "Installment: ",
  //   name: "installment",
  //   element: "input",
  //   type: "number",
  //   placeholder: "",
  //   config: { step: "1", defaultValue: 1 },
  // },
  // {
  //   label: "Repeat: ",
  //   name: "repeat",
  //   element: "input",
  //   type: "number",
  //   placeholder: "",
  //   config: { step: "1", defaultValue: 0 },
  // },
  {
    label: "Note: ",
    name: "note",
    element: "input",
    type: "text",
    placeholder: "Note for the cost item",
  },
];

export const COST_FORM_ADDED = [
  {
    id: "installment",
    text: "Use Installment",
    name: "installment",
    value: 1,
    data: {
      label: "Installment: ",
      name: "installment",
      element: "input",
      type: "number",
      placeholder: "",
      config: { step: "1", defaultValue: 1 },
    },
  },
  {
    id: "repeat",
    text: "Repeat this",
    name: "repeat",
    value: 0,
    data: {
      label: "Repeat: ",
      name: "repeat",
      element: "input",
      type: "number",
      placeholder: "",
      config: { step: "1", defaultValue: 0 },
    },
  },
];
