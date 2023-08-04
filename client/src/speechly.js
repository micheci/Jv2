import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';

const appId = 'cc1e19f7-871a-4a97-a71a-51f3f14fdd10'; // Replace this with your Speechly App ID

export const speechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
