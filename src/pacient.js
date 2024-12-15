class DadesPacient {
    constructor() {
        this.PresenciaDeFebre = false;
        this.ofeg = false;
        this.IncrementMucositatICongestioNasalDolorDeGola = false;
        this.IncrementMucositatIFebre = false;
        this.DolorToracic = false;
        this.Xiulets = false;

        this.SignesAlarmaPresents = {
            FebreAltaODesaturacio: false,
            IncrementDeRespiracions: false, // representa que aquest valor és true quan >=19 respiracions per minut
            OfegEnReposOCianosi: false
        };

        this.malaltiesPrevis = false;
        this.altresCroniques = false;

        this.medicacioHabit = {
            antifibrotics: false,
            immunosupressors: false,
            oxigenoterapia: false
        };

        this.habitsToxics = {
            consumTabac: false,
            exposicioFum: false
        };

        this.edat = null; // Mantingut com a `null` perquè és un valor numèric i no té sentit que sigui `false`.
        this.DLCO = null; // Difusio del monòxid de carboni (%)
        this.FVC = null;  // Capacitat vital forçada (%)
        this.desaturacioPM6M = null; // Desaturació a la prova de marxa de 6 minuts
        this.hipertensioPulmonar = false;
        this.enfisema = false;
        this.refluxGastroesofagic = false;
        this.apneaSon = false;
        this.carcinomaBroncogenic = false;
    }
}

class Pacient {
    constructor(id = null, name = '', cognom1 = '', cognom2 = null, enfermetat = '', edat = null, estatActual = null, metge = '', centreSanitari = '', dadesPacient = new DadesPacient(), provesPacient = new  ProvesPacient()) {
        this.id = id;
        this.name = name;
        this.cognom1 = cognom1;
        this.cognom2 = cognom2;
        this.enfermetat = enfermetat;
        this.edat = edat;
        this.estatActual = estatActual;
        this.metge = metge;
        this.centreSanitari = centreSanitari;
        this.dadesPacient = dadesPacient;
        this.provesPacient = provesPacient;
    }

    // Consultora per omplir les dadesPacient
    omplirDadesPacient(dades) {
        Object.assign(this.dadesPacient, dades);
    }
}

class ProvesPacient {
    constructor() {
        this.urgencia = false; // Si es tracta d'una urgència
        this.provesAnalitiquesUrgents = {
            rxTorax: false, // Si s'ha fet una radiografia de tòrax
            suspitapneu: false, // Si hi ha sospita de pneumònia
        };
        this.dxConcret = null; // Diagnòstic concret ("pneumonia", "altre" o null)
        this.sospitaTEP = false; // Si hi ha sospita de TEP
        this.tepConfirmat = false; // Si s'ha confirmat el TEP
        this.immunocompetent = false; // Si el pacient és immunocompetent
        this.immunosupressors = false; // Si el pacient és immunodeprimit
        this.pcrPositivaInfluenza = false; // Si la PCR és positiva per Influenza
        this.sospitaCMV = false; // Si hi ha sospita de CMV
        this.sospitaPneumocystis = false; // Si hi ha sospita de Pneumocystis jirovecii
        this.necessitaOxigenoterapia = false; // Si requereix oxigenoteràpia
        this.inhibidorBombaProtons = false; // Si necessita inhibidor de bomba de protons
        this.nAcetilcisteina = false; // Si necessita N-Acetilcisteïna
        this.nebulitzacions = false; // Si necessita nebulitzacions
        this.hbpmNecessari = false; // Si requereix HBPM
        this.metilprednisolona = false; // Si requereix Metilprednisolona
        this.losartanNecessari = false; // Si requereix Losartan
    }
}

export { Pacient, DadesPacient, ProvesPacient};