class Pacient {
    constructor(id = null, name, cognom1, cognom2 = null, edat) {
        this.id = id;
        this.name = name;
        this.cognom1 = cognom1;
        this.cognom2 = cognom2;
        this.edat = edat;

        this.dadesPacient = {
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

            antacadents: false
        };
    }
}