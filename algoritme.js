
var dadesPacient = {
    PresenciaDeFebre: false,
    ofeg: false,
    IncrementMucositatICongestioNasalDolorDeGola: false,
    IncrementMucositatIFebre: false,
    DolorToracic: false,
    Xiulets: false,

    SignesAlarmaPresents: {
        FebreAltaODesaturacio: false,
        IncrementDeRespiracions: false, // representa que aquest valor és true quan >=19 respiracions per minut
        OfegEnReposOCianosi: false
    },

    malaltiesPrevis: false,
    altresCròniques: false,

    medicacioHabit: {
        antifibrotics: false,
        immunosupressors: false,
        oxigenoterapia: false
    },

    habitsToxics: {
        consumTabac: false,
        exposicioFum: false
    },

    antacadents: false,
    edat: 0, // Valor inicial per a edat
    DLCO: 0, // Difusió del monòxid de carboni (%)
    FVC: 0,  // Capacitat vital forçada (%)
    desaturacioPM6M: false, // Desaturació a la prova de marxa de 6 minuts
    hipertensioPulmonar: false,
    enfisema: false,
    refluxGastroesofagic: false,
    apneaSon: false,
    carcinomaBroncogenic: false
};



function diagnosticF(dades) {
    var diagnostic = "";

    // **Diagnòstic principal basat en els símptomes**
    if (dades.PresenciaDeFebre) {
        diagnostic = "Realitzar analítica bàsica (hemograma, PCR). Sol·licitar cultius (sang i esput) si sospita d’infecció. Tomografia (TCAR) per descartar pneumònia/inflamació aguda.";
    } else if (dades.IncrementMucositatICongestioNasalDolorDeGola) {
        diagnostic = "Sospita d’infecció respiratòria alta (viral o bacteriana). Tractament: hidratació, mucolítics, i antibiòtics si hi ha sospita bacteriana. Si no hi ha resposta, considerar TCAR i/o broncoscòpia.";
    } else if (dades.IncrementMucositatIFebre) {
        diagnostic = "Sospita d’infecció pulmonar. Iniciar antibiòtics empírics (segons protocols locals). Proves complementàries: hemocultius, gasometria arterial i radiografia/TCAR.";
    } else if (dades.DolorToracic) {
        diagnostic = "Avaluar possibles causes: Embolisme pulmonar: Sol·licitar D-dímer i TC amb contrast. Exacerbació de fibrosi pulmonar: Confirmar amb TCAR i proves funcionals.";
    } else if (dades.Xiulets) {
        diagnostic = "Indicatiu d’obstrucció bronquial o asma superposada. Tractament: broncodilatadors, excepte en MPID fibròtica sense sibilants (evitar).";
    }

    // **Avaluació dels signes d'alarma**
    if (dades.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic += " Oxigenoteràpia immediata. Proves urgents: gasometria arterial, radiografia de tòrax/TCAR.";
    }
    if (dades.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic += " Tractament urgent per estabilitzar respiració. Considerar ventilació no invasiva (VNI) en casos severs.";
    }
    if (dades.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic += " Emergència mèdica: inici immediat d’oxigenoteràpia. Derivació urgent a UCI si no hi ha millora ràpida.";
    }

    // **Factors pronòstics**
    if (dades.DLCO < 40) {
        diagnostic += " DLCO baix (<40%). Alt risc de mortalitat. Tractament intensiu necessari.";
    }
    if (dades.FVC < 50) {
        diagnostic += " FVC reduïda (<50%). Progressió avançada de la malaltia.";
    }
    if (dades.desaturacioPM6M) {
        diagnostic += " Desaturació significativa durant la prova de marxa de 6 minuts. Alta probabilitat de complicacions.";
    }

    // **Complicacions i comorbiditats**
    if (dades.hipertensioPulmonar) {
        diagnostic += " Presència de hipertensió pulmonar. Ajustar tractament segons recomanacions específiques.";
    }
    if (dades.enfisema) {
        diagnostic += " Enfisema detectat. Major risc de hipertensió pulmonar precoç.";
    }
    if (dades.refluxGastroesofagic) {
        diagnostic += " Tractar reflux gastroesofàgic per prevenir microaspiracions.";
    }
    if (dades.apneaSon) {
        diagnostic += " Apnees del son. Indicar tractament amb CPAP si és necessari.";
    }
    if (dades.carcinomaBroncogenic) {
        diagnostic += " Carcinoma broncogènic detectat. Prioritzar tractament oncològic.";
    }

    // **Avaluació de l'edat**
    if (dades.edat > 70) {
        diagnostic += " Pacient d'edat avançada. Adaptar tractament segons fragilitat.";
    }

    return diagnostic;
}

// Exemple d'ús amb dades d'un pacient
var diagnostic = diagnosticF(dadesPacient);