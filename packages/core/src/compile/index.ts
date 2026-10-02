// `@hermes-hq/hodios-core/compile`: adapters and rendering. No schema validator here, so it loads fast
// (the CLI's search/show/use/install never pay for ajv).
export * from './types.js';
export {
  conditional,
  fillLowering,
  placeholder,
  placeholderLowering,
  renderTemplate,
  type Lowering,
} from './render.js';
export {
  CONTENT_LICENSE,
  entryText,
  exportName,
  findSection,
  inputsBlock,
  removeSection,
  sectionBlock,
  sectionEnd,
  sectionStart,
  sourceUrl,
  upsertSection,
  workflowText,
} from './text.js';
export { claudeSkill, codexSkillYaml, specSkill, userOnly } from './adapters/skill.js';
export { PASTE_MAX, pasteText } from './adapters/paste.js';
export {
  HERMES_BUNDLE_VERSION,
  hermesBundle,
  hermesItem,
  type HermesBundle,
  type HermesBundleItem,
} from './adapters/hermes.js';
export { MARKETPLACE_NAME, claudeMarketplace, claudePluginFiles, pluginName, type PluginGroup } from './plugin.js';
export {
  ADAPTERS,
  INSTALL_TARGETS,
  TARGETS,
  adapterById,
  compileFor,
  installPath,
  pickAdapter,
  targetById,
  type CompileResult,
  type CompiledFile,
  type Scope,
  type Target,
} from './targets.js';
