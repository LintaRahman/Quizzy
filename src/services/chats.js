import OpenAI from 'openai';
import jsPDF from 'jspdf';

const database = []
const parameters = JSON.parse(localStorage.getItem("formData"));
const interviewQNo = localStorage.getItem("interviewType");
const hardQuestions = [
  "Tell me about yourself.",
  "What are your strengths and weaknesses?",
  "Why do you want to work for this company?",
  "Where do you see yourself in five years?",
  "Can you describe a challenging situation you faced at work and how you handled it?",
  "What motivates you?",
  "How do you handle stress and pressure?",
  "Describe a successful project you've worked on.",
  "Why should we hire you?",
  "What do you know about our company?",
  "How do you handle conflict in the workplace?",
  "Can you give an example of when you demonstrated leadership skills?",
  "What is your preferred work style?",
  "How do you stay up-to-date with industry trends?",
  "Tell me about a time when you had to meet a tight deadline.",
  "What do you consider your greatest professional achievement?"
];

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_REACT_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true});

export async function sendMsgToOpenAI(message) {
  loadMessages();
  database.push({"role" : "user", "content": message});

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: database,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  
  const botMsg = res.choices[0].message.content
  database.push({"role": "assistant", "content": botMsg});

  return botMsg;
}

export async function requestFeedback() {
  loadMessages();
  const message ='The interview ends now, so do not ask any further questions. You can give feedback to the user questions and how they answered them. Highlight any questions the user could improve on and provide some sample answers to the questions that they could have improved on.';
  database.push({"role" : "system", "content": message});

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: database,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  
  const botMsg = res.choices[0].message.content;
  database.push({"role": "assistant", "content": botMsg});
  localStorage.setItem("feedback", botMsg);
  console.log(botMsg);

  return botMsg;
}

async function loadMessages() {
  if (database.length === 0){
      const { name, student, years_of_experience, job, job_description } = parameters;
      // const interviewtype = !interviewType ? 'competency based interview' : interviewType;
      const typeOfQ = interviewQNo == 0 ? '' : `and ${interviewQNo} of hard questions from ${hardQuestions}`;

      const interviewPrompt = `
      "You are Quizzy, an AI interviewer created by Linta Rahman, a Computer Science student at UCL. 
      You are interviewing ${name} who is a ${student ? 'student' : 'working professional'} with ${years_of_experience} 
      years of experience. 
      The candidate is applying for the job title ${job}, and they provided the following job description: ${job_description}. 
      As Quizzy, your role is to ask relevant questions ${typeOfQ} to assess the candidate's suitability for the ${job} position. 
      Ask questions related to their experience, skills, and how they handle specific scenarios. 
      Feel free to inquire about their achievements, challenges faced, and how they approach problem-solving.
      Provide detailed feedback about the user response before asking the next question.
      Begin the interview by greeting the candidate and proceed with your question. Do the interview in English
      Remember to maintain a professional and friendly tone throughout the conversation."`;

      database.push({
          "role": "system",
          "content": interviewPrompt
      });

      database.push({
        "role": "assistant",
        "content": `Hi! I'm Quizzy. How are you doing today?`
    });
  }
  // return database;
}

export function downloadTranscript() {
  loadMessages();
  const maxLineWidth = 180;
  const pdfDoc = new jsPDF();

  const transcript = database.slice(1);
  let lines = 0;
  // Loop through the JSON object and add each "role" and "content" pair to the PDF
  transcript.forEach((chat, index) => {
    if (lines >= 20) {
      pdfDoc.addPage();
      lines = 0; // Reset lines count for the new page
      page += 1;
    }
    // Adjust the vertical position for each entry
    pdfDoc.setFontSize(12);
    // const yPos = 40 + index * 20; 
    const yPos = 40 + lines * 20; 
   
    // pdfDoc.setFont('bold');
    // Add each line to the PDF
    let role;
      if (chat.role === 'assistant') {
        role = 'Quizzy';
    } else if (chat.role === 'user') {
        role = parameters.name? parameters.name : 'User'; 
      }

    // let lines = 0
    // pdfDoc.text(`${role}`, 30, yPos + line * -20);
    pdfDoc.text(`${role}`, 30, yPos + lines * 10);

     // Split the content into multiple lines if it exceeds the maximum width
     const contentLines = pdfDoc.splitTextToSize(chat.content, maxLineWidth);
    //  lines += contentLines.length;
    contentLines.forEach((line, lineIndex) => {
        pdfDoc.setFontSize(10);
        // pdfDoc.setFont('normal');
        lines += 1;
        pdfDoc.text(`${line}`, 30, yPos + lines * 10 + (lineIndex + 1));
        
        // lines = lineIndex + 2;
      });
  });
  
  // Save the PDF to a file
  const pdfFileName = 'Transcript.pdf';
  pdfDoc.save(pdfFileName);
}

