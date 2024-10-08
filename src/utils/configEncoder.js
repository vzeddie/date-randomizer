import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

const categoryMap = {
  'Romantic': 'R',
  'Adventure': 'A',
  'Relaxing': 'X',
  'Movie/TV Show': 'M',
  'Culture': 'C',
  'Random': 'N',
  'Food': 'F',
  'Music': 'U',
  'Shopping': 'S'
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

export const encodeSeed = (seed) => {
  return compressToEncodedURIComponent(seed);
};

export const decodeSeed = (encodedSeed) => {
  try {
    return decompressFromEncodedURIComponent(encodedSeed);
  } catch (error) {
    console.error('Failed to decode seed:', error);
    return '';
  }
};