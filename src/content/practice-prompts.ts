export type PracticePrompt = {
  bundleId: string;
  instruction: string;
  cue: string;
  acceptedAnswers: string[];
  support: string;
  evidenceTarget: 'E1' | 'E2' | 'E3' | 'E4';
};

export const practicePrompts: Record<string, PracticePrompt> = {
  'D03-S02': {
    bundleId: 'D03-S02',
    instruction: 'Type the line you would say. Punctuation and letter case do not affect the check.',
    cue: 'Ask where platform five is.',
    acceptedAnswers: ['Где платформа номер пять?'],
    support: 'Где + destination?',
    evidenceTarget: 'E2',
  },
  'D03-S03': {
    bundleId: 'D03-S03',
    instruction: 'Write the two movements in English or Russian.',
    cue: 'Прямо, потом направо.',
    acceptedAnswers: ['straight then right', 'straight ahead then right', 'прямо потом направо'],
    support: 'потом = then',
    evidenceTarget: 'E1',
  },
  'D01-S04': {
    bundleId: 'D01-S04',
    instruction: 'Type a polite request for repetition.',
    cue: 'The reply is too fast.',
    acceptedAnswers: ['Повторите пожалуйста', 'Повторите, пожалуйста.'],
    support: 'Повторите… + polite marker',
    evidenceTarget: 'E4',
  },
};

export function normalizeAnswer(value: string) {
  return value
    .normalize('NFC')
    .toLocaleLowerCase('ru-RU')
    .replace(/[.,!?;:—–-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function answerMatches(prompt: PracticePrompt, answer: string) {
  const normalized = normalizeAnswer(answer);
  return prompt.acceptedAnswers.some((accepted) => normalizeAnswer(accepted) === normalized);
}
