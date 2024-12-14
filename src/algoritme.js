function getDiagnostic(Pacient){

    if (Pacient.enfermetat == "FPI"){
        return getDiagnosticFPI(Pacient);
    }
    else if (Pacient.enfermetat == "NHf"){
        return getDiagnosticNHf(Pacient);
    }
    else if (Pacient.enfermetat == "EPID-EAS"){
        return getDiagnosticEPIDEAS(Pacient);
    }
    else if (Pacient.enfermetat == "Fibrosis no classificable"){
        return getDiagnosticFNC(Pacient);
    }
    else if (Pacient.enfermetat == "Sarcoidosi"){
        return getDiagnosticSAR(Pacient);
    }
    else return getDiagnosticEXTRA(Pacient);

}
function getDiagnosticFPI(Pacient) {

    var diagnostic = [];
    var dadesPacient = Pacient.dadesPacient;

    // [1] Presència de febre
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic.push ("Diagnòstic: Exacerbació aguda de FPI amb sospita d'infecció. Recomanat tractament antibiòtic empíric.\n\n");
    }

    // [2] Ofeg i/o tos
    if (dadesPacient.ofeg) {
        diagnostic.push("Diagnòstic: Exacerbació aguda de FPI:\n\n");
        if (dadesPacient.IncrementMucositatIFebre) {
            diagnostic.push("- Sospita d'infecció pulmonar. Recomanat tractament amb antibiòtics i suport respiratori.\n\n");
        } else if (dadesPacient.DolorToracic) {
            diagnostic.push("- Avaluar embolisme pulmonar o pneumotòrax. Sol·licitar TC amb contrast o radiografia de tòrax.\n\n");
        } else if (dadesPacient.Xiulets) {
            diagnostic.push("- Indicatiu d'obstrucció bronquial. Evitar broncodilatadors en pacients amb FPI.\n\n");
        }
    }

    // [3] Signes d'alarma
    if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic.push( "Signes d'alarma: Febre alta o desaturació. Oxigenoteràpia immediata i proves urgents (gasometria arterial, radiografia de tòrax).\n\n");
    }
    if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic.push( "Signes d'alarma: Cianosi i ofeg en repòs. Emergència mèdica: iniciar ventilació mecànica si és necessari.\n\n");
    }
    if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic.push( "Signes d'alarma: Increment de respiracions (>19 RPM). Considerar ventilació no invasiva (VNI).\n\n");
    }

    // [4] Factors pronòstics i complicacions
    if (dadesPacient.DLCO !== null && dadesPacient.DLCO < 40) {
        diagnostic.push( "DLCO baixa (<40%): Alt risc de mortalitat. Necessari seguiment intensiu.\n\n");
    }
    if (dadesPacient.FVC !== null && dadesPacient.FVC < 50) {
        diagnostic.push( "FVC reduïda (<50%): Malaltia en fase avançada.\n\n");
    }
    if (dadesPacient.desaturacioPM6M) {
        diagnostic.push( "Desaturació significativa durant la prova de marxa de 6 minuts: Alta probabilitat de complicacions greus.\n\n");
    }
    if (dadesPacient.hipertensioPulmonar) {
        diagnostic.push( "Presència de hipertensió pulmonar. Requereix tractament específic.\n\n");
    }
    if (dadesPacient.enfisema) {
        diagnostic.push( "Presència d'emfisema. Possible síndrome combinat (FPI i enfisema).\n\n");
    }
    if (dadesPacient.refluxGastroesofagic) {
        diagnostic.push( "Risc afegit: Tractar el reflux gastroesofàgic per prevenir microaspiracions.\n\n");
    }
    if (dadesPacient.apneaSon) {
        diagnostic.push( "Risc afegit: Detectades apnees del son. Recomanat tractament amb CPAP.\n\n");
    }
    if (dadesPacient.carcinomaBroncogenic) {
        diagnostic.push( "Complicació: Presència de carcinoma broncogènic. Prioritzar tractament oncològic.\n\n");
    }

    // [5] Edat del pacient
    if (dadesPacient.edat !== null && dadesPacient.edat > 70) {
        diagnostic.push( "Pacient d'edat avançada. Adaptar el tractament segons la fragilitat.\n\n");
    }

    // [6] Medicació i malalties prèvies
    if (dadesPacient.malaltiesPrevis) {
        diagnostic.push( "Es consideraran antecedents de FPI en l'avaluació.\n\n");
    }
    if (dadesPacient.altresCroniques) {
        diagnostic.push( "Tenir en compte malalties cròniques associades (ex. hipertensió pulmonar, diabetis).\n\n");
    }
    if (dadesPacient.medicacioHabit.antifibrotics) {
        diagnostic.push( "Monitoritzar l'eficàcia i adherència del tractament antifibròtic.\n\n");
    }
    if (dadesPacient.medicacioHabit.immunosupressors) {
        diagnostic.push( "Avaluar risc d'infecció oportunista a causa de la immunosupressió.\n\n");
    }
    if (dadesPacient.medicacioHabit.oxigenoterapia) {
        diagnostic.push( "Ajustar oxigenoteràpia segons les necessitats actuals.\n\n");
    }

    return diagnostic || "No s'han detectat condicions específiques. Controlar i monitoritzar.";
}
function getDiagnosticNHf(Pacient) {

    var diagnostic = [];
    var dadesPacient = Pacient.dadesPacient;
    
    // [1] Presència de febre
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic.push("Diagnòstic: Exacerbació de Neumonitis per Hipersensibilitat (NH) amb sospita d'infecció superposada. Recomanat tractament antibiòtic empíric.\n\n");
    }
    
    // [2] Ofeg i/o tos
    if (dadesPacient.ofeg) {
        diagnostic.push("Diagnòstic: Afectació pulmonar per Neumonitis per Hipersensibilitat:\n\n");
        if (dadesPacient.IncrementMucositatIFebre) {
            diagnostic.push("- Possible infecció pulmonar associada. Recomanat tractament amb antibiòtics i suport respiratori.\n\n");
        } else if (dadesPacient.DolorToracic) {
            diagnostic.push("- Avaluar fibrosi avançada o exacerbació aguda. Sol·licitar TCAR per detectar canvis en el patró fibròtic.\n\n");
        } else if (dadesPacient.Xiulets) {
            diagnostic.push("- Indicatiu d'obstrucció bronquial o inflamació severa. Evitar broncodilatadors si hi ha fibrosi avançada.\n\n");
        }
    }
    
    // [3] Signes d'alarma
    if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic.push("Signes d'alarma: Febre alta o desaturació. Oxigenoteràpia immediata i proves urgents (gasometria arterial, TCAR).\n\n");
    }
    if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic.push("Signes d'alarma: Ofeg en repòs o cianosi. Emergència mèdica: derivació urgent per a suport respiratori.\n\n");
    }
    if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic.push("Signes d'alarma: Increment de respiracions (>19 RPM). Considerar ventilació no invasiva (VNI).\n\n");
    }
    
    // [4] Factors pronòstics i complicacions en NH fibròtica
    if (dadesPacient.DLCO !== null && dadesPacient.DLCO < 40) {
        diagnostic.push("DLCO baixa (<40%): Alta probabilitat de fibrosi pulmonar avançada. Requereix seguiment intensiu.\n\n");
    }
    if (dadesPacient.FVC !== null && dadesPacient.FVC < 50) {
        diagnostic.push("FVC reduïda (<50%): Progressió avançada de la fibrosi pulmonar.\n\n");
    }
    if (dadesPacient.desaturacioPM6M) {
        diagnostic.push("Desaturació durant la prova de marxa de 6 minuts: Alta probabilitat de complicacions greus.\n\n");
    }
    if (dadesPacient.refluxGastroesofagic) {
        diagnostic.push("Risc afegit: Tractar el reflux gastroesofàgic per prevenir microaspiracions.\n\n");
    }
    if (dadesPacient.habitsToxics.ExposicioFum) {
        diagnostic.push("Risc afegit: Evitar exposicions a tòxics o pols orgànics per prevenir exacerbacions.\n\n");
    }
    
    // [5] Edat del pacient
    if (dadesPacient.edat !== null && dadesPacient.edat > 70) {
        diagnostic.push("Pacient d'edat avançada. Adaptar el tractament segons la fragilitat.\n\n");
    }
    
    // [6] Exposició ambiental o laboral
    if (dadesPacient.malaltiesPrevis) {
        diagnostic.push("Es consideraran antecedents d'exposició ambiental o laboral (fongs, pols d'aus, etc.) per ajustar el tractament.\n\n");
    }
    
    // [7] Medicació i malalties prèvies en NH fibròtica
    if (dadesPacient.malaltiesPrevis) {
        diagnostic.push("Es consideraran antecedents de Neumonitis per Hipersensibilitat en l'avaluació.\n\n");
    }
    if (dadesPacient.medicacioHabit.immunosupressors) {
        diagnostic.push("Continuar tractament immunosupressor si està indicat per controlar la inflamació.\n\n");
    }
    if (dadesPacient.medicacioHabit.oxigenoterapia) {
        diagnostic.push("Ajustar oxigenoteràpia segons les necessitats actuals.\n\n");
    }
    return diagnostic || "No s'han detectat condicions específiques. Controlar i monitoritzar.";
}
function getDiagnosticEPIDEAS(Pacient){
    var diagnostic = [];
    var dadesPacient = Pacient.dadesPacient;
    
    // [1] Presència de febre
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic.push("Diagnòstic: Exacerbació aguda de Fibrosi Pulmonar associada a malaltia autoimmune. Possible infecció superposada. Recomanat tractament antibiòtic empíric.\n\n");
    }
    
    // [2] Ofeg i/o tos
    if (dadesPacient.ofeg) {
        diagnostic.push("Diagnòstic: Afectació pulmonar associada a malaltia autoimmune:\n\n");
        if (dadesPacient.IncrementMucositatIFebre) {
            diagnostic.push("- Possible infecció pulmonar associada. Recomanat tractament amb antibiòtics i suport respiratori.\n\n");
        } else if (dadesPacient.DolorToracic) {
            diagnostic.push("- Avaluar embolisme pulmonar o pneumotòrax secundari a fibrosi avançada. Sol·licitar TCAR.\n\n");
        } else if (dadesPacient.Xiulets) {
            diagnostic.push("- Indicatiu d'obstrucció bronquial o bronquièctasis associades. Evitar broncodilatadors si hi ha fibrosi significativa.\n\n");
        }
    }
    
    // [3] Signes d'alarma
    if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic.push("Signes d'alarma: Febre alta o desaturació. Oxigenoteràpia immediata i proves urgents (gasometria arterial, TCAR).\n\n");
    }
    if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic.push("Signes d'alarma: Ofeg en repòs o cianosi. Emergència mèdica: derivació urgent per a suport respiratori.\n\n");
    }
    if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic.push("Signes d'alarma: Increment de respiracions (>19 RPM). Considerar ventilació no invasiva (VNI).\n\n");
    }
    
    // [4] Factors pronòstics i complicacions en EPID-EAS
    if (dadesPacient.DLCO !== null && dadesPacient.DLCO < 40) {
        diagnostic.push("DLCO baixa (<40%): Afectació pulmonar significativa associada a malaltia autoimmune. Requereix seguiment intensiu.\n\n");
    }
    if (dadesPacient.FVC !== null && dadesPacient.FVC < 50) {
        diagnostic.push("FVC reduïda (<50%): Progressió avançada de la fibrosi pulmonar.\n\n");
    }
    if (dadesPacient.desaturacioPM6M) {
        diagnostic.push("Desaturació durant la prova de marxa de 6 minuts: Alta probabilitat de complicacions greus.\n\n");
    }
    if (dadesPacient.refluxGastroesofagic) {
        diagnostic.push("Risc afegit: Tractar el reflux gastroesofàgic per prevenir microaspiracions.\n\n");
    }
    if (dadesPacient.habitsToxics.ConsumTabac || dadesPacient.habitsToxics.ExposicioFum) {
        diagnostic.push("Risc afegit: Evitar exposicions a tòxics o fumar per prevenir exacerbacions.\n\n");
    }
    
    // [5] Edat del pacient
    if (dadesPacient.edat !== null && dadesPacient.edat > 70) {
        diagnostic.push("Pacient d'edat avançada. Adaptar el tractament segons la fragilitat.\n\n");
    }
    
    // [6] Relació amb malalties autoimmunes
    if (dadesPacient.MalaltiesPrevis) {
        diagnostic.push("Es consideraran antecedents de malaltia autoimmune (ex. esclerosi sistèmica, artritis reumatoide) en l'avaluació.\n\n");
    }
    
    // [7] Medicació i malalties prèvies en EPID-EAS
    if (dadesPacient.medicacioHabit.immunosupressors) {
        diagnostic.push("Continuar tractament immunosupressor si està indicat per controlar l'activitat autoimmune.\n\n");
    }
    if (dadesPacient.medicacioHabit.antifibrotics) {
        diagnostic.push("Monitoritzar l'eficàcia i adherència al tractament antifibròtic.\n\n");
    }
    if (dadesPacient.medicacioHabit.oxigenoterapia) {
        diagnostic.push("Ajustar oxigenoteràpia segons les necessitats actuals.\n\n");
    }
    return diagnostic || "No s'han detectat condicions específiques. Controlar i monitoritzar.";
}
function getDiagnosticFNC(Pacient){
    var diagnostic = [];
    var dadesPacient = Pacient.dadesPacient;
    
    // [1] Presència de febre
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic.push("Diagnòstic: Exacerbació aguda de Fibrosi Pulmonar No Classificable amb possible infecció. Recomanat tractament antibiòtic empíric.\n\n");
    }
    
    // [2] Ofeg i/o tos
    if (dadesPacient.ofeg) {
        diagnostic.push("Diagnòstic: Afectació pulmonar per Fibrosi No Classificable:\n\n");
        if (dadesPacient.IncrementMucositatIFebre) {
            diagnostic.push("- Possible infecció pulmonar associada. Recomanat tractament antibiòtic i suport respiratori.\n\n");
        } else if (dadesPacient.DolorToracic) {
            diagnostic.push("- Avaluar embolisme pulmonar o pneumotòrax. Sol·licitar TCAR i proves funcionals pulmonars.\n\n");
        } else if (dadesPacient.Xiulets) {
            diagnostic.push("- Indicatiu d'obstrucció bronquial. Evitar broncodilatadors si hi ha fibrosi significativa.\n\n");
        }
    }
    
    // [3] Signes d'alarma
    if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic.push("Signes d'alarma: Febre alta o desaturació. Oxigenoteràpia immediata i proves urgents (gasometria arterial, TCAR).\n\n");
    }
    if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic.push("Signes d'alarma: Ofeg en repòs o cianosi. Emergència mèdica: derivació urgent per a suport respiratori.\n\n");
    }
    if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic.push("Signes d'alarma: Increment de respiracions (>19 RPM). Considerar ventilació no invasiva (VNI).\n\n");
    }
    
    // [4] Factors pronòstics i complicacions en Fibrosi No Classificable
    if (dadesPacient.DLCO !== null && dadesPacient.DLCO < 40) {
        diagnostic.push("DLCO baixa (<40%): Afectació pulmonar greu. Requereix seguiment intensiu.\n\n");
    }
    if (dadesPacient.FVC !== null && dadesPacient.FVC < 50) {
        diagnostic.push("FVC reduïda (<50%): Progressió avançada de la fibrosi pulmonar.\n\n");
    }
    if (dadesPacient.desaturacioPM6M) {
        diagnostic.push("Desaturació durant la prova de marxa de 6 minuts: Alta probabilitat de complicacions greus.\n\n");
    }
    if (dadesPacient.refluxGastroesofagic) {
        diagnostic.push("Risc afegit: Tractar el reflux gastroesofàgic per prevenir microaspiracions.\n\n");
    }
    if (dadesPacient.habitsToxics.ConsumTabac || dadesPacient.habitsToxics.ExposicioFum) {
        diagnostic.push("Risc afegit: Evitar exposicions a tòxics o fumar per prevenir exacerbacions.\n\n");
    }
    
    // [5] Edat del pacient
    if (dadesPacient.edat !== null && dadesPacient.edat > 70) {
        diagnostic.push("Pacient d'edat avançada. Adaptar el tractament segons la fragilitat.\n\n");
    }
    
    // [6] Tractament i seguiment
    if (dadesPacient.medicacioHabit.antifibrotics) {
        diagnostic.push("Monitoritzar l'eficàcia i adherència al tractament antifibròtic.\n\n");
    }
    if (dadesPacient.medicacioHabit.oxigenoterapia) {
        diagnostic.push("Ajustar oxigenoteràpia segons les necessitats actuals.\n\n");
    }
    

    return diagnostic || "No s'han detectat condicions específiques. Controlar i monitoritzar.";
}
function getDiagnosticSAR(Pacient){

    var diagnostic = [];
    var dadesPacient = Pacient.dadesPacient;
    
    // [1] Presència de febre
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic.push("Diagnòstic: Sarcoïdosi amb exacerbació sistèmica. Possible infecció superposada. Recomanat tractament antibiòtic i control dels símptomes.\n\n");
    }
    
    // [2] Ofeg i/o tos
    if (dadesPacient.ofeg) {
        diagnostic.push("Diagnòstic: Afectació pulmonar per Sarcoïdosi:\n\n");
        if (dadesPacient.IncrementMucositatIFebre) {
            diagnostic.push("- Possible infecció pulmonar associada. Recomanat tractament antibiòtic empíric.\n\n");
        } else if (dadesPacient.DolorToracic) {
            diagnostic.push("- Sospita de linfoadenopatia o afectació pulmonar avançada. Sol·licitar TCAR.\n\n");
        } else if (dadesPacient.Xiulets) {
            diagnostic.push("- Indicatiu d'obstrucció bronquial. Pot ser conseqüència de granulomes bronquials.\n\n");
        }
    }
    
    // [3] Signes d'alarma
    if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic.push("Signes d'alarma: Febre alta o desaturació. Oxigenoteràpia immediata i proves urgents (gasometria arterial, TCAR).\n\n");
    }
    if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic.push("Signes d'alarma: Ofeg en repòs o cianosi. Emergència mèdica: derivació urgent per a suport respiratori.\n\n");
    }
    if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic.push("Signes d'alarma: Increment de respiracions (>19 RPM). Considerar ventilació no invasiva (VNI).\n\n");
    }
    
    // [4] Factors pronòstics i complicacions en Sarcoïdosi
    if (dadesPacient.DLCO !== null && dadesPacient.DLCO < 50) {
        diagnostic.push("DLCO moderada/baixa (<50%): Afectació intersticial significativa. Requereix tractament immunosupressor.\n\n");
    }
    if (dadesPacient.FVC !== null && dadesPacient.FVC < 60) {
        diagnostic.push("FVC reduïda (<60%): Indicatiu de progressió de la malaltia pulmonar.\n\n");
    }
    if (dadesPacient.refluxGastroesofagic) {
        diagnostic.push("Risc afegit: Tractar el reflux gastroesofàgic per prevenir complicacions pulmonars.\n\n");
    }
    if (dadesPacient.apneaSon) {
        diagnostic.push("Risc afegit: Apnees del son detectades. Recomanat CPAP.\n\n");
    }
    
    // [5] Edat del pacient
    if (dadesPacient.edat !== null && dadesPacient.edat > 70) {
        diagnostic.push("Pacient d'edat avançada. Adaptar el tractament segons la fragilitat.\n\n");
    }
    
    // [6] Medicació i malalties prèvies en Sarcoïdosi
    if (dadesPacient.malaltiesPrevis) {
        diagnostic.push("Es consideraran antecedents de Sarcoïdosi en l'avaluació.\n\n");
    }
    if (dadesPacient.altresCroniques) {
        diagnostic.push("Tenir en compte malalties cròniques associades (ex. hipertensió pulmonar, diabetis).\n\n");
    }
    if (dadesPacient.medicacioHabit.immunosupressors) {
        diagnostic.push("Continuar tractament immunosupressor per controlar la inflamació granulomatosa.\n\n");
    }
    if (dadesPacient.medicacioHabit.oxigenoterapia) {
        diagnostic.push("Ajustar oxigenoteràpia segons les necessitats actuals.\n\n");
    }
    return diagnostic || "No s'han detectat condicions específiques. Controlar i monitoritzar.";
}
function getDiagnosticEXTRA(Pacient){
    let diagnostic = [];
    var dadesPacient = Pacient.dadesPacient;
    
    // [1] Presència de febre
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic.push("Diagnòstic: Sospita d'infecció. Recomanat tractament antibiòtic.\n\n");
    }
    
    // [2] Ofeg i/o tos
    if (dadesPacient.ofeg) {
        if (dadesPacient.IncrementMucositatIFebre) {
            diagnostic.push("Diagnòstic: Sospita d'infecció pulmonar. Tractament empíric amb antibiòtics.\n\n");
        } else if (dadesPacient.DolorToracic) {
            diagnostic.push("Diagnòstic: Avaluar embolisme pulmonar o exacerbació de fibrosi pulmonar.\n\n");
        } else if (dadesPacient.Xiulets) {
            diagnostic.push("Diagnòstic: Indicatiu d'obstrucció bronquial o asma superposada. Tractament amb broncodilatadors.\n\n");
        }
    }
    
    // [3] Signes d'alarma
    if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio) {
        diagnostic.push("Signes d'alarma: Presència de febre alta o desaturació. Oxigenoteràpia immediata i proves urgents.\n\n");
    }
    if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi) {
        diagnostic.push("Signes d'alarma: Cianosi i ofeg en repòs. Emergència mèdica: inici d'oxigenoteràpia i derivació urgent a UCI.\n\n");
    }
    if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions) {
        diagnostic.push("Signes d'alarma: Increment de respiracions. Tractament urgent amb ventilació no invasiva (VNI).\n\n");
    }
    
    // [4] Factors pronòstics i complicacions
    if (dadesPacient.DLCO !== null && dadesPacient.DLCO < 40) {
        diagnostic.push("DLCO baixa (<40%): Alt risc de mortalitat. Necessari seguiment intensiu.\n\n");
    }
    if (dadesPacient.FVC !== null && dadesPacient.FVC < 50) {
        diagnostic.push("FVC reduïda (<50%): Malaltia avançada. Necessari ajustar tractament.\n\n");
    }
    if (dadesPacient.desaturacioPM6M) {
        diagnostic.push("Desaturació significativa durant la prova de marxa de 6 minuts: Alta probabilitat de complicacions.\n\n");
    }
    if (dadesPacient.hipertensioPulmonar) {
        diagnostic.push("Presència de hipertensió pulmonar. Requereix tractament específic.\n\n");
    }
    if (dadesPacient.enfisema) {
        diagnostic.push("Enfisema detectat. Augment del risc de complicacions cardiorespiratòries.\n\n");
    }
    if (dadesPacient.refluxGastroesofagic) {
        diagnostic.push("Tractar el reflux gastroesofàgic per reduir microaspiracions.\n\n");
    }
    if (dadesPacient.apneaSon) {
        diagnostic.push("Apnees del son. Indicar CPAP si cal.\n\n");
    }
    if (dadesPacient.carcinomaBroncogenic) {
        diagnostic.push("Presència de carcinoma broncogènic. Prioritzar tractament oncològic.\n\n");
    }
    
    // [5] Edat del pacient
    if (dadesPacient.edat !== null && dadesPacient.edat > 70) {
        diagnostic.push("Pacient d'edat avançada. Adaptar el tractament segons la fragilitat.\n\n");
    }
    
    // [6] Medicació i malalties prèvies
    if (dadesPacient.malaltiesPrevis) {
        diagnostic.push("Es consideraran antecedents de malalties pulmonars en l'avaluació.\n\n");
    }
    if (dadesPacient.altresCroniques) {
        diagnostic.push("Tenir en compte malalties cròniques associades (ex. hipertensió pulmonar, diabetis).\n\n");
    }
    if (dadesPacient.medicacioHabit.antifibrotics) {
        diagnostic.push("Monitoritzar l'eficàcia i adherència del tractament antifibròtic.\n\n");
    }
    if (dadesPacient.medicacioHabit.immunosupressors) {
        diagnostic.push("Avaluar risc d'infecció oportunista a causa de la immunosupressió.\n\n");
    }
    if (dadesPacient.medicacioHabit.oxigenoterapia) {
        diagnostic.push("Ajustar oxigenoteràpia segons les necessitats actuals.\n\n");
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
