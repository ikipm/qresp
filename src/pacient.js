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
        this.altresCròniques = null;

        this.medicacioHabit = {
            antifibrotics: null,
            immunosupressors: null,
            oxigenoterapia: null
        };

        this.habitsToxics = {
            consumTabac: null,
            exposicioFum: null
        };

        this.antacadents = null;
        this.edat = null;
    }
}

class Pacient {
    constructor(id = null, name, cognom1, cognom2 = null, dadesPacient = new DadesPacient()) {
        this.id = id;
        this.name = name;
        this.cognom1 = cognom1;
        this.cognom2 = cognom2;
        this.dadesPacient = dadesPacient;
    }
}

export {Pacient}