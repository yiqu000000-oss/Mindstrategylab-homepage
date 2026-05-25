// Support System Dynamics — assessment items (1–7 Likert)

const SSD_ITEMS = [
  // ── LAYER 1: Resource Existence ──

  // Interpersonal Stability
  { id: "L1_IPS_1", layer: 1, subvariable: "interpersonal_stability", text: "I have at least one relationship that has remained reliably present over time." },
  { id: "L1_IPS_2", layer: 1, subvariable: "interpersonal_stability", text: "People I depend on have been consistent in their availability across changing circumstances." },
  { id: "L1_IPS_3", layer: 1, subvariable: "interpersonal_stability", text: "My close relationships provide a sense of continuity rather than constant uncertainty." },
  { id: "L1_IPS_4", layer: 1, subvariable: "interpersonal_stability", text: "I can identify people whose presence would remain stable if my life conditions shifted significantly." },
  { id: "L1_IPS_5", layer: 1, subvariable: "interpersonal_stability", text: "Interpersonal ruptures in my life have generally been repairable rather than permanently destabilizing." },

  // Identity Stability
  { id: "L1_IDS_1", layer: 1, subvariable: "identity_stability", text: "I have a relatively stable sense of who I am across different contexts." },
  { id: "L1_IDS_2", layer: 1, subvariable: "identity_stability", text: "Major life changes have not fundamentally dissolved my sense of self." },
  { id: "L1_IDS_3", layer: 1, subvariable: "identity_stability", text: "I can articulate core aspects of my identity that remain recognizable over time." },
  { id: "L1_IDS_4", layer: 1, subvariable: "identity_stability", text: "External pressures rarely force me into identities that feel fundamentally misaligned." },
  { id: "L1_IDS_5", layer: 1, subvariable: "identity_stability", text: "My self-understanding provides a reference point when navigating unfamiliar situations." },

  // Power Stability
  { id: "L1_PWS_1", layer: 1, subvariable: "power_stability", text: "I generally have adequate agency in decisions that affect my daily life." },
  { id: "L1_PWS_2", layer: 1, subvariable: "power_stability", text: "Power imbalances in my key relationships do not leave me feeling chronically constrained." },
  { id: "L1_PWS_3", layer: 1, subvariable: "power_stability", text: "I can set boundaries without fearing disproportionate consequences." },
  { id: "L1_PWS_4", layer: 1, subvariable: "power_stability", text: "Institutional or structural forces in my life allow room for self-direction." },

  // Material Stability
  { id: "L1_MTS_1", layer: 1, subvariable: "material_stability", text: "My basic material needs (housing, food, income) are reasonably secure." },
  { id: "L1_MTS_2", layer: 1, subvariable: "material_stability", text: "Financial uncertainty does not dominate my daily decision-making." },
  { id: "L1_MTS_3", layer: 1, subvariable: "material_stability", text: "I have access to resources needed to maintain a functional daily life." },
  { id: "L1_MTS_4", layer: 1, subvariable: "material_stability", text: "Material setbacks in my life have been recoverable within a reasonable timeframe." },
  { id: "L1_MTS_5", layer: 1, subvariable: "material_stability", text: "I can plan beyond immediate survival without constant resource anxiety." },

  // Existential Stability — continuity, groundedness, psychological intactness (not worldview/meaning)
  { id: "L1_EXS_1", layer: 1, subvariable: "existential_stability", text: "Even during long periods of instability, I still feel like the same person across time." },
  { id: "L1_EXS_2", layer: 1, subvariable: "existential_stability", text: "Ongoing pressure does not completely dissolve my sense of self." },
  { id: "L1_EXS_3", layer: 1, subvariable: "existential_stability", text: "I can maintain basic psychological continuity even when life circumstances change rapidly." },
  { id: "L1_EXS_4", layer: 1, subvariable: "existential_stability", text: "I rarely feel psychologically scattered across different parts of my life." },

  // Health Stability
  { id: "L1_HLS_1", layer: 1, subvariable: "health_stability", text: "My physical health is stable enough to support consistent daily functioning." },
  { id: "L1_HLS_2", layer: 1, subvariable: "health_stability", text: "I have access to healthcare or wellness resources when needed." },
  { id: "L1_HLS_3", layer: 1, subvariable: "health_stability", text: "Mental or emotional health challenges, if present, are manageable within my current structure." },
  { id: "L1_HLS_4", layer: 1, subvariable: "health_stability", text: "Health-related disruptions have not permanently reduced my baseline capacity." },
  { id: "L1_HLS_5", layer: 1, subvariable: "health_stability", text: "I can maintain routines that support my physical and mental wellbeing." },

  // Capability Flexibility
  { id: "L1_CPF_1", layer: 1, subvariable: "capability_flexibility", text: "I can adapt my skills and approaches when circumstances change unexpectedly." },
  { id: "L1_CPF_2", layer: 1, subvariable: "capability_flexibility", text: "I possess transferable abilities that remain useful across different life phases." },
  { id: "L1_CPF_3", layer: 1, subvariable: "capability_flexibility", text: "Learning new approaches under pressure is difficult but achievable for me." },
  { id: "L1_CPF_4", layer: 1, subvariable: "capability_flexibility", text: "I can reconfigure my daily functioning when standard methods become unavailable." },

  // Belief Stability — worldview, interpretive frameworks, guiding principles (cognitive/philosophical)
  { id: "L1_BLS_1", layer: 1, subvariable: "belief_stability", text: "I possess frameworks that help me interpret difficult experiences." },
  { id: "L1_BLS_2", layer: 1, subvariable: "belief_stability", text: "My principles remain relatively coherent under stress." },
  { id: "L1_BLS_3", layer: 1, subvariable: "belief_stability", text: "I can maintain direction through stable beliefs or philosophies." },
  { id: "L1_BLS_4", layer: 1, subvariable: "belief_stability", text: "I rely on broader interpretive systems to understand uncertainty." },

  // ── LAYER 2: Perceived Support Structures ──

  { id: "L2_PES_1", layer: 2, subvariable: "perceived_emotional_support", text: "I feel emotionally understood by at least one person in my life." },
  { id: "L2_PES_2", layer: 2, subvariable: "perceived_emotional_support", text: "When distressed, I believe someone would genuinely care about my experience." },
  { id: "L2_PES_3", layer: 2, subvariable: "perceived_emotional_support", text: "Emotional support feels available to me, not merely theoretical." },
  { id: "L2_PES_4", layer: 2, subvariable: "perceived_emotional_support", text: "I do not feel emotionally isolated even when physically alone." },
  { id: "L2_PES_5", layer: 2, subvariable: "perceived_emotional_support", text: "Expressing vulnerability to others has generally been met with warmth rather than rejection." },

  { id: "L2_PSS_1", layer: 2, subvariable: "perceived_structural_safety", text: "My environment feels structurally safe — predictable enough to plan within." },
  { id: "L2_PSS_2", layer: 2, subvariable: "perceived_structural_safety", text: "I trust that basic systems in my life will not collapse without warning." },
  { id: "L2_PSS_3", layer: 2, subvariable: "perceived_structural_safety", text: "Safety in my daily environment is felt, not just assumed intellectually." },
  { id: "L2_PSS_4", layer: 2, subvariable: "perceived_structural_safety", text: "I experience my surroundings as providing adequate protection from chronic threat." },

  { id: "L2_PCO_1", layer: 2, subvariable: "perceived_continuity", text: "My life feels connected across past, present, and anticipated future." },
  { id: "L2_PCO_2", layer: 2, subvariable: "perceived_continuity", text: "Disruptions feel like chapters rather than total narrative breaks." },
  { id: "L2_PCO_3", layer: 2, subvariable: "perceived_continuity", text: "I can see threads of continuity even during periods of significant change." },
  { id: "L2_PCO_4", layer: 2, subvariable: "perceived_continuity", text: "My sense of ongoing selfhood persists through transitions." },
  { id: "L2_PCO_5", layer: 2, subvariable: "perceived_continuity", text: "Future-oriented planning feels grounded in a coherent personal history." },

  { id: "L2_PBE_1", layer: 2, subvariable: "perceived_belonging", text: "I feel I belong somewhere — in a community, relationship, or context." },
  { id: "L2_PBE_2", layer: 2, subvariable: "perceived_belonging", text: "Being myself does not require hiding fundamental aspects of who I am." },
  { id: "L2_PBE_3", layer: 2, subvariable: "perceived_belonging", text: "I am included in social or relational spaces that feel genuinely mine." },
  { id: "L2_PBE_4", layer: 2, subvariable: "perceived_belonging", text: "Belonging in my life is felt as presence, not performance." },

  { id: "L2_PRE_1", layer: 2, subvariable: "perceived_recoverability", text: "I believe I could recover from a significant setback within my current support context." },
  { id: "L2_PRE_2", layer: 2, subvariable: "perceived_recoverability", text: "Recovery feels possible, even when it would be difficult." },
  { id: "L2_PRE_3", layer: 2, subvariable: "perceived_recoverability", text: "My support environment gives me confidence that disruption would not be permanent." },
  { id: "L2_PRE_4", layer: 2, subvariable: "perceived_recoverability", text: "I perceive a pathway back to stability after major stress events." },
  { id: "L2_PRE_5", layer: 2, subvariable: "perceived_recoverability", text: "Past recoveries reinforce my sense that future recovery is structurally supported." },

  // ── LAYER 3: Support Accessibility ──

  { id: "L3_DFR_1", layer: 3, subvariable: "deficit_recognition", text: "I can recognize when my support resources are insufficient for current demands." },
  { id: "L3_DFR_2", layer: 3, subvariable: "deficit_recognition", text: "I notice early signals that my continuity is weakening before crisis points." },
  { id: "L3_DFR_3", layer: 3, subvariable: "deficit_recognition", text: "I can distinguish between temporary strain and structural support gaps." },
  { id: "L3_DFR_4", layer: 3, subvariable: "deficit_recognition", text: "Self-assessment of my support needs is generally accurate rather than distorted." },

  { id: "L3_NEX_1", layer: 3, subvariable: "need_expression", text: "I can articulate what I need from others when support would help." },
  { id: "L3_NEX_2", layer: 3, subvariable: "need_expression", text: "Expressing needs does not feel more costly than carrying them alone." },
  { id: "L3_NEX_3", layer: 3, subvariable: "need_expression", text: "I can communicate support needs in ways others can realistically respond to." },
  { id: "L3_NEX_4", layer: 3, subvariable: "need_expression", text: "Need expression is a skill I can access, not one I have lost entirely." },
  { id: "L3_NEX_5", layer: 3, subvariable: "need_expression", text: "I can name specific support deficits without excessive self-blame or shame." },

  { id: "L3_HSC_1", layer: 3, subvariable: "help_seeking_capacity", text: "I initiate help-seeking before reaching complete depletion." },
  { id: "L3_HSC_2", layer: 3, subvariable: "help_seeking_capacity", text: "I know where to look for appropriate support when needed." },
  { id: "L3_HSC_3", layer: 3, subvariable: "help_seeking_capacity", text: "Barriers to help-seeking are surmountable for me." },
  { id: "L3_HSC_4", layer: 3, subvariable: "help_seeking_capacity", text: "I have successfully sought help in the past and can draw on that experience." },

  { id: "L3_RLA_1", layer: 3, subvariable: "relational_accessibility", text: "People who could support me are reachable when I need them." },
  { id: "L3_RLA_2", layer: 3, subvariable: "relational_accessibility", text: "Geographic, temporal, or communication barriers to support are manageable." },
  { id: "L3_RLA_3", layer: 3, subvariable: "relational_accessibility", text: "Support relationships are accessible without requiring excessive effort to maintain contact." },
  { id: "L3_RLA_4", layer: 3, subvariable: "relational_accessibility", text: "I can enter supportive relational spaces without feeling like an intruder." },
  { id: "L3_RLA_5", layer: 3, subvariable: "relational_accessibility", text: "Institutional or community support channels are navigable for me." },

  { id: "L3_SAC_1", layer: 3, subvariable: "support_acceptance", text: "I can accept help without feeling I must immediately reciprocate or repay." },
  { id: "L3_SAC_2", layer: 3, subvariable: "support_acceptance", text: "Receiving support does not trigger excessive guilt or indebtedness." },
  { id: "L3_SAC_3", layer: 3, subvariable: "support_acceptance", text: "I can allow others to contribute to my wellbeing without losing autonomy." },
  { id: "L3_SAC_4", layer: 3, subvariable: "support_acceptance", text: "Support offered in good faith is generally accepted rather than deflected." },

  { id: "L3_RCC_1", layer: 3, subvariable: "recovery_conversion", text: "Support I receive actually translates into restored functioning." },
  { id: "L3_RCC_2", layer: 3, subvariable: "recovery_conversion", text: "I can integrate external support into internal stability." },
  { id: "L3_RCC_3", layer: 3, subvariable: "recovery_conversion", text: "Temporary relief from support leads to meaningful rather than superficial recovery." },
  { id: "L3_RCC_4", layer: 3, subvariable: "recovery_conversion", text: "I can convert relational or structural support into actionable continuity." },
  { id: "L3_RCC_5", layer: 3, subvariable: "recovery_conversion", text: "Support inputs are not lost to anxiety, mistrust, or inability to utilize them." },

  // ── LAYER 4: Structural Recovery Capacity ──
  // When structures fail, can the system reorganize and recover long-term functioning?

  { id: "L4_RCV_1", layer: 4, subvariable: "recovery_capacity", text: "After periods of instability, I am usually able to gradually rebuild life structure." },
  { id: "L4_RCV_2", layer: 4, subvariable: "recovery_capacity", text: "I can eventually recover continuity even after severe instability." },
  { id: "L4_RCV_3", layer: 4, subvariable: "recovery_capacity", text: "Repeated disruptions have not permanently destroyed my capacity to recover." },

  { id: "L4_CRT_1", layer: 4, subvariable: "continuity_restoration", text: "Even after long periods of disruption, I can eventually reconnect with meaningful goals." },
  { id: "L4_CRT_2", layer: 4, subvariable: "continuity_restoration", text: "Major disruptions rarely leave my life permanently directionless." },
  { id: "L4_CRT_3", layer: 4, subvariable: "continuity_restoration", text: "I usually regain some sense of long-term direction after difficult periods." },

  { id: "L4_ARE_1", layer: 4, subvariable: "action_reengagement", text: "I am generally able to return to action after emotional or structural collapse." },
  { id: "L4_ARE_2", layer: 4, subvariable: "action_reengagement", text: "After interruptions, I can re-engage in purposeful activity without remaining permanently stalled." },
  { id: "L4_ARE_3", layer: 4, subvariable: "action_reengagement", text: "Even after major setbacks, I tend to re-establish functional momentum." },

  { id: "L4_SRO_1", layer: 4, subvariable: "structural_reorganization", text: "When important structures fail, I can slowly reorganize my routines and priorities." },
  { id: "L4_SRO_2", layer: 4, subvariable: "structural_reorganization", text: "After collapse, I can rebuild daily structure rather than remaining indefinitely disorganized." },
  { id: "L4_SRO_3", layer: 4, subvariable: "structural_reorganization", text: "I can adjust my life arrangements when previous structures no longer hold." },
  { id: "L4_SRO_4", layer: 4, subvariable: "structural_reorganization", text: "Disruption forces reorganization, but I can usually reconstruct workable patterns." },

  { id: "L4_FRS_1", layer: 4, subvariable: "functional_resilience", text: "Prolonged pressure may slow me down, but it rarely completely stops my life progression permanently." },
  { id: "L4_FRS_2", layer: 4, subvariable: "functional_resilience", text: "I can restore functional operation after setbacks, even if recovery takes time." },
  { id: "L4_FRS_3", layer: 4, subvariable: "functional_resilience", text: "Functional impairment after stress is usually temporary rather than permanent." },

  { id: "L4_LDR_1", layer: 4, subvariable: "long_term_direction_recovery", text: "After structural breakdown, I can gradually reorient toward future goals." },
  { id: "L4_LDR_2", layer: 4, subvariable: "long_term_direction_recovery", text: "Temporary loss of direction does not typically become a permanent state for me." },
  { id: "L4_LDR_3", layer: 4, subvariable: "long_term_direction_recovery", text: "I can rebuild a workable sense of where my life is heading after major disruption." },

  { id: "L4_RST_1", layer: 4, subvariable: "sustainable_restabilization", text: "I can rebuild sustainable patterns after periods of disorganization." },
  { id: "L4_RST_2", layer: 4, subvariable: "sustainable_restabilization", text: "Long-term functioning can be re-established after repeated instability." },
  { id: "L4_RST_3", layer: 4, subvariable: "sustainable_restabilization", text: "I can return to sustainable rhythms following disruptive periods." },
  { id: "L4_RST_4", layer: 4, subvariable: "sustainable_restabilization", text: "Over extended timeframes, I tend to re-stabilize operationally rather than remain in chronic collapse." },
];

const SSD_SUB_CODES = {
  interpersonal_stability: "interpersonal",
  identity_stability: "identity",
  power_stability: "power",
  material_stability: "material",
  existential_stability: "existential",
  health_stability: "health",
  capability_flexibility: "capability",
  belief_stability: "belief",
  perceived_emotional_support: "emotional_support",
  perceived_structural_safety: "structural_safety",
  perceived_continuity: "continuity",
  perceived_belonging: "belonging",
  perceived_recoverability: "recoverability",
  deficit_recognition: "deficit_recognition",
  need_expression: "need_expression",
  help_seeking_capacity: "help_seeking",
  relational_accessibility: "relational_access",
  support_acceptance: "support_acceptance",
  recovery_conversion: "recovery_conversion",
  recovery_capacity: "recovery_capacity",
  continuity_restoration: "continuity_restoration",
  action_reengagement: "action_reengagement",
  structural_reorganization: "structural_reorganization",
  functional_resilience: "functional_resilience",
  long_term_direction_recovery: "direction_recovery",
  sustainable_restabilization: "restabilization",
};

const SSD_LAYER_CODE_PREFIX = ["", "resource", "perceived", "access", "recovery"];

SSD_ITEMS.forEach((item) => {
  const sub = SSD_SUB_CODES[item.subvariable] || item.subvariable;
  const num = (item.id.match(/_(\d+)$/)?.[1] || "1").padStart(2, "0");
  item.codeBase = `${SSD_LAYER_CODE_PREFIX[item.layer]}_${sub}`;
  item.code = `${item.codeBase}_${num}`;
});
