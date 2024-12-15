

function tractament(dadesProva){
    let diagnostic = [];
    
    // [1] Valoració a urgències
    if (dadesProva.urgencia) {
        diagnostic.push("Analítica urgent (bioquímica, hemograma, coagulació).\n\n");
        if(provesAnalitiquesUrgents.rxTorax && provesAnalitiquesUrgents.suspitapneu){
            diagnostic.push("Esput (gram i cultiu convencional, fongs/micobacteris) ntigenúria (pneumococ/legionella). 2 hemocultius. PCR per virus influenza A i B (si sospita de grip)")
        }
    }
    
    
    // [2] Valoració a NML Guàrdia
    if (dadesProva.dxConcret && dadesProva.dxConcret !== "pneumonia") {
        if (dadesProva.sospitaTEP) {
            diagnostic.push("ANGIO-TACAR + D-Dímer per sospita de TEP.\n\n");
            if (dadesProva.tepConfirmat) {
                diagnostic.push("TEP confirmat: Ingrés a NML i tractament amb HBPM (heparina baix pes molecular) i tractament específic.\n\n");
            } else {
                diagnostic.push("TEP descartat: Valoració del parènquima.\n\n");
            }
        }
    } 
    
    else if (dadesProva.dxConcret === "pneumonia") {
        if (dadesProva.immunocompetent) {
            diagnostic.push("Pacient immunocompetent: Tractament amb Oseltamivir 75mg/12h v.o., Cefalosporina 3ª generació i Levofloxacino 500mg/24h v.o.\n\n");
        } else if (dadesProva.immunosupressors) {
            diagnostic.push("Pacient immunodeprimit: Tractament inicial amb Piperacil·lina/Tazobactam 4g/0,5g cada 8h e.v. (+ Cefalosporina 3ª generació) i Levofloxacino 500mg/24h v.o.\n\n");
            if (dadesProva.pcrPositivaInfluenza) {
                diagnostic.push("PCR positiva a virus Influenza: Tractament antiviral específic.\n\n");
            }
            if (dadesProva.sospitaCMV) {
                diagnostic.push("Sospita de CMV: Tractament amb Ganciclovir 5mg/Kg cada 12h e.v.\n\n");
            }
            if (dadesProva.sospitaPneumocystis) {
                diagnostic.push("Sospita de *Pneumocystis jirovecii*: Tractament amb Sulfametoxazol/Trimetoprim 800/160mg cada 12h v.o. + Àcid Fòlic.\n\n");
            }
        }
    }
    
    // [3] Tractament generalitzat
    if (dadesProva.necessitaOxigenoterapia) {
        diagnostic.push("Oxigenoteràpia: Ajustar segons SatO2 ≥ 92%.\n\n");
    }
    
    if (dadesProva.inhibidorBombaProtons) {
        diagnostic.push("Inhibidor bomba protons: Omeprazol 20mg cada 12-24h v.o.\n\n");
    }
    
    if (dadesProva.nAcetilcisteina) {
        diagnostic.push("N-Acetilcisteïna 600mg cada 8h v.o.: Potent antioxidant pulmonar.\n\n");
    }
    
    if (dadesProva.nebulitzacions) {
        diagnostic.push("Nebulitzacions amb Atrovent + SF + Salbutamol (*si no hipertensió pulmonar*).\n\n");
    }
    
    if (dadesProva.hbpmNecessari) {
        diagnostic.push("HBPM: Bemiparina 2500-3500 UI/dia (segons Kg de pes).\n\n");
    }
    
    if (dadesProva.metilprednisolona) {
        diagnostic.push("Metilprednisolona: ½-1 mg/Kg pes/d v.o. + Calci i Vitamina D 500mg/400 UI (2 comprimits/dia).\n\n");
    }
    
    if (dadesProva.losartanNecessari) {
        diagnostic.push("Losartan 50mg/24h v.o.: Si sospita de dany epitelial alveolar i no hi ha hipoTA.\n\n");
    }
    
    // [4] Individualitzar cada cas
    diagnostic.push("Individualitzar cada cas segons el context clínic i + tractament específic.\n\n");
    
    // Retorn del diagnòstic
    return diagnostic.length > 1 ? diagnostic : ["No s'han detectat condicions específiques. Controlar i monitoritzar."];
}
export {tractament};
