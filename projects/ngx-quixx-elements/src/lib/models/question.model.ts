/**
 * Model of the base question received by components.
 */
export interface NgxQuixxQuestion {
  id: string;
  question: string;
  options: NgxQuixxQuestionOption[];
}

/**
 * Model of the base question option.
 */
export interface NgxQuixxQuestionOption {
  key: number;
  value: string;
}
