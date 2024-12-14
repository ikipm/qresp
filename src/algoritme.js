import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config({ path: "../claus.env" }); // Ajusta el camí si el fitxer està a l'arrel

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Utilitza la clau d'entorn
});
const openai = new OpenAIApi(configuration);

function getDiagnostic(dadesPacient) {
    var diagnostic = "";

    // **Diagnòstic principal basat en els símptomes**
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic = "Realitzar analítica bàsica (hemograma, PCR).\nSol·licitar cultius (sang i esput) si sospita d'infecció.\nTomografia (TCAR) per descartar pneumònia/inflamació aguda.";
    } else if (dadesPacient.IncrementMucositatICongestioNasalDolorDeGola) {
        diagnostic = "Sospita d'infecció respiratòria alta (viral o bacteriana).\nTractament: hidratació, mucolítics, i antibiòtics si hi ha sospita bacteriana.\nSi no hi ha resposta, considerar TCAR i/o broncoscòpia.";
    } else if (dadesPacient.IncrementMucositatIFebre) {
        diagnostic = "Sospita d'infecció pulmonar.\nIniciar antibiòtics empírics (segons protocols locals).\nProves complementàries: hemocultius, gasometria arterial i radiografia/TCAR.";
    } else if (dadesPacient.DolorToracic) {
        diagnostic = "Avaluar possibles causes: Embolisme pulmonar: Sol·licitar D-dímer i TC amb contrast.\nExacerbació de fibrosi pulmonar: Confirmar amb TCAR i proves funcionals.";
    } else if (dadesPacient.Xiulets) {
        diagnostic = "Indicatiu d'obstrucció bronquial o asma superposada.\nTractament: broncodilatadors, excepte en MPID fibròtica sense sibilants (evitar).";
    }

    // **Avaluació dels signes d'alarma**
    if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic += "\nOxigenoteràpia immediata. Proves urgents:\ngasometria arterial,\nradiografia de tòrax/TCAR.";
    }
    if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic += "\nTractament urgent per estabilitzar respiració. Considerar ventilació no invasiva (VNI) en casos severs.";
    }
    if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic += "\nEmergència mèdica: inici immediat d'oxigenoteràpia. Derivació urgent a UCI si no hi ha millora ràpida.";
    }

    // **Factors pronòstics**
    if (dadesPacient.DLCO < 40) {
        diagnostic += "\nDLCO baix (<40%). Alt risc de mortalitat. Tractament intensiu necessari.";
    }
    if (dadesPacient.FVC < 50) {
        diagnostic += "\nFVC reduïda (<50%). Progressió avançada de la malaltia.";
    }
    if (dadesPacient.desaturacioPM6M) {
        diagnostic += "\nDesaturació significativa durant la prova de marxa de 6 minuts. Alta probabilitat de complicacions.";
    }

    // **Complicacions i comorbiditats**
    if (dadesPacient.hipertensioPulmonar) {
        diagnostic += "\nPresència de hipertensió pulmonar. Ajustar tractament segons recomanacions específiques.";
    }
    if (dadesPacient.enfisema) {
        diagnostic += "\nEnfisema detectat. Major risc de hipertensió pulmonar precoç.";
    }
    if (dadesPacient.refluxGastroesofagic) {
        diagnostic += "\nTractar reflux gastroesofàgic per prevenir microaspiracions.";
    }
    if (dadesPacient.apneaSon) {
        diagnostic += "\nApnees del son. Indicar tractament amb CPAP si és necessari.";
    }
    if (dadesPacient.carcinomaBroncogenic) {
        diagnostic += "\nCarcinoma broncogènic detectat. Prioritzar tractament oncològic.";
    }

    // **Avaluació de l'edat**
    if (dadesPacient.edat > 70) {
        diagnostic += "\nPacient d'edat avançada. Adaptar tractament segons fragilitat.";
    }

    return diagnostic;
}

async function generarPromptIA(pacient) {
    // Construeix el prompt basat en les dades del pacient
    const prompt = `
Dades del pacient:
Nom: ${pacient.name} ${pacient.cognom1} ${pacient.cognom2 || ''}
Edat: ${pacient.edat || 'No especificada'}

Història clínica:
- Presència de febre: ${pacient.dadesPacient.PresenciaDeFebre ? 'Sí' : 'No'}
- Ofeg: ${pacient.dadesPacient.ofeg ? 'Sí' : 'No'}
- Increment de mucositat i congestió nasal o dolor de gola: ${pacient.dadesPacient.IncrementMucositatICongestioNasalDolorDeGola ? 'Sí' : 'No'}
- Increment de mucositat i febre: ${pacient.dadesPacient.IncrementMucositatIFebre ? 'Sí' : 'No'}
- Dolor toràcic: ${pacient.dadesPacient.DolorToracic ? 'Sí' : 'No'}
- Xiulets: ${pacient.dadesPacient.Xiulets ? 'Sí' : 'No'}

Signes d'alarma:
- Febre alta o desaturació: ${pacient.dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio ? 'Sí' : 'No'}
- Increment de respiracions: ${pacient.dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions ? 'Sí' : 'No'}
- Ofeg en repòs o cianosi: ${pacient.dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi ? 'Sí' : 'No'}

Altres factors:
- Malalties prèvies: ${pacient.dadesPacient.malaltiesPrevis ? 'Sí' : 'No'}
- Altres cròniques: ${pacient.dadesPacient.altresCroniques ? 'Sí' : 'No'}
- Consum de tabac: ${pacient.dadesPacient.habitsToxics.consumTabac ? 'Sí' : 'No'}
- DLCO (%): ${pacient.dadesPacient.DLCO || 'No especificat'}
- FVC (%): ${pacient.dadesPacient.FVC || 'No especificat'}

Proporciona una anàlisi clínica general i possibles recomanacions per aquest pacient, tenint en compte els símptomes, signes d'alarma i factors associats.
    `;

    try {
        // Enviar la consulta a la API d'OpenAI
        const completion = await openai.createChatCompletion({
            model: 'gpt-4', // Pots utilitzar 'gpt-3.5-turbo' si és preferible
            messages: [
                { role: 'system', content: 'Ets un assistent mèdic expert.' },
                { role: 'user', content: prompt }
            ],
        });

        // Retorna la resposta generada
        return completion.data.choices[0].message.content;
    } catch (error) {
        console.error('Error en contactar amb la API de ChatGPT:', error.response?.data || error.message);
        throw new Error('No s’ha pogut obtenir una resposta de ChatGPT.');
    }
}

export { getDiagnostic, generarPromptIA};