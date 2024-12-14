function getDiagnostic(Pacient){

    if (Pacient.enfermetat == "FPI"){
        return getDiagnosticFPI(Pacient);
    }
    else if (Pacient.enfermetat == "AR"){
        return getDiagnosticAR(Pacient);
    }
    else if (Pacient.enfermetat == "Sarcoidosi"){
        return getDiagnosticSAR(Pacient);
    }

}


function getDiagnosticFPI(Pacient) {

    var diagnostic = "";
    var dadesPacient = Pacient.dadesPacient;

    // [1] Presència de febre
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic += "Diagnòstic: Exacerbació aguda de FPI amb sospita d'infecció. Recomanat tractament antibiòtic empíric.\n";
        return diagnostic;
    }

    // [2] Ofeg i/o tos
    if (dadesPacient.ofeg) {
        diagnostic += "Diagnòstic: Exacerbació aguda de FPI:\n";
        if (dadesPacient.IncrementMucositatIFebre) {
            diagnostic += "- Sospita d'infecció pulmonar. Recomanat tractament amb antibiòtics i suport respiratori.\n";
        } else if (dadesPacient.DolorToracic) {
            diagnostic += "- Avaluar embolisme pulmonar o pneumotòrax. Sol·licitar TC amb contrast o radiografia de tòrax.\n";
        } else if (dadesPacient.Xiulets) {
            diagnostic += "- Indicatiu d'obstrucció bronquial. Evitar broncodilatadors en pacients amb FPI.\n";
        }
    }

    // [3] Signes d'alarma
    if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic += "Signes d'alarma: Febre alta o desaturació. Oxigenoteràpia immediata i proves urgents (gasometria arterial, radiografia de tòrax).\n";
    }
    if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic += "Signes d'alarma: Cianosi i ofeg en repòs. Emergència mèdica: iniciar ventilació mecànica si és necessari.\n";
    }
    if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic += "Signes d'alarma: Increment de respiracions (>19 RPM). Considerar ventilació no invasiva (VNI).\n";
    }

    // [4] Factors pronòstics i complicacions
    if (dadesPacient.DLCO !== null && dadesPacient.DLCO < 40) {
        diagnostic += "DLCO baixa (<40%): Alt risc de mortalitat. Necessari seguiment intensiu.\n";
    }
    if (dadesPacient.FVC !== null && dadesPacient.FVC < 50) {
        diagnostic += "FVC reduïda (<50%): Malaltia en fase avançada.\n";
    }
    if (dadesPacient.desaturacioPM6M) {
        diagnostic += "Desaturació significativa durant la prova de marxa de 6 minuts: Alta probabilitat de complicacions greus.\n";
    }
    if (dadesPacient.hipertensioPulmonar) {
        diagnostic += "Presència de hipertensió pulmonar. Requereix tractament específic.\n";
    }
    if (dadesPacient.enfisema) {
        diagnostic += "Presència d'emfisema. Possible síndrome combinat (FPI i enfisema).\n";
    }
    if (dadesPacient.refluxGastroesofagic) {
        diagnostic += "Risc afegit: Tractar el reflux gastroesofàgic per prevenir microaspiracions.\n";
    }
    if (dadesPacient.apneaSon) {
        diagnostic += "Risc afegit: Detectades apnees del son. Recomanat tractament amb CPAP.\n";
    }
    if (dadesPacient.carcinomaBroncogenic) {
        diagnostic += "Complicació: Presència de carcinoma broncogènic. Prioritzar tractament oncològic.\n";
    }

    // [5] Edat del pacient
    if (dadesPacient.edat !== null && dadesPacient.edat > 70) {
        diagnostic += "Pacient d'edat avançada. Adaptar el tractament segons la fragilitat.\n";
    }

    // [6] Medicació i malalties prèvies
    if (dadesPacient.malaltiesPrevis) {
        diagnostic += "Es consideraran antecedents de FPI en l'avaluació.\n";
    }
    if (dadesPacient.altresCroniques) {
        diagnostic += "Tenir en compte malalties cròniques associades (ex. hipertensió pulmonar, diabetis).\n";
    }
    if (dadesPacient.medicacioHabit.antifibrotics) {
        diagnostic += "Monitoritzar l'eficàcia i adherència del tractament antifibròtic.\n";
    }
    if (dadesPacient.medicacioHabit.immunosupressors) {
        diagnostic += "Avaluar risc d'infecció oportunista a causa de la immunosupressió.\n";
    }
    if (dadesPacient.medicacioHabit.oxigenoterapia) {
        diagnostic += "Ajustar oxigenoteràpia segons les necessitats actuals.\n";
    }

    return diagnostic || "No s'han detectat condicions específiques. Controlar i monitoritzar.";
}
function getDiagnosticAR(Pacient) {
    var diagnostic = "";
    var dadesPacient = Pacient.dadesPacient;

    // [1] Presència de febre
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic += "Diagnòstic: Sospita d'infecció associada a Artritis Reumatoide (AR). Recomanat tractament antibiòtic empíric.\n";
        return diagnostic;
    }

    // [2] Ofeg i/o tos
    if (dadesPacient.ofeg) {
        diagnostic += "Diagnòstic: Afectació pulmonar relacionada amb AR:\n";
        if (dadesPacient.IncrementMucositatIFebre) {
            diagnostic += "- Sospita d'infecció pulmonar. Recomanat tractament antibiòtic i suport respiratori.\n";
        } else if (dadesPacient.DolorToracic) {
            diagnostic += "- Possible pleuritis o fibrosi pulmonar intersticial. Sol·licitar TCAR i proves funcionals pulmonars.\n";
        } else if (dadesPacient.Xiulets) {
            diagnostic += "- Indicatiu d'obstrucció bronquial. Pot suggerir bronquièctasis secundàries.\n";
        }
    }

    // [3] Signes d'alarma
    if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic += "Signes d'alarma: Febre alta o desaturació. Oxigenoteràpia immediata i proves urgents (gasometria arterial, TCAR).\n";
    }
    if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic += "Signes d'alarma: Cianosi i ofeg en repòs. Emergència mèdica: iniciar ventilació mecànica si és necessari.\n";
    }
    if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic += "Signes d'alarma: Increment de respiracions (>19 RPM). Considerar ventilació no invasiva (VNI).\n";
    }

    // [4] Factors pronòstics i complicacions en AR
    if (dadesPacient.DLCO !== null && dadesPacient.DLCO < 40) {
        diagnostic += "DLCO baixa (<40%): Indica afectació intersticial greu. Requereix tractament específic.\n";
    }
    if (dadesPacient.FVC !== null && dadesPacient.FVC < 50) {
        diagnostic += "FVC reduïda (<50%): Malaltia pulmonar intersticial avançada.\n";
    }
    if (dadesPacient.desaturacioPM6M) {
        diagnostic += "Desaturació durant la prova de marxa de 6 minuts: Alta probabilitat de complicacions greus.\n";
    }
    if (dadesPacient.refluxGastroesofagic) {
        diagnostic += "Risc afegit: Tractar el reflux gastroesofàgic per prevenir microaspiracions.\n";
    }
    if (dadesPacient.apneaSon) {
        diagnostic += "Risc afegit: Apnees del son detectades. Recomanat tractament amb CPAP.\n";
    }

    // [5] Edat del pacient
    if (dadesPacient.edat !== null && dadesPacient.edat > 70) {
        diagnostic += "Pacient d'edat avançada. Adaptar el tractament segons la fragilitat.\n";
    }

    // [6] Medicació i malalties prèvies en AR
    if (dadesPacient.malaltiesPrevis) {
        diagnostic += "Es consideraran antecedents de malaltia reumatoide i afectació pulmonar en l'avaluació.\n";
    }
    if (dadesPacient.altresCroniques) {
        diagnostic += "Tenir en compte malalties cròniques associades (ex. hipertensió pulmonar, diabetis).\n";
    }
    if (dadesPacient.medicacioHabit.immunosupressors) {
        diagnostic += "Avaluar risc d'infecció oportunista a causa de la immunosupressió.\n";
    }
    if (dadesPacient.medicacioHabit.oxigenoterapia) {
        diagnostic += "Ajustar oxigenoteràpia segons les necessitats actuals.\n";
    }

    return diagnostic || "No s'han detectat condicions específiques. Controlar i monitoritzar.";
}
function getDiagnosticSAR(Pacient){
    var diagnostic = "";
    var dadesPacient = Pacient.dadesPacient;

    // [1] Presència de febre
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic += "Diagnòstic: Sarcoïdosi amb exacerbació sistèmica. Possible infecció superposada. Recomanat tractament antibiòtic i control dels símptomes.\n";
        return diagnostic;
    }

    // [2] Ofeg i/o tos
    if (dadesPacient.ofeg) {
        diagnostic += "Diagnòstic: Afectació pulmonar per Sarcoïdosi:\n";
        if (dadesPacient.IncrementMucositatIFebre) {
            diagnostic += "- Possible infecció pulmonar associada. Recomanat tractament antibiòtic empíric.\n";
        } else if (dadesPacient.DolorToracic) {
            diagnostic += "- Sospita de linfoadenopatia o afectació pulmonar avançada. Sol·licitar TCAR.\n";
        } else if (dadesPacient.Xiulets) {
            diagnostic += "- Indicatiu d'obstrucció bronquial. Pot ser conseqüència de granulomes bronquials.\n";
        }
    }

    // [3] Signes d'alarma
    if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic += "Signes d'alarma: Febre alta o desaturació. Oxigenoteràpia immediata i proves urgents (gasometria arterial, TCAR).\n";
    }
    if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic += "Signes d'alarma: Ofeg en repòs o cianosi. Emergència mèdica: derivació urgent per a suport respiratori.\n";
    }
    if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic += "Signes d'alarma: Increment de respiracions (>19 RPM). Considerar ventilació no invasiva (VNI).\n";
    }

    // [4] Factors pronòstics i complicacions en Sarcoïdosi
    if (dadesPacient.DLCO !== null && dadesPacient.DLCO < 50) {
        diagnostic += "DLCO moderada/baixa (<50%): Afectació intersticial significativa. Requereix tractament immunosupressor.\n";
    }
    if (dadesPacient.FVC !== null && dadesPacient.FVC < 60) {
        diagnostic += "FVC reduïda (<60%): Indicatiu de progressió de la malaltia pulmonar.\n";
    }
    if (dadesPacient.refluxGastroesofagic) {
        diagnostic += "Risc afegit: Tractar el reflux gastroesofàgic per prevenir complicacions pulmonars.\n";
    }
    if (dadesPacient.apneaSon) {
        diagnostic += "Risc afegit: Apnees del son detectades. Recomanat CPAP.\n";
    }

    // [5] Edat del pacient
    if (dadesPacient.edat !== null && dadesPacient.edat > 70) {
        diagnostic += "Pacient d'edat avançada. Adaptar el tractament segons la fragilitat.\n";
    }

    // [6] Medicació i malalties prèvies en Sarcoïdosi
    if (dadesPacient.malaltiesPrevis) {
        diagnostic += "Es consideraran antecedents de Sarcoïdosi en l'avaluació.\n";
    }
    if (dadesPacient.altresCroniques) {
        diagnostic += "Tenir en compte malalties cròniques associades (ex. hipertensió pulmonar, diabetis).\n";
    }
    if (dadesPacient.medicacioHabit.immunosupressors) {
        diagnostic += "Continuar tractament immunosupressor per controlar la inflamació granulomatosa.\n";
    }
    if (dadesPacient.medicacioHabit.oxigenoterapia) {
        diagnostic += "Ajustar oxigenoteràpia segons les necessitats actuals.\n";
    }

    return diagnostic || "No s'han detectat condicions específiques. Controlar i monitoritzar.";
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
