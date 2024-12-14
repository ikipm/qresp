import Database from 'better-sqlite3';
import { Pacient, DadesPacient } from './pacient.js';

// Inicialitzar la connexió amb la base de dades
const db = new Database('database.db');

function createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS Pacient (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            cognom1 TEXT NOT NULL,
            cognom2 TEXT,
            PresenciaDeFebre BOOLEAN,
            Ofeg BOOLEAN,
            IncrementMucositatICongestioNasalDolorDeGola BOOLEAN,
            IncrementMucositatIFebre BOOLEAN,
            DolorToracic BOOLEAN,
            Xiulets BOOLEAN,
            SignesAlarma_FebreAltaODesaturacio BOOLEAN,
            SignesAlarma_IncrementDeRespiracions BOOLEAN,
            SignesAlarma_OfegEnReposOCianosi BOOLEAN,
            MalaltiesPrevis BOOLEAN,
            AltresCroniques BOOLEAN,
            MedicacioHabit_Antifibrotics BOOLEAN,
            MedicacioHabit_Immunosupressors BOOLEAN,
            MedicacioHabit_Oxigenoterapia BOOLEAN,
            HabitsToxics_ConsumTabac BOOLEAN,
            HabitsToxics_ExposicioFum BOOLEAN,
            Edat INTEGER,
            DLCO REAL,
            FVC REAL,
            DesaturacioPM6M REAL,
            HipertensioPulmonar BOOLEAN,
            Enfisema BOOLEAN,
            RefluxGastroesofagic BOOLEAN,
            ApneaSon BOOLEAN,
            CarcinomaBroncogenic BOOLEAN
        );
    `;
    db.prepare(query).run();
}

function insertPacient(pacient) {
    const query = `
        INSERT INTO Pacient (
            name, cognom1, cognom2,
            PresenciaDeFebre, Ofeg, IncrementMucositatICongestioNasalDolorDeGola,
            IncrementMucositatIFebre, DolorToracic, Xiulets,
            SignesAlarma_FebreAltaODesaturacio, SignesAlarma_IncrementDeRespiracions,
            SignesAlarma_OfegEnReposOCianosi, MalaltiesPrevis, AltresCroniques,
            MedicacioHabit_Antifibrotics, MedicacioHabit_Immunosupressors, MedicacioHabit_Oxigenoterapia,
            HabitsToxics_ConsumTabac, HabitsToxics_ExposicioFum, Edat,
            DLCO, FVC, DesaturacioPM6M, HipertensioPulmonar, Enfisema, RefluxGastroesofagic,
            ApneaSon, CarcinomaBroncogenic
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const statement = db.prepare(query);
    return statement.run(
        pacient.name, pacient.cognom1, pacient.cognom2,
        pacient.dadesPacient.PresenciaDeFebre ? 1 : 0, pacient.dadesPacient.ofeg ? 1 : 0,
        pacient.dadesPacient.IncrementMucositatICongestioNasalDolorDeGola ? 1 : 0,
        pacient.dadesPacient.IncrementMucositatIFebre ? 1 : 0,
        pacient.dadesPacient.DolorToracic ? 1 : 0, pacient.dadesPacient.Xiulets ? 1 : 0,
        pacient.dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio ? 1 : 0,
        pacient.dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions ? 1 : 0,
        pacient.dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi ? 1 : 0,
        pacient.dadesPacient.malaltiesPrevis ? 1 : 0, pacient.dadesPacient.altresCroniques ? 1 : 0,
        pacient.dadesPacient.medicacioHabit.antifibrotics ? 1 : 0,
        pacient.dadesPacient.medicacioHabit.immunosupressors ? 1 : 0,
        pacient.dadesPacient.medicacioHabit.oxigenoterapia ? 1 : 0,
        pacient.dadesPacient.habitsToxics.consumTabac ? 1 : 0,
        pacient.dadesPacient.habitsToxics.exposicioFum ? 1 : 0,
        pacient.edat,
        pacient.dadesPacient.DLCO, pacient.dadesPacient.FVC,
        pacient.dadesPacient.desaturacioPM6M, pacient.dadesPacient.hipertensioPulmonar ? 1 : 0,
        pacient.dadesPacient.enfisema ? 1 : 0, pacient.dadesPacient.refluxGastroesofagic ? 1 : 0,
        pacient.dadesPacient.apneaSon ? 1 : 0, pacient.dadesPacient.carcinomaBroncogenic ? 1 : 0,
    ).lastInsertRowid;
}

