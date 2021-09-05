import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const w = width;
export const h = height;
export const SPACING = 12;

export const RADIUS = 12;

export const WIDTH_BANNER = w * 0.9;
export const HEIGHT_BANNER = WIDTH_BANNER * 0.45;
