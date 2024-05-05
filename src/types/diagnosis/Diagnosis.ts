export default interface Diagnosis {
  uuid: string;
  symptoms: string;
  questions: DiagnosisQuestions[];
  diagnosis_generated:boolean;
  health_issue:string;
  help_recomendations:string;
  problem_description:string;
}

export interface DiagnosisQuestions {
  uuid: string;
  question: string;
  answer: string | null;
}
