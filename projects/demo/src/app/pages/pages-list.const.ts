type PageList = Array<{
  label: string;
  pages: Array<{
    label: string;
    path: string;
  }>;
}>;

export const pageList: PageList = [
  {
    label: 'Components',
    pages: [
      {
        label: 'Dates',
        path: 'dates',
      },
      {
        label: 'FillOut',
        path: 'fill-out',
      },
      {
        label: 'Input',
        path: 'input',
      },
      {
        label: 'MenuButton',
        path: 'menu-button',
      },
      {
        label: 'MultipleChoice',
        path: 'multiple-choice',
      },
      {
        label: 'Progress',
        path: 'progress',
      },
      {
        label: 'RadioSlider',
        path: 'radio-slider',
      },
      {
        label: 'Select',
        path: 'select',
      },
      {
        label: 'SubmitButton',
        path: 'submit-button',
      },
    ],
  },
  {
    label: 'Utils',
    pages: [
      {
        label: 'SubBulk',
        path: 'sub-bulk',
      },
      {
        label: 'Custom Pipes',
        path: 'custom-pipes',
      },
    ],
  },
];