function getPacientById(id) {
    const query = `SELECT * FROM Pacient WHERE id = ?;`;
    const pacientRow = db.prepare(query).get(id);

    if (!pacientRow) return null;

    const dadesPacient = {
        PresenciaDeFebre: pacientRow.PresenciaDeFebre,
        Ofeg: pacientRow.Ofeg,
        IncrementMucositatICongestioNasalDolorDeGola: pacientRow.IncrementMucositatICongestioNasalDolorDeGola,
        IncrementMucositatIFebre: pacientRow.IncrementMucositatIFebre,
        DolorToracic: pacientRow.DolorToracic,
        Xiulets: pacientRow.Xiulets,
        SignesAlarmaPresents: {
            FebreAltaODesaturacio: pacientRow.SignesAlarma_FebreAltaODesaturacio,
            IncrementDeRespiracions: pacientRow.SignesAlarma_IncrementDeRespiracions,
            OfegEnReposOCianosi: pacientRow.SignesAlarma_OfegEnReposOCianosi
        },
        malaltiesPrevis: pacientRow.MalaltiesPrevis,
        altresCroniques: pacientRow.AltresCroniques,
        medicacioHabit: {
            antifibrotics: pacientRow.MedicacioHabit_Antifibrotics,
            immunosupressors: pacientRow.MedicacioHabit_Immunosupressors,
            oxigenoterapia: pacientRow.MedicacioHabit_Oxigenoterapia
        },
        habitsToxics: {
            consumTabac: pacientRow.HabitsToxics_ConsumTabac,
            exposicioFum: pacientRow.HabitsToxics_ExposicioFum
        },
        DLCO: pacientRow.DLCO,
        FVC: pacientRow.FVC,
        desaturacioPM6M: pacientRow.DesaturacioPM6M,
        hipertensioPulmonar: pacientRow.HipertensioPulmonar,
        enfisema: pacientRow.Enfisema,
        refluxGastroesofagic: pacientRow.RefluxGastroesofagic,
        apneaSon: pacientRow.ApneaSon,
        carcinomaBroncogenic: pacientRow.CarcinomaBroncogenic
    };

    return {
        id: pacientRow.id,
        name: pacientRow.name,
        cognom1: pacientRow.cognom1,
        cognom2: pacientRow.cognom2,
        edat: pacientRow.Edat,
        dadesPacient
    };
}

function getAllPacients() {
    const query = `SELECT * FROM Pacient;`;
    return db.prepare(query).all();
}

function updatePacient(pacient) {
    const query = `
        UPDATE Pacient
        SET name = ?, cognom1 = ?, cognom2 = ?, Edat = ?,
            PresenciaDeFebre = ?, Ofeg = ?, IncrementMucositatICongestioNasalDolorDeGola = ?,
            IncrementMucositatIFebre = ?, DolorToracic = ?, Xiulets = ?,
            SignesAlarma_FebreAltaODesaturacio = ?, SignesAlarma_IncrementDeRespiracions = ?,
            SignesAlarma_OfegEnReposOCianosi = ?, MalaltiesPrevis = ?, AltresCroniques = ?,
            MedicacioHabit_Antifibrotics = ?, MedicacioHabit_Immunosupressors = ?, MedicacioHabit_Oxigenoterapia = ?,
            HabitsToxics_ConsumTabac = ?, HabitsToxics_ExposicioFum = ?,
            DLCO = ?, FVC = ?, DesaturacioPM6M = ?, HipertensioPulmonar = ?, Enfisema = ?,
            RefluxGastroesofagic = ?, ApneaSon = ?, CarcinomaBroncogenic = ?
        WHERE id = ?;
    `;
    const statement = db.prepare(query);
    const result = statement.run(
        pacient.name, pacient.cognom1, pacient.cognom2, pacient.edat,
        pacient.dadesPacient.PresenciaDeFebre, pacient.dadesPacient.ofeg,
        pacient.dadesPacient.IncrementMucositatICongestioNasalDolorDeGola, pacient.dadesPacient.IncrementMucositatIFebre,
        pacient.dadesPacient.DolorToracic, pacient.dadesPacient.Xiulets,
        pacient.dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio,
        pacient.dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions,
        pacient.dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi,
        pacient.dadesPacient.malaltiesPrevis, pacient.dadesPacient.altresCroniques,
        pacient.dadesPacient.medicacioHabit.antifibrotics, pacient.dadesPacient.medicacioHabit.immunosupressors,
        pacient.dadesPacient.medicacioHabit.oxigenoterapia, pacient.dadesPacient.habitsToxics.consumTabac,
        pacient.dadesPacient.habitsToxics.exposicioFum,
        pacient.dadesPacient.DLCO, pacient.dadesPacient.FVC, pacient.dadesPacient.desaturacioPM6M,
        pacient.dadesPacient.hipertensioPulmonar, pacient.dadesPacient.enfisema,
        pacient.dadesPacient.refluxGastroesofagic, pacient.dadesPacient.apneaSon,
        pacient.dadesPacient.carcinomaBroncogenic, pacient.id
    );
    return result.changes > 0;
}

