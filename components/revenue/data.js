export const REVENUE_FORM = [
  {
    label: "Name: ",
    name: "name",
    element: "input",
    type: "text",
    placeholder: "Name of the revenue item",
    config: { required: true },
  },
  {
    label: "Date: ",
    name: "date",
    element: "input",
    type: "date",
    placeholder: "Date of the revenue item",
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
    label: "Source: ",
    name: "source-type",
    element: "select",
    config: { required: true },
    options: [
      {
        value: "",
        text: "Select",
      },
      {
        value: "salary",
        text: "Salary",
      },
      {
        value: "sale",
        text: "Sale",
      },
      {
        value: "other-work",
        text: "Other Work",
      },

      {
        value: "loan",
        text: "Loan",
      },
      {
        value: "other",
        text: "Other",
      },
    ],
  },
  {
    label: "Note: ",
    name: "note",
    element: "input",
    type: "text",
    placeholder: "Note for the revenue item",
  },
];

export const REVENUE_FORM_ADDED = [
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
    text: "Repeat This",
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
