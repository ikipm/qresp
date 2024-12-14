function getDiagnostic(dadesPacient) {
    var diagnostic = "";


    let diagnostic = "";

    // [1] Presència de febre
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic += "Diagnòstic: Sospita d'infecció. Recomanat tractament antibiòtic.\n";
        return diagnostic;
    }

    // [2] Ofeg i/o tos
    if (dadesPacient.ofeg) {
        if (dadesPacient.IncrementMucositatIFebre) {
            diagnostic += "Diagnòstic: Sospita d'infecció pulmonar. Tractament empíric amb antibiòtics.\n";
        } else if (dadesPacient.DolorToracic) {
            diagnostic += "Diagnòstic: Avaluar embolisme pulmonar o exacerbació de fibrosi pulmonar.\n";
        } else if (dadesPacient.Xiulets) {
            diagnostic += "Diagnòstic: Indicatiu d'obstrucció bronquial o asma superposada. Tractament amb broncodilatadors.\n";
        }
        return diagnostic;
    }

    // [3] Signes d'alarma
    if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic += "Signes d'alarma: Presència de febre alta o desaturació. Oxigenoteràpia immediata i proves urgents.\n";
    }
    if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic += "Signes d'alarma: Cianosi i ofeg en repòs. Emergència mèdica: inici d'oxigenoteràpia i derivació urgent a UCI.\n";
    }
    if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic += "Signes d'alarma: Increment de respiracions. Tractament urgent amb ventilació no invasiva (VNI).\n";
    }

    // [4] Factors pronòstics i complicacions
    if (dadesPacient.DLCO !== null && dadesPacient.DLCO < 40) {
        diagnostic += "DLCO baixa (<40%): Alt risc de mortalitat. Necessari seguiment intensiu.\n";
    }
    if (dadesPacient.FVC !== null && dadesPacient.FVC < 50) {
        diagnostic += "FVC reduïda (<50%): Malaltia avançada. Necessari ajustar tractament.\n";
    }
    if (dadesPacient.desaturacioPM6M) {
        diagnostic += "Desaturació significativa durant la prova de marxa de 6 minuts: Alta probabilitat de complicacions.\n";
    }
    if (dadesPacient.hipertensioPulmonar) {
        diagnostic += "Presència de hipertensió pulmonar. Requereix tractament específic.\n";
    }
    if (dadesPacient.enfisema) {
        diagnostic += "Enfisema detectat. Augment del risc de complicacions cardiorespiratòries.\n";
    }
    if (dadesPacient.refluxGastroesofagic) {
        diagnostic += "Tractar el reflux gastroesofàgic per reduir microaspiracions.\n";
    }
    if (dadesPacient.apneaSon) {
        diagnostic += "Apnees del son. Indicar CPAP si cal.\n";
    }
    if (dadesPacient.carcinomaBroncogenic) {
        diagnostic += "Presència de carcinoma broncogènic. Prioritzar tractament oncològic.\n";
    }

    // [5] Edat del pacient
    if (dadesPacient.edat !== null && dadesPacient.edat > 70) {
        diagnostic += "Pacient d'edat avançada. Adaptar el tractament segons la fragilitat.\n";
    }

    // [6] Medicació i malalties prèvies
    if (dadesPacient.malaltiesPrevis) {
        diagnostic += "Es consideraran antecedents de malalties pulmonars en l'avaluació.\n";
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


export { getDiagnostic };