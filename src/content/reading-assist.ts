import readingAssistData from '@/content/reading-assist.json';

type ReadingAssistItem = {
  source_line: string;
  reading_assist: string;
};

type ReadingAssistContent = {
  schema_version: string;
  status: 'reference_draft_language_review_required';
  purpose: string;
  items: ReadingAssistItem[];
};

const readingAssist = readingAssistData as ReadingAssistContent;
const assistBySourceLine = new Map(readingAssist.items.map((item) => [item.source_line, item.reading_assist]));

export const readingAssistStatus = readingAssist.status;
export const readingAssistPurpose = readingAssist.purpose;

export function getReadingAssist(sourceLine: string) {
  return assistBySourceLine.get(sourceLine);
}
