import Database from 'better-sqlite3';

// Inicialitzar la connexió amb la base de dades
const db = new Database('database.db');

// Crear la taula Pacient amb les dades mèdiques
function createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS Pacient (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            cognom1 TEXT NOT NULL,
            cognom2 TEXT,
            edat INTEGER,
            PresenciaDeFebre BOOLEAN,
            ofeg BOOLEAN,
            IncrementMucositatICongestioNasalDolorDeGola BOOLEAN,
            IncrementMucositatIFebre BOOLEAN,
            DolorToracic BOOLEAN,
            Xiulets BOOLEAN,
            FebreAltaODesaturacio BOOLEAN,
            IncrementDeRespiracions BOOLEAN,
            OfegEnReposOCianosi BOOLEAN,
            malaltiesPrevis BOOLEAN,
            altresCròniques BOOLEAN,
            antifibrotics BOOLEAN,
            immunosupressors BOOLEAN,
            oxigenoterapia BOOLEAN,
            consumTabac BOOLEAN,
            exposicioFum BOOLEAN,
            antacadents BOOLEAN,
            DLCO INTEGER,
            FVC INTEGER,
            desaturacioPM6M BOOLEAN,
            hipertensioPulmonar BOOLEAN,
            enfisema BOOLEAN,
            refluxGastroesofagic BOOLEAN,
            apneaSon BOOLEAN,
            carcinomaBroncogenic BOOLEAN
        );
    `;
    db.prepare(query).run();
}

// Inserir un nou pacient amb totes les dades
function insertPacient(pacient) {
    const query = `
        INSERT INTO Pacient (
            name, cognom1, cognom2, edat,
            PresenciaDeFebre, ofeg, IncrementMucositatICongestioNasalDolorDeGola,
            IncrementMucositatIFebre, DolorToracic, Xiulets,
            FebreAltaODesaturacio, IncrementDeRespiracions, OfegEnReposOCianosi,
            malaltiesPrevis, altresCròniques, antifibrotics, immunosupressors, oxigenoterapia,
            consumTabac, exposicioFum, antacadents, DLCO, FVC,
            desaturacioPM6M, hipertensioPulmonar, enfisema, refluxGastroesofagic,
            apneaSon, carcinomaBroncogenic
        ) VALUES (
            ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        );
    `;
    const statement = db.prepare(query);
    return statement.run(
        pacient.name, pacient.cognom1, pacient.cognom2, pacient.edat,
        pacient.dadesPacient.PresenciaDeFebre, pacient.dadesPacient.ofeg,
        pacient.dadesPacient.IncrementMucositatICongestioNasalDolorDeGola,
        pacient.dadesPacient.IncrementMucositatIFebre, pacient.dadesPacient.DolorToracic,
        pacient.dadesPacient.Xiulets,
        pacient.dadesPacient.SignesAlarmaPresents.FebreAltaODesaturacio,
        pacient.dadesPacient.SignesAlarmaPresents.IncrementDeRespiracions,
        pacient.dadesPacient.SignesAlarmaPresents.OfegEnReposOCianosi,
        pacient.dadesPacient.malaltiesPrevis, pacient.dadesPacient.altresCròniques,
        pacient.dadesPacient.medicacioHabit.antifibrotics,
        pacient.dadesPacient.medicacioHabit.immunosupressors,
        pacient.dadesPacient.medicacioHabit.oxigenoterapia,
        pacient.dadesPacient.habitsToxics.consumTabac,
        pacient.dadesPacient.habitsToxics.exposicioFum,
        pacient.dadesPacient.antacadents, pacient.dadesPacient.DLCO,
        pacient.dadesPacient.FVC, pacient.dadesPacient.desaturacioPM6M,
        pacient.dadesPacient.hipertensioPulmonar, pacient.dadesPacient.enfisema,
        pacient.dadesPacient.refluxGastroesofagic, pacient.dadesPacient.apneaSon,
        pacient.dadesPacient.carcinomaBroncogenic
    ).lastInsertRowid;
}

// Afegir 5 pacients amb dades fictícies
function insertSamplePacients() {
    const pacients = [
        new Pacient(null, 'Joan', 'Pitifli', 'ChazaVinicius', 45, {
            PresenciaDeFebre: true,
            ofeg: false,
            DLCO: 80,
            FVC: 75,
            desaturacioPM6M: false,
            hipertensioPulmonar: false
        }),
        new Pacient(null, 'Anna', 'García', null, 30, {
            IncrementMucositatIFebre: true,
            DolorToracic: true,
            DLCO: 60,
            apneaSon: true
        }),
        new Pacient(null, 'Pere', 'Fernández', 'Sánchez', 50, {
            Xiulets: true,
            enfisema: true,
            DLCO: 50,
            FVC: 55,
            consumTabac: true
        }),
        new Pacient(null, 'Maria', 'Lopez', 'Martí', 65, {
            refluxGastroesofagic: true,
            carcinomaBroncogenic: true,
            malaltiesPrevis: true
        }),
        new Pacient(null, 'Carla', 'Torres', 'Ramírez', 28, {
            IncrementDeRespiracions: true,
            OfegEnReposOCianosi: true,
            DLCO: 95,
            FVC: 85
        })
    ];

    pacients.forEach(pacient => insertPacient(pacient));
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

export { createTable, insertPacient, getAllPacients, getPacientById, updatePacient, deletePacient };