// Support System Dynamics — four-layer framework taxonomy

const SSD_LAYERS = [
  {
    id: 1,
    key: "resource_existence",
    label: "Resource Existence",
    shortLabel: "Layer 1",
    description:
      "Foundational resources and structural conditions that exist in your life context — whether or not they are currently accessible.",
    subvariables: [
      { key: "interpersonal_stability", label: "Interpersonal Stability" },
      { key: "identity_stability", label: "Identity Stability" },
      { key: "power_stability", label: "Power Stability" },
      { key: "material_stability", label: "Material Stability" },
      { key: "existential_stability", label: "Existential Stability" },
      { key: "health_stability", label: "Health Stability" },
      { key: "capability_flexibility", label: "Capability Flexibility" },
      { key: "belief_stability", label: "Belief Stability" },
    ],
  },
  {
    id: 2,
    key: "perceived_support",
    label: "Perceived Support Structures",
    shortLabel: "Layer 2",
    description:
      "Whether support is psychologically perceived and emotionally available — the felt sense of being held by your environment.",
    subvariables: [
      { key: "perceived_emotional_support", label: "Perceived Emotional Support" },
      { key: "perceived_structural_safety", label: "Perceived Structural Safety" },
      { key: "perceived_continuity", label: "Perceived Continuity" },
      { key: "perceived_belonging", label: "Perceived Belonging" },
      { key: "perceived_recoverability", label: "Perceived Recoverability" },
    ],
  },
  {
    id: 3,
    key: "support_accessibility",
    label: "Support Accessibility",
    shortLabel: "Layer 3",
    description:
      "Whether support can actually be identified, entered, accepted, and transformed into recovery — the bridge between need and use.",
    subvariables: [
      { key: "deficit_recognition", label: "Deficit Recognition" },
      { key: "need_expression", label: "Need Expression" },
      { key: "help_seeking_capacity", label: "Help-Seeking Capacity" },
      { key: "relational_accessibility", label: "Relational Accessibility" },
      { key: "support_acceptance", label: "Support Acceptance" },
      { key: "recovery_conversion", label: "Recovery Conversion Capacity" },
    ],
  },
  {
    id: 4,
    key: "structural_recovery",
    label: "Structural Recovery Capacity",
    shortLabel: "Layer 4",
    description:
      "When support structures become unstable, can the system reorganize continuity and recover long-term functioning — rebuilding structure, direction, and operational momentum after disruption.",
    subvariables: [
      { key: "recovery_capacity", label: "Recovery Capacity" },
      { key: "continuity_restoration", label: "Continuity Restoration" },
      { key: "action_reengagement", label: "Action Re-engagement" },
      { key: "structural_reorganization", label: "Structural Reorganization" },
      { key: "functional_resilience", label: "Functional Resilience" },
      { key: "long_term_direction_recovery", label: "Long-Term Direction Recovery" },
      { key: "sustainable_restabilization", label: "Sustainable Re-stabilization" },
    ],
  },
];

const SSD_FRAMEWORK_STEPS = [
  { label: "Contexts", description: "Life structure, stressors, and available resources" },
  { label: "Resource Existence", description: "Foundational stability across life domains" },
  { label: "Perceived Support Structures", description: "Felt availability of emotional and structural support" },
  { label: "Support Accessibility", description: "Capacity to identify, request, and use support" },
  { label: "Structural Recovery Capacity", description: "Reorganization and functional recovery after structural disruption" },
];
