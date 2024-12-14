class DadesPacient {
    constructor() {
        this.PresenciaDeFebre = null;
        this.ofeg = null;
        this.IncrementMucositatICongestioNasalDolorDeGola = null;
        this.IncrementMucositatIFebre = null;
        this.DolorToracic = null;
        this.Xiulets = null;

        this.SignesAlarmaPresents = {
            FebreAltaODesaturacio: null,
            IncrementDeRespiracions: null, // representa que aquest valor és true quan >=19 respiracions per minut
            OfegEnReposOCianosi: null
        };

        this.malaltiesPrevis = null;
        this.altresCroniques = null;

        this.medicacioHabit = {
            antifibrotics: null,
            immunosupressors: null,
            oxigenoterapia: null
        };

        this.habitsToxics = {
            consumTabac: null,
            exposicioFum: null
        };

        this.antecedents = null;
        this.edat = null;
        this.DLCO = null; // Difusio del monòxid de carboni (%)
        this.FVC = null;  // Capacitat vital forçada (%)
        this.desaturacioPM6M = null; // Desaturació a la prova de marxa de 6 minuts
        this.hipertensioPulmonar = null;
        this.enfisema = null;
        this.refluxGastroesofagic = null;
        this.apneaSon = null;
        this.carcinomaBroncogenic = null;
    }
}

class Pacient {
    constructor(id = null, name, cognom1, cognom2 = null, edat, dadesPacient = new DadesPacient()) {
        this.id = id;
        this.name = name;
        this.cognom1 = cognom1;
        this.cognom2 = cognom2;
        this.edat = edat;
        this.dadesPacient = dadesPacient;
    }

    // Consultora per omplir les dadesPacient
    omplirDadesPacient(dades) {
        Object.assign(this.dadesPacient, dades);
    }
}


export {Pacient}