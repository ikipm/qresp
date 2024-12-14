
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
        diagnostic = "Realitzar analítica bàsica (hemograma, PCR).\nSol·licitar cultius (sang i esput) si sospita d’infecció.\nTomografia (TCAR) per descartar pneumònia/inflamació aguda.";
    } else if (dades.IncrementMucositatICongestioNasalDolorDeGola) {
        diagnostic = "Sospita d’infecció respiratòria alta (viral o bacteriana).\nTractament: hidratació, mucolítics, i antibiòtics si hi ha sospita bacteriana.\nSi no hi ha resposta, considerar TCAR i/o broncoscòpia.";
    } else if (dades.IncrementMucositatIFebre) {
        diagnostic = "Sospita d’infecció pulmonar.\nIniciar antibiòtics empírics (segons protocols locals).\nProves complementàries: hemocultius, gasometria arterial i radiografia/TCAR.";
    } else if (dades.DolorToracic) {
        diagnostic = "Avaluar possibles causes: Embolisme pulmonar: Sol·licitar D-dímer i TC amb contrast.\nExacerbació de fibrosi pulmonar: Confirmar amb TCAR i proves funcionals.";
    } else if (dades.Xiulets) {
        diagnostic = "Indicatiu d’obstrucció bronquial o asma superposada.\nTractament: broncodilatadors, excepte en MPID fibròtica sense sibilants (evitar).";
    }

    // **Avaluació dels signes d'alarma**
    if (dades.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic += "\nOxigenoteràpia immediata. Proves urgents:\ngasometria arterial,\nradiografia de tòrax/TCAR.";
    }
    if (dades.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic += "\nTractament urgent per estabilitzar respiració. Considerar ventilació no invasiva (VNI) en casos severs.";
    }
    if (dades.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic += "\nEmergència mèdica: inici immediat d’oxigenoteràpia. Derivació urgent a UCI si no hi ha millora ràpida.";
    }

    // **Factors pronòstics**
    if (dades.DLCO < 40) {
        diagnostic += "\nDLCO baix (<40%). Alt risc de mortalitat. Tractament intensiu necessari.";
    }
    if (dades.FVC < 50) {
        diagnostic += "\nFVC reduïda (<50%). Progressió avançada de la malaltia.";
    }
    if (dades.desaturacioPM6M) {
        diagnostic += "\nDesaturació significativa durant la prova de marxa de 6 minuts. Alta probabilitat de complicacions.";
    }

    // **Complicacions i comorbiditats**
    if (dades.hipertensioPulmonar) {
        diagnostic += "\nPresència de hipertensió pulmonar. Ajustar tractament segons recomanacions específiques.";
    }
    if (dades.enfisema) {
        diagnostic += "\nEnfisema detectat. Major risc de hipertensió pulmonar precoç.";
    }
    if (dades.refluxGastroesofagic) {
        diagnostic += "\nTractar reflux gastroesofàgic per prevenir microaspiracions.";
    }
    if (dades.apneaSon) {
        diagnostic += "\nApnees del son. Indicar tractament amb CPAP si és necessari.";
    }
    if (dades.carcinomaBroncogenic) {
        diagnostic += "\nCarcinoma broncogènic detectat. Prioritzar tractament oncològic.";
    }

    // **Avaluació de l'edat**
    if (dades.edat > 70) {
        diagnostic += "\nPacient d'edat avançada. Adaptar tractament segons fragilitat.";
    }

    return diagnostic;
}


// Exemple d'ús amb dades d'un pacient
var diagnostic = diagnosticF(dadesPacient);