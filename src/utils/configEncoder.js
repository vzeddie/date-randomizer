import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

const categoryMap = {
  'Romantic': 'R',
  'Adventure': 'A',
  'Relaxing': 'X'
};

const reverseCategoryMap = Object.fromEntries(
  Object.entries(categoryMap).map(([key, value]) => [value, key])
);

export const encodeConfig = (dates) => {
  const compactDates = dates.map(({ category, name }) => [
    categoryMap[category] || category,
    name
  ]);
  return compressToEncodedURIComponent(JSON.stringify(compactDates));
};

export const decodeConfig = (encodedConfig) => {
  try {
    const decodedString = decompressFromEncodedURIComponent(encodedConfig);
    const compactDates = JSON.parse(decodedString);
    return compactDates.map(([category, name], index) => ({
      id: index + 1,
      category: reverseCategoryMap[category] || category,
      name
    }));
  } catch (error) {
    console.error('Failed to decode config:', error);
    return [];
  }
};