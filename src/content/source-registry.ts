import sourceRegistryData from '@/content/source-registry.json';

export type SourceUseMode = 'scope_only' | 'topic_scope_only' | 'learning_design_only';

export type SourceRegistryEntry = {
  id: string;
  publisher: string;
  authority_type: string;
  url: string;
  accessed_on: string;
  supports: string[];
  does_not_support: string[];
  use_mode: SourceUseMode;
};

type SourceRegistry = {
  schema_version: string;
  purpose: string;
  sources: SourceRegistryEntry[];
};

export const sourceRegistry = sourceRegistryData as SourceRegistry;

export function sourceRegistryEntriesFor(ids: readonly string[]) {
  const requested = new Set(ids);
  return sourceRegistry.sources.filter((source) => requested.has(source.id));
}