function deletePacient(id) {
    const query = `DELETE FROM Pacient WHERE id = ?;`;
    const statement = db.prepare(query);
    return statement.run(id).changes > 0;
}

function insertSamplePacients() {
    const countQuery = `SELECT COUNT(*) AS count FROM Pacient;`;
    const { count } = db.prepare(countQuery).get();

    if (count === 0) {
        console.log('Inserint pacients de mostra, la base de dades està buida.');

        const pacientsDeMostra = [
            new Pacient(null, 'Joan', 'Garcia', 'Pérez', 45, {
                PresenciaDeFebre: true,
                ofeg: false,
                IncrementMucositatICongestioNasalDolorDeGola: false,
                IncrementMucositatIFebre: true,
                DolorToracic: false,
                Xiulets: false,
                SignesAlarmaPresents: {
                    FebreAltaODesaturacio: true,
                    IncrementDeRespiracions: false,
                    OfegEnReposOCianosi: false
                },
                malaltiesPrevis: true,
                altresCroniques: false,
                medicacioHabit: {
                    antifibrotics: true,
                    immunosupressors: false,
                    oxigenoterapia: false
                },
                habitsToxics: {
                    consumTabac: true,
                    exposicioFum: false
                },
                DLCO: 60,
                FVC: 75,
                desaturacioPM6M: 90,
                hipertensioPulmonar: false,
                enfisema: false,
                refluxGastroesofagic: true,
                apneaSon: false,
                carcinomaBroncogenic: false
            }),
            new Pacient(null, 'Maria', 'Lopez', 'Martínez', 37, {
                PresenciaDeFebre: false,
                ofeg: true,
                IncrementMucositatICongestioNasalDolorDeGola: true,
                IncrementMucositatIFebre: false,
                DolorToracic: false,
                Xiulets: true,
                SignesAlarmaPresents: {
                    FebreAltaODesaturacio: false,
                    IncrementDeRespiracions: true,
                    OfegEnReposOCianosi: false
                },
                malaltiesPrevis: false,
                altresCroniques: true,
                medicacioHabit: {
                    antifibrotics: false,
                    immunosupressors: true,
                    oxigenoterapia: false
                },
                habitsToxics: {
                    consumTabac: false,
                    exposicioFum: true
                },
                DLCO: 55,
                FVC: 70,
                desaturacioPM6M: 85,
                hipertensioPulmonar: true,
                enfisema: false,
                refluxGastroesofagic: false,
                apneaSon: true,
                carcinomaBroncogenic: false
            })
        ];

        for (const pacient of pacientsDeMostra) {
            insertPacient(pacient);
        }

        console.log('Pacients de mostra inserits correctament.');
    } else {
        console.log("La base de dades ja conté dades, no s'han inserit pacients de mostra.");
    }
}


export { createTable, insertPacient, getPacientById, getAllPacients, updatePacient, deletePacient, insertSamplePacients};