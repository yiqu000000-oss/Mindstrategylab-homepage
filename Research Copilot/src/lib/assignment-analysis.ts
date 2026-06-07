export interface AssignmentAnalysis {
  assignmentType: string;
  dueDate: string;
  wordCount: string;
  format: string;
  detectedTitle: string;
  keyRequirements: string[];
  suggestedStructure: string[];
  keyTopics: string[];
  potentialPitfalls: string[];
  submissionChecklist: string[];
  heuristicQuestions: string[];
}

export const ASSIGNMENT_ANALYSIS_LIST_FIELDS = [
  "keyRequirements",
  "suggestedStructure",
  "keyTopics",
  "potentialPitfalls",
  "submissionChecklist",
  "heuristicQuestions",
] as const;

export type AssignmentAnalysisListField =
  (typeof ASSIGNMENT_ANALYSIS_LIST_FIELDS)[number];

export const ASSIGNMENT_ANALYSIS_STRING_FIELDS = [
  "assignmentType",
  "dueDate",
  "wordCount",
  "format",
  "detectedTitle",
] as const;

export type AssignmentAnalysisStringField =
  (typeof ASSIGNMENT_ANALYSIS_STRING_FIELDS)[number];
