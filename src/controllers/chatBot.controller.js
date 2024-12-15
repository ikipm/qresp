import { response } from "express";
import { getPacientById } from "../pacient_db.js";
import Groq from "groq-sdk";

const sendPrompt = async (req, res) => {
  const userInput = req.body.chatBot;
  const pacient = getPacientById(req.params.id);
  const prompt = `
  Ets un metge amb molta experiència en malalties respiratòries. Has rebut la següent informació d'un pacient que ha arribat a la teva consulta:
Dades del pacient:
Nom: ${pacient.name} ${pacient.cognom1} ${pacient.cognom2 || ""}
Edat: ${pacient.edat || "No especificada"}

Història clínica:
- Presència de febre: ${pacient.dadesPacient.PresenciaDeFebre ? "Sí" : "No"}
- Ofeg: ${pacient.dadesPacient.ofeg ? "Sí" : "No"}
- Increment de mucositat i congestió nasal o dolor de gola: ${
    pacient.dadesPacient.IncrementMucositatICongestioNasalDolorDeGola
      ? "Sí"
      : "No"
  }
- Increment de mucositat i febre: ${
    pacient.dadesPacient.IncrementMucositatIFebre ? "Sí" : "No"
  }
- Dolor toràcic: ${pacient.dadesPacient.DolorToracic ? "Sí" : "No"}
- Xiulets: ${pacient.dadesPacient.Xiulets ? "Sí" : "No"}

Signes d'alarma:
- Febre alta o desaturació: ${
    pacient.dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio
      ? "Sí"
      : "No"
  }
- Increment de respiracions: ${
    pacient.dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions
      ? "Sí"
      : "No"
  }
- Ofeg en repòs o cianosi: ${
    pacient.dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi ? "Sí" : "No"
  }

Altres factors:
- Malalties prèvies: ${pacient.dadesPacient.malaltiesPrevis ? "Sí" : "No"}
- Altres cròniques: ${pacient.dadesPacient.altresCroniques ? "Sí" : "No"}
- Consum de tabac: ${
    pacient.dadesPacient.habitsToxics.consumTabac ? "Sí" : "No"
  }
- DLCO (%): ${pacient.dadesPacient.DLCO || "No especificat"}
- FVC (%): ${pacient.dadesPacient.FVC || "No especificat"}

A més, el pacient ha indicat que ${userInput}.

Proporciona una anàlisi clínica general i possibles recomanacions per aquest pacient, tenint en compte els símptomes, signes d'alarma, factors associats i les indicacions del pacient.
    `;

  try {
    const groq = new Groq({ apiKey: "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" });

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });
    res.render("chatBot", { response: response.choices[0]?.message?.content });
  } catch (error) {
    console.error(error);
    res.render("chatBot", { response: "Error generating response." });
  }
};

const renderChatBot = (req, res) => {
  const patient = getPacientById(req.params.id);
  res.render("chatBot", { patient, response: "" });
};

export { renderChatBot, sendPrompt };
