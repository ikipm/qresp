import Database from 'better-sqlite3';

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
            Antecedents BOOLEAN,
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
            HabitsToxics_ConsumTabac, HabitsToxics_ExposicioFum, Antecedents, Edat,
            DLCO, FVC, DesaturacioPM6M, HipertensioPulmonar, Enfisema, RefluxGastroesofagic,
            ApneaSon, CarcinomaBroncogenic
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const statement = db.prepare(query);
    return statement.run(
        pacient.name, pacient.cognom1, pacient.cognom2,
        pacient.dadesPacient.PresenciaDeFebre, pacient.dadesPacient.ofeg,
        pacient.dadesPacient.IncrementMucositatICongestioNasalDolorDeGola, pacient.dadesPacient.IncrementMucositatIFebre,
        pacient.dadesPacient.DolorToracic, pacient.dadesPacient.Xiulets,
        pacient.dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio,
        pacient.dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions,
        pacient.dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi,
        pacient.dadesPacient.malaltiesPrevis, pacient.dadesPacient.altresoniques,
        pacient.dadesPacient.medicacioHabit.antifibrotics,
        pacient.dadesPacient.medicacioHabit.immunosupressors,
        pacient.dadesPacient.medicacioHabit.oxigenoterapia,
        pacient.dadesPacient.habitsToxics.consumTabac,
        pacient.dadesPacient.habitsToxics.exposicioFum,
        pacient.dadesPacient.antecedents, pacient.edat,
        pacient.dadesPacient.DLCO, pacient.dadesPacient.FVC,
        pacient.dadesPacient.desaturacioPM6M, pacient.dadesPacient.hipertensioPulmonar,
        pacient.dadesPacient.enfisema, pacient.dadesPacient.refluxGastroesofagic,
        pacient.dadesPacient.apneaSon, pacient.dadesPacient.carcinomaBroncogenic
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
        antecedents: pacientRow.Antecedents,
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
// Obtenir tots els pacients
function getAllPacients() {
    const query = `
        SELECT * FROM Pacient;
    `;
    return db.prepare(query).all();
}

// Obtenir un pacient per ID
function getPacientById(id) {
    const query = `
        SELECT * FROM Pacient WHERE id = ?;
    `;
    return db.prepare(query).get(id);
}

// Actualitzar un pacient
function updatePacient(pacient) {
    const query = `
        UPDATE Pacient
        SET name = ?, cognom1 = ?, cognom2 = ?,
        WHERE id = ?;
    `;
    const statement = db.prepare(query);
    const result = statement.run(pacient.name, pacient.cognom1, pacient.cognom2, pacient.id);
    return result.changes > 0;
}

// Eliminar un pacient per ID
function deletePacient(id) {
    const query = `
        DELETE FROM Pacient WHERE id = ?;
    `;
    const statement = db.prepare(query);
    return statement.run(id).changes > 0;
}

// Crear la taula i inserir pacients de mostra
createTable();
insertSamplePacients();

function updatePacient(pacient) {
    const query = `
        UPDATE Pacient
        SET name = ?, cognom1 = ?, cognom2 = ?, Edat = ?,
            PresenciaDeFebre = ?, Ofeg = ?, IncrementMucositatICongestioNasalDolorDeGola = ?,
            IncrementMucositatIFebre = ?, DolorToracic = ?, Xiulets = ?,
            SignesAlarma_FebreAltaODesaturacio = ?, SignesAlarma_IncrementDeRespiracions = ?,
            SignesAlarma_OfegEnReposOCianosi = ?, MalaltiesPrevis = ?, AltresCroniques = ?,
            MedicacioHabit_Antifibrotics = ?, MedicacioHabit_Immunosupressors = ?, MedicacioHabit_Oxigenoterapia = ?,
            HabitsToxics_ConsumTabac = ?, HabitsToxics_ExposicioFum = ?, Antecedents = ?,
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
        pacient.dadesPacient.habitsToxics.exposicioFum, pacient.dadesPacient.antecedents,
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

export { createTable, insertPacient, getPacientById, getAllPacients, updatePacient, deletePacient };