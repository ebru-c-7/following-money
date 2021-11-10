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
    name: "source",
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
    data: { config: { defaultValue: "" } },
  },
];

export const REVENUE_FORM_ADDED = [
  {
    id: "installment",
    text: "Use Installment",
    name: "installment",
    data: {
      label: "Installment: ",
      name: "installment",
      element: "input",
      type: "number",
      placeholder: "",
      config: {
        step: "1",
        defaultValue: 1,
        title:
          "The item amount will be divided <br> and spread over months <br> by the number of months provided",
      },
    },
  },
  {
    id: "repeat",
    text: "Repeat This",
    name: "repeat",
    data: {
      label: "Repeat: ",
      name: "repeat",
      element: "input",
      type: "number",
      placeholder: "",
      config: {
        step: "1",
        defaultValue: 0,
        title:
          "The item will be repeated <br> by the number of months provided",
      },
    },
  },
];

export const renderRevenueForm = (item) => {
  let date = item.date.split("T")[0].replace('"', "").toString();
  let totalRevenue =
    item.installment !== 1 ? item.amount * item.installment : item.amount;

  return [
    {
      label: "Name: ",
      name: "name",
      element: "input",
      type: "text",
      placeholder: "Name of the revenue item",
      config: { required: true, defaultValue: item.name },
    },
    {
      label: "Date: ",
      name: "date",
      element: "input",
      type: "date",
      placeholder: "Date of the revenue item",
      config: { required: true, defaultValue: date },
    },
    {
      label: "Amount: ",
      name: "amount",
      element: "input",
      type: "number",
      placeholder: "Amount",
      config: { step: "0.01", defaultValue: totalRevenue },
    },
    {
      label: "Source: ",
      name: "source",
      element: "select",
      config: { required: true, defaultValue: item.source },
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
      config: { defaultValue: item.note },
    },
  ];
};

export const renderRevenueOptions = (item) => {
  return [
    {
      id: "installment",
      text: "Use Installment",
      name: "installment",
      data: {
        label: "Installment: ",
        name: "installment",
        element: "input",
        type: "number",
        placeholder: "",
        config: {
          step: "1",
          defaultValue: item.installment,
          isOpen: item.installment !== 1,
          title:
            "The item amount will be divided <br> and spread over months <br> by the number of months provided",
        },
      },
    },
    {
      id: "repeat",
      text: "Repeat This",
      name: "repeat",
      data: {
        label: "Repeat: ",
        name: "repeat",
        element: "input",
        type: "number",
        placeholder: "",
        config: {
          step: "1",
          defaultValue: item.repeat,
          isOpen: item.repeat !== 0,
          title:
            "The item will be repeated <br> by the number of months provided",
        },
      },
    },
  ];
};
