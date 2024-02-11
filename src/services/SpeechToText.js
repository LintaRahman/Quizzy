
import FormData from "form-data";
import axios from 'axios';
import OpenAI from "openai";

const OpenAIAPIKey = import.meta.env.VITE_REACT_OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_REACT_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true});
// const parameters = JSON.parse(localStorage.getItem("formData"));
// const findLangKey = ({language}) => {
//   const lowercasedLanguageName = language;
//   // Check if the provided language name exists in the dictionary
//   if (lowercasedLanguageName in languages) {
//     setLanguageCode(languageDict[lowercasedLanguageName]);
//   } else {
//     setLanguageCode('en');
//   }
// }

const convertSpeechToText = async (blobURL) => {
    try {
        // Fetch the Blob from the Blob URL
        const responseFromFetch = await fetch(blobURL);
        const blob = await responseFromFetch.blob();

        // const transcription = await openai.audio.transcriptions.create(
        //   {
        //     model: "whisper-1", 
        //     file: blob,
        //     type: 'audio.webm',
        //     response_format:"text", 
        //     language: 'en',
        //   }
        // )

        // console.log("NewTRanscript", transcription);

        let data = new FormData();
        data.append("file", blob, "audio.webm");
        data.append("model", "whisper-1");
        // data.append(parameters.language, key );

        data.append('English', 'en');

        // Set up the axios request configuration
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api.openai.com/v1/audio/transcriptions",
          headers: {
            Authorization: `Bearer ${OpenAIAPIKey}`,
            "Content-Type": "multipart/form-data",
            ...data.getHeaders ? data.getHeaders() : {},
          },
          data: data,
        };
    
        // Make the request and return the response data
        const responseFromAxios = await axios.request(config);
        
        return { data: responseFromAxios.data };
      } catch (error) {
        console.error("Error during transcription:", error);
        return {};
      }
};


export default convertSpeechToText;
