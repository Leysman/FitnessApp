import '@testing-library/jest-dom';


// Полифилл для react-router в среде JSDOM/Jest
import { TextEncoder, TextDecoder } from 'node:util';
// или: import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;