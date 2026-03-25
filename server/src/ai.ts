import type { Item } from './types.ts';

type ComparableItem = {
  title: string;
  price: number;
  params: Record<string, unknown>;
};

const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'llama3';

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function getComparableItems(
  items: Item[],
  target: {
    itemId?: number;
    category: Item['category'];
    title: string;
    params: Record<string, unknown>;
  },
  limit = 8,
): ComparableItem[] {
  const targetTokens = new Set(tokenize(target.title));

  const scored = items
    .filter(
      item =>
        item.category === target.category &&
        item.id !== target.itemId &&
        item.price !== null,
    )
    .map(item => {
      const itemTokens = tokenize(item.title);
      const overlap = itemTokens.filter(token => targetTokens.has(token)).length;

      const paramMatches = Object.entries(target.params).reduce(
        (acc, [key, value]) => {
          if (value === undefined || value === null || value === '') return acc;
          return item.params[key as keyof typeof item.params] === value ? acc + 1 : acc;
        },
        0,
      );

      return {
        score: overlap * 2 + paramMatches * 3,
        item,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => ({
      title: item.title,
      price: item.price as number,
      params: item.params as Record<string, unknown>,
    }));

  return scored;
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
  }
  return sorted[mid];
}

async function callOllama(prompt: string): Promise<string> {
  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      prompt,
      options: {
        temperature: 0.3,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed with status ${response.status}`);
  }

  const data = (await response.json()) as { response?: string };
  if (!data.response) {
    throw new Error('Ollama returned empty response');
  }

  return data.response.trim();
}

function buildPriceFallback(category: string, title: string, basePrice: number | null): string {
  if (!basePrice) {
    return `Для объявления "${title}" в категории "${category}" не хватает данных по похожим ценам. Добавьте больше характеристик и попробуйте снова.`;
  }

  const lowMin = Math.round(basePrice * 0.85);
  const lowMax = Math.round(basePrice * 0.95);
  const midMin = Math.round(basePrice * 0.95);
  const midMax = Math.round(basePrice * 1.08);
  const highMin = Math.round(basePrice * 1.08);

  return [
    `Ориентир по цене для "${title}":`,
    `${lowMin.toLocaleString('ru-RU')} - ${lowMax.toLocaleString('ru-RU')} ₽ — срочная продажа или есть нюансы.`,
    `${midMin.toLocaleString('ru-RU')} - ${midMax.toLocaleString('ru-RU')} ₽ — рыночный диапазон для хорошего состояния.`,
    `От ${highMin.toLocaleString('ru-RU')} ₽ — отличная комплектация и состояние выше среднего.`,
  ].join('\n');
}

function buildDescriptionFallback(
  title: string,
  category: string,
  params: Record<string, unknown>,
): string {
  const paramsText = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(', ');

  return [
    `${title} в категории "${category}". Объявление актуально, состояние хорошее, использовалось аккуратно.`,
    paramsText
      ? `Основные характеристики: ${paramsText}.`
      : 'Подробные характеристики можно уточнить в личных сообщениях.',
    'Готов ответить на вопросы, предоставить дополнительные фото и обсудить условия сделки.',
  ].join(' ');
}

export async function generatePriceSuggestion(input: {
  items: Item[];
  itemId?: number;
  category: Item['category'];
  title: string;
  description?: string;
  price?: number | null;
  params?: Record<string, unknown>;
}): Promise<{ answer: string; suggestedPrice: number | null; comparableCount: number }> {
  const params = input.params ?? {};
  const comparableItems = getComparableItems(input.items, {
    itemId: input.itemId,
    category: input.category,
    title: input.title,
    params,
  });

  const prices = comparableItems.map(item => item.price);
  const basePrice = median(prices) ?? input.price ?? null;

  const comparableText =
    comparableItems.length > 0
      ? comparableItems
          .map(
            (item, index) =>
              `${index + 1}. ${item.title} — ${item.price.toLocaleString('ru-RU')} ₽`,
          )
          .join('\n')
      : 'Похожие объявления не найдены';

  const prompt = `
Ты помощник продавца. На основе данных объявления и похожих предложений составь краткий анализ цены на русском языке.
Соблюдай структуру:
1) Короткая строка с товаром.
2) 3 диапазона цен с пояснениями.
3) Короткая рекомендация по текущей цене.

Объявление:
- Категория: ${input.category}
- Название: ${input.title}
- Текущая цена: ${input.price ?? 'не указана'}
- Описание: ${input.description ?? 'нет'}

Похожие объявления:
${comparableText}
`.trim();

  try {
    const answer = await callOllama(prompt);
    return {
      answer,
      suggestedPrice: basePrice,
      comparableCount: comparableItems.length,
    };
  } catch {
    return {
      answer: buildPriceFallback(input.category, input.title, basePrice),
      suggestedPrice: basePrice,
      comparableCount: comparableItems.length,
    };
  }
}

export async function generateDescriptionSuggestion(input: {
  category: Item['category'];
  title: string;
  description?: string;
  price?: number | null;
  params?: Record<string, unknown>;
}): Promise<{ answer: string; description: string }> {
  const params = input.params ?? {};
  const paramsText = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `- ${key}: ${String(value)}`)
    .join('\n');

  const prompt = `
Ты опытный копирайтер маркетплейса. Сгенерируй подробное продающее описание объявления на русском языке.
Требования:
- 3-4 предложения;
- без выдуманных технических данных;
- подчеркни состояние и выгоды;
- нейтральный, убедительный тон.

Данные:
- Категория: ${input.category}
- Название: ${input.title}
- Цена: ${input.price ?? 'не указана'}
- Текущее описание: ${input.description ?? 'нет'}
- Характеристики:
${paramsText || '- нет'}
`.trim();

  try {
    const description = await callOllama(prompt);
    return {
      answer: description,
      description,
    };
  } catch {
    const fallback = buildDescriptionFallback(input.title, input.category, params);
    return {
      answer: fallback,
      description: fallback,
    };
  }
}
