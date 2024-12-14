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
    constructor(id = null, name = '', cognom1 = '', cognom2 = null, enfermetat = '', edat = null, estatActual = null, metge = '', centreSanitari = '', dadesPacient = new DadesPacient()) {
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
    }

    // Consultora per omplir les dadesPacient
    omplirDadesPacient(dades) {
        Object.assign(this.dadesPacient, dades);
    }
}

export { Pacient, DadesPacient};