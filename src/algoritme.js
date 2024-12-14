function getDiagnostic(dades) {
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

export { getDiagnostic };