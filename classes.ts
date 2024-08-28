import { IMezzo, IUtente, ICitta } from "./interfaces";

// Definisco i miei tipi custom
type tipoMedotiPagamento = "paypal" | "mooney" | "carta";
type tipoMezzi = "bici" | "scooter" | "monopattino";
type tipoStati = "disponibile" | "in uso";

let counter : number = 0 // id per i mezzi

export class Mezzo implements IMezzo {
  tipo: tipoMezzi;
  id: number;
  private _stato: tipoStati;
  utenteAssegnato: Utente | null; // Può essere un utente o null, quando lo sgancio

  public get stato(): tipoStati {
    return this._stato;
  }

  public set stato(v: tipoStati) {
    this._stato = v;
  }

  constructor(tipo: tipoMezzi) {
    this.tipo = tipo;
    this.id = counter++; // assegno questo contare come ID per evitare che nella creazione qualcuno possa creare più mezzi con lo stesso ID
    this._stato = "disponibile"; // quando creo il mezzo, di default lo creo come disponibile
  }

  assegnaUtente(utenteDaAssegnare: Utente): boolean { // lo creo come funzione booleana in modo da comportarmi diversamente nella funziona prenotaMezzo in base all'esito
    if (this.stato != "in uso") {
      this.stato = "in uso";
      this.utenteAssegnato = utenteDaAssegnare;
      console.log(
        `L'utente ${this.utenteAssegnato.nome} è stato assegnato correttamente al mezzo ${this.tipo} - ID: ${this.id}!`
      );
      return true
    } else {
      console.log(
         `Impossibile assegnare! Il mezzo ${this.tipo} - ID: ${this.id} è attualmente in uso!`
       );
       return false
    }
  }

  sganciaUtente(): void {
    // Non chiedo l'utente in input perché dò per scontato che se lo voglio sganciare, sgancio l'utente agganciato in quel momento
    console.log(
      `L'utente ${this.utenteAssegnato?.nome} è stato sganciato correttamente dal mezzo ${this.tipo} - ID: ${this.id}!`
    );
    this.stato = "disponibile";
    this.utenteAssegnato = null;
  }
}

export class Utente implements IUtente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamento: tipoMedotiPagamento;
  mezzoAssegnato: Mezzo | null;

  constructor(
    nome: string,
    cognome: string,
    email: string,
    metodoPagamento: tipoMedotiPagamento
  ) {
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.metodoPagamento = metodoPagamento;
  }

  prenotaMezzo(mezzoDaAssegnare: Mezzo): void {
    if (this.mezzoAssegnato == null) {
      if (mezzoDaAssegnare.assegnaUtente(this)) this.mezzoAssegnato = mezzoDaAssegnare; // se l'assegnazione è andata a buon fine      
    } else {
      console.log(
        `L'utente ${this.nome} è già assegnato al mezzo ${this.mezzoAssegnato.tipo} - ID: ${this.mezzoAssegnato.id}!`
      );
    }
  }

  liberaMezzo() {
    if (this.mezzoAssegnato != null) {
      this.mezzoAssegnato.sganciaUtente();
      this.mezzoAssegnato = null;
    } else {
      console.log(
        `L'utente ${this.nome} non ha nessun mezzo assegnato da liberare!`
      );
    }
  }
}

export class Citta implements ICitta {
  nome: string;
  mezziDisponibili: Mezzo[];

  constructor(
   nome: string,
   mezziDisponibili: Mezzo[]
 ) {
   this.nome = nome;
   this.mezziDisponibili = mezziDisponibili
 }

  aggiungiMezzo(mezzoDaAggiungere: Mezzo): void {
    this.mezziDisponibili.push(mezzoDaAggiungere);
    console.log(`Mezzo ${mezzoDaAggiungere.tipo} ID: ${mezzoDaAggiungere.id} aggiunto correttamente alla città ${this.nome}!`)
  }

  mostramiTuttiIMezzi() : void { // mostro tutti i mezzi
   console.log(`I mezzi della città ${this.nome} sono i seguenti:`)
   this.mezziDisponibili.forEach(element => {
      console.log(`${element.tipo} ID: ${element.id}`)
   });
  }

  mostramiMezziLiberi() : void { // mostro solo mezzi liberi
   console.log(`I mezzi liberi della città ${this.nome} sono i seguenti:`)
   this.mezziDisponibili.forEach(element => {
      if (element.stato == "disponibile") console.log(`${element.tipo} ID: ${element.id}`)
   });
  }
}
