const Database = require('better-sqlite3');

// Inicialitzar la connexió amb la base de dades
const db = new Database('database.db');

function createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS Pacient (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            cognom1 TEXT NOT NULL,
            cognom2 TEXT,
            edat INTEGER NOT NULL
        );
    `;
    db.prepare(query).run();
}

// Inserir un nou pacient
function insertPacient(pacient) {
    const query = `
        INSERT INTO Pacient (name, cognom1, cognom2, edat)
        VALUES (?, ?, ?, ?);
    `;
    const statement = db.prepare(query);
    return statement.run(pacient.name, pacient.cognom1, pacient.cognom2, pacient.edat).lastInsertRowid;
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
        SET name = ?, cognom1 = ?, cognom2 = ?, edat = ?
        WHERE id = ?;
    `;
    const statement = db.prepare(query);
    const result = statement.run(pacient.name, pacient.cognom1, pacient.cognom2, pacient.edat, pacient.id);
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

export { createTable, insertPacient, getAllPacients, getPacientById, updatePacient, deletePacient };
