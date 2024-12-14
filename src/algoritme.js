function getDiagnostic(dadesPacient) {
    var diagnostic = "";


    // [1] Presència de febre
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic = "Diagnòstic: Sospita d'infecció. Recomanat tractament antibiòtic.";
        return diagnostic;
    }

    // [2] Ofeg i/o tos
    if (dadesPacient.ofeg) {
        if (dadesPacient.IncrementMucositatIFebre) {
            diagnostic = "Diagnòstic: Sospita d'infecció pulmonar. Tractament empíric amb antibiòtics.";
        } else if (dadesPacient.DolorToracic) {
            diagnostic = "Diagnòstic: Avaluar embolisme pulmonar o exacerbació de fibrosi pulmonar.";
        } else if (dadesPacient.Xiulets) {
            diagnostic = "Diagnòstic: Indicatiu d'obstrucció bronquial o asma superposada. Tractament amb broncodilatadors.";
        }
        return diagnostic;
    }

    // [3] Signes d'alarma
    if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic = "Signes d'alarma: Presència de febre alta o desaturació. Oxigenoteràpia immediata i proves urgents.";
    } else if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic = "Signes d'alarma: Cianosi i ofeg en repòs. Emergència mèdica: inici d'oxigenoteràpia i derivació urgent a UCI.";
    } else if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic = "Signes d'alarma: Increment de respiracions. Tractament urgent amb ventilació no invasiva (VNI).";
    }

    // [4] Factors pronòstics i complicacions
    if (dadesPacient.DLCO !== null && dadesPacient.DLCO < 40) {
        diagnostic += " DLCO baixa (<40%): Alt risc de mortalitat. Necessari seguiment intensiu.";
    }
    if (dadesPacient.FVC !== null && dadesPacient.FVC < 50) {
        diagnostic += " FVC reduïda (<50%): Malaltia avançada. Necessari ajustar tractament.";
    }
    if (dadesPacient.desaturacioPM6M) {
        diagnostic += " Desaturació significativa durant la prova de marxa de 6 minuts: Alta probabilitat de complicacions.";
    }
    if (dadesPacient.hipertensioPulmonar) {
        diagnostic += " Presència de hipertensió pulmonar. Requereix tractament específic.";
    }
    if (dadesPacient.enfisema) {
        diagnostic += " Enfisema detectat. Augment del risc de complicacions cardiorespiratòries.";
    }
    if (dadesPacient.refluxGastroesofagic) {
        diagnostic += " Tractar el reflux gastroesofàgic per reduir microaspiracions.";
    }
    if (dadesPacient.apneaSon) {
        diagnostic += " Apnees del son. Indicar CPAP si cal.";
    }
    if (dadesPacient.carcinomaBroncogenic) {
        diagnostic += " Presència de carcinoma broncogènic. Prioritzar tractament oncològic.";
    }

    // [5] Edat del pacient
    if (dadesPacient.edat !== null && dadesPacient.edat > 70) {
        diagnostic += " Pacient d'edat avançada. Adaptar el tractament segons la fragilitat.";
    }

    return diagnostic || "No s'han detectat condicions específiques. Controlar i monitoritzar.";
}


export { getDiagnostic };