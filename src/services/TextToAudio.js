import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_REACT_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true});

async function convertTextToAudio(msg) {
  try {
    const voice = localStorage.getItem("voice") ? localStorage.getItem("voice") : 'alloy';
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice,
      input: msg,
    });
  
    const arrayBuffer = await mp3.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    return uint8Array;
  } catch (error) {
    console.error("Error converting text to audio:", error);
    throw error; 
  }
}

export default convertTextToAudio;