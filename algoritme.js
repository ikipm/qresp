
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
    edat: 0 // Valor inicial per a edat
};

var diagnostic = diagnosticF(dadesPacient);
var tractament = tractamentF(dadesPacient);

function tractamentF(dades){

    let diagnostic = "";
    let tractament = [];

    // **Valoració inicial a urgències**
    if (dadesPacient.PresenciaDeFebre) {
        diagnostic = "Dx concret: Pneumònia";

        // **Classificació segons immunitat**
         if (dadesPacient.medicacioHabit.immunosupressors == false) {
            tractament.push(
                "Antibiòtics: Cefalosporina 3a generació",
                "Levofloxacina 500 mg/24h"
            );
        }
    } else if (dadesPacient.TEP) {
        diagnostic = "Sospita TEP";
        tractament.push("Realitzar ANGIO-TACAR + D-Dímer");
    } else {
        diagnostic = "No Dx concret";
        tractament.push("Valoració de la parènquima amb TACAR");
    }

    // **Teràpies generals**
    if (dadesPacient.medicacioHabit.oxigenoterapia) {
        tractament.push("Oxigenoteràpia ajustant FiO2 a SpO2 > 92%");
    }

    if (dadesPacient.hipotensio) {
        tractament.push("Morfina: 2.5-5mg s.c. cada 8 hores");
    }

    if (dadesPacient.edat > 65) {
        tractament.push(
            "Metilprednisolona (1 mg/kg/dia)",
            "N-Acetilcisteïna 600 mg/8h (protecció pulmonar)"
        );
    }

    // **Resultat final**
    return {
        tractament: tractament
    };
}

function diagnosticF(dades){
    var diagnostic = "";
// Diagnòstic principal basat en els símptomes
if (dadesPacient.PresenciaDeFebre === true) {
    diagnostic = "Realitzar analítica bàsica (hemograma, PCR). Sol·licitar cultius (sang i esput) si sospita d’infecció. Tomografia (TCAR) per descartar pneumònia/inflamació aguda.";
} else if (dadesPacient.IncrementMucositatICongestioNasalDolorDeGola === true) {
    diagnostic = "Sospita d’infecció respiratòria alta (viral o bacteriana). Tractament: hidratació, mucolítics, i antibiòtics si hi ha sospita bacteriana. Si no hi ha resposta, considerar TCAR i/o broncoscòpia.";
} else if (dadesPacient.IncrementMucositatIFebre === true) {
    diagnostic = "Sospita d’infecció pulmonar. Iniciar antibiòtics empírics (segons protocols locals). Proves complementàries: hemocultius, gasometria arterial i radiografia/TCAR.";
} else if (dadesPacient.DolorToracic === true) {
    diagnostic = "Avaluar possibles causes: Embolisme pulmonar: Sol·licitar D-dímer i TC amb contrast. Exacerbació de fibrosi pulmonar: Confirmar amb TCAR i proves funcionals.";
} else if (dadesPacient.Xiulets === true) {
    diagnostic = "Indicatiu d’obstrucció bronquial o asma superposada. Tractament: broncodilatadors, excepte en MPID fibròtica sense sibilants (evitar).";
}

// Avaluació dels signes d'alarma
if (dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio === true) {
    diagnostic += " Oxigenoteràpia immediata. Proves urgents: gasometria arterial, radiografia de tòrax/TCAR.";
}
if (dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions === true) {
    diagnostic += " Tractament urgent per estabilitzar respiració. Considerar ventilació no invasiva (VNI) en casos severs.";
}
if (dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi === true) {
    diagnostic += " Emergència mèdica: inici immediat d’oxigenoteràpia. Derivació urgent a UCI si no hi ha millora ràpida.";
}

// Avaluació de l'historial mèdic del pacient
if (dadesPacient.malaltiesPrevis === true) {
    diagnostic += " Es consideraran antecedents de malalties pulmonars en l'avaluació.";
}
if (dadesPacient.altresCròniques === true) {
    diagnostic += " Tenir en compte malalties cròniques associades (ex. hipertensió pulmonar, diabetis).";
}
if (dadesPacient.medicacioHabit.antifibrotics === true) {
    diagnostic += " Monitoritzar l'eficàcia i adherència del tractament antifibròtic.";
}
if (dadesPacient.medicacioHabit.immunosupressors === true) {
    diagnostic += " Avaluar risc d'infecció oportunista a causa de la immunosupressió.";
}
if (dadesPacient.medicacioHabit.oxigenoterapia === true) {
    diagnostic += " Ajustar oxigenoteràpia segons les necessitats actuals.";
}
if (dadesPacient.habitsToxics.consumTabac === true || dadesPacient.habitsToxics.exposicioFum === true) {
    diagnostic += " Recomanació urgent de cessació del tabac i evitar exposicions tòxiques.";
}
if (dadesPacient.antacadents === true) {
    diagnostic += " Revisar antecedents familiars de malalties autoimmunes o pulmonars.";
}
if (dadesPacient.edat > 65) {
    diagnostic += " Pacient d'edat avançada amb major risc de complicacions. Adaptar tractament segons fragilitat.";
}
return diagnostic;
}
