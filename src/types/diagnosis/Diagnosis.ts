export default interface Diagnosis {
  uuid: string;
  symptoms: string;
  questions: DiagnosisQuestions[];
}

export interface DiagnosisQuestions {
  uuid: string;
  question: string;
  answer: string | null;
}
