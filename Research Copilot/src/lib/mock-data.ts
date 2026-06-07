export interface PolishedDraft {
  originalWordCount: number;
  polishedWordCount: number;
  polishedText: string;
  improvements: string[];
}

export const mockPolishedDraft: PolishedDraft = {
  originalWordCount: 187,
  polishedWordCount: 203,
  polishedText: `The relationship between institutional design and democratic stability has been a central concern in comparative political science since the mid-twentieth century. While scholars such as Lijphart (2012) have argued that consensual democratic structures promote stability in plural societies, others contend that majoritarian systems offer greater accountability through clearer lines of responsibility (Linz, 1990). This essay examines these competing claims through a comparative analysis of the United Kingdom's parliamentary system and the United States' presidential framework, evaluating how each institutional arrangement mediates conflict, constrains executive power, and responds to societal fragmentation. By applying a structured comparative methodology, this analysis seeks to determine whether institutional design alone can account for divergent democratic outcomes, or whether contextual factors — historical path dependence, cultural norms, and economic conditions — play an equally determinative role.`,
  improvements: [
    "Strengthened thesis specificity by naming the two case studies upfront",
    "Added scholarly citations (Lijphart, Linz) to anchor claims in the literature",
    "Improved sentence rhythm and eliminated redundant phrasing",
    "Clarified the essay's analytical scope with a explicit research question",
    "Elevated vocabulary to formal academic register without sacrificing readability",
    "Ensured logical flow from general claim → competing views → specific focus → methodology",
  ],
};

export function generateMockPolish(input: string): PolishedDraft {
  if (!input.trim()) {
    return mockPolishedDraft;
  }

  const words = input.trim().split(/\s+/);
  const polishedText = input
    .trim()
    .replace(/\b(shows|shows that|a lot of|very|really|get|got)\b/gi, (match) => {
      const replacements: Record<string, string> = {
        shows: "demonstrates",
        "shows that": "demonstrates that",
        "a lot of": "numerous",
        very: "considerably",
        really: "substantially",
        get: "obtain",
        got: "obtained",
      };
      return replacements[match.toLowerCase()] ?? match;
    })
    .replace(/\.\s+/g, ". ")
    .replace(/\s+/g, " ");

  return {
    originalWordCount: words.length,
    polishedWordCount: polishedText.split(/\s+/).length,
    polishedText,
    improvements: mockPolishedDraft.improvements,
  };
}
