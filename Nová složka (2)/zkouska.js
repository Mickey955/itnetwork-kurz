
const jmenoInput = document.querySelector(".jmenoInput");
const prijmeniInput = document.querySelector(".prijmeniInput");
const vekInput = document.querySelector(".vekInput");
const telefonInput = document.querySelector(".telefonInput");
const emailInput = document.querySelector(".e-mailInput");
const papousekInput = document.querySelector(".papousekInput");
const odeslatTlacitko = document.querySelector(".odeslat-tlacitko");
const showRegistrationButton = document.getElementById("show-registration");
const registrationSection = document.getElementById("registration-section");
const evidenceSection = document.querySelector(".evidence-section");
const showEvidence = document.querySelector("#show-evidence");
const showInfoButton = document.getElementById("show-info");

/* sekce pro informace*/
const evidenceContainer = document.getElementById("evidence-container");
const infoSection = document.getElementById("info-section"); 
/* sekce pro kontakt */
const kontaktSection = document.querySelector("#kontakt-section");
const showKontakt = document.querySelector("#show-kontact");



function zobrazZaznamy() {
  evidenceSection.innerHTML = ""; /* Vyprázdnění */

  zaznamy.forEach((zaznam, index) => {
    const recordDiv = document.createElement("div");
    recordDiv.classList.add("record");

    const jmenoElement = document.createElement("h4");
    jmenoElement.textContent = "Jméno a příjmení";

    const jmenoPElement = document.createElement("p");
    jmenoPElement.textContent = `${zaznam.jmeno} ${zaznam.prijmeni}`;

    const vekElement = document.createElement("h4");
    vekElement.textContent = "Věk";

    const vekPElement = document.createElement("p");
    vekPElement.textContent = zaznam.vek;

    const telefonElement = document.createElement("h4");
    telefonElement.textContent = "Telefon";

    const telefonPElement = document.createElement("p");
    telefonPElement.textContent = zaznam.telefon;

    const emailElement = document.createElement("h4");
    emailElement.textContent = "E-mail";

    const emailPElement = document.createElement("p");
    emailPElement.textContent = zaznam.email;

    const papousekElement = document.createElement("h4");
    papousekElement.textContent = "Papoušek";

    const papousekPElement = document.createElement("p");
    papousekPElement.textContent = zaznam.papousek;

    const smazatButton = document.createElement("button");
    smazatButton.textContent = "Smazat registrovaného";
    smazatButton.addEventListener("click", () => {
      /*Funkce pro smazání záznamu*/
      smazatZaznam(index);
    });

    recordDiv.appendChild(jmenoElement);
    recordDiv.appendChild(jmenoPElement);
    recordDiv.appendChild(vekElement);
    recordDiv.appendChild(vekPElement);
    recordDiv.appendChild(telefonElement);
    recordDiv.appendChild(telefonPElement);
    recordDiv.appendChild(emailElement);
    recordDiv.appendChild(emailPElement);
    recordDiv.appendChild(papousekElement);
    recordDiv.appendChild(papousekPElement);

    /* tlačítko pro smazání pojištěného */
    recordDiv.appendChild(smazatButton); 

    evidenceSection.appendChild(recordDiv);
  });
}

let existujiZaznamy = false;
const zaznamy = [];

/*Převedení na JSON řetězec */
const ulozenaZaznamyJSON = localStorage.getItem("zaznamy");

if (ulozenaZaznamyJSON) {
  const ulozenaZaznamy = JSON.parse(ulozenaZaznamyJSON);
  zaznamy.push(...ulozenaZaznamy); /*Přidej záznam do pole zaznam*/
  existujiZaznamy = true; 
  zobrazZaznamy(); 
} else {
  console.log("Nejsou uloženy žádné záznamy v localStorage.");
}

function smazatZaznam(index) {
  zaznamy.splice(index, 1); /* Odstranit záznam z pole zaznam */
  zobrazZaznamy(); 

  /*Aktualizovat localStorage po smazání*/
  const zaznamyJSON = JSON.stringify(zaznamy);
  localStorage.setItem("zaznamy", zaznamyJSON);
}

odeslatTlacitko.addEventListener("click", function (e) {
  e.preventDefault();

  const jmeno = jmenoInput.value;
  const prijmeni = prijmeniInput.value;
  const vek = vekInput.value;
  const telefon = telefonInput.value;
  const email = emailInput.value;
  const papousek = papousekInput.value;

  if (
    jmeno === "" ||
    prijmeni === "" ||
    vek === "" ||
    telefon === "" ||
    email === "" ||
    papousek === ""
  ) {
    alert("Prosím, vyplňte všechny pole.");
    return;
  }

  if (isNaN(vek) || isNaN(telefon)) {
    alert("Věk a telefon musí obsahovat pouze čísla.");
    return;
  }

  const novyZaznam = {
    jmeno: jmeno,
    prijmeni: prijmeni,
    vek: vek,
    telefon: telefon,
    email: email,
    papousek: papousek,
  };

  zaznamy.push(novyZaznam);

  jmenoInput.value = "";
  prijmeniInput.value = "";
  vekInput.value = "";
  telefonInput.value = "";
  emailInput.value = "";
  papousekInput.value = "";

  evidenceSection.style.display = "none";
  /* zobrazit nové záznamy */
  zobrazZaznamy(); 

  /* proměnná existujiZaznamy na true */
  existujiZaznamy = true;

  /* Převedení pole zaznamy na JSON */
  const zaznamyJSON = JSON.stringify(zaznamy);

  /* Uložení JSON do localStorage */
  localStorage.setItem("zaznamy", zaznamyJSON);

});

  /* Přidání posluchače  tlačítko "registrace" */
showRegistrationButton.addEventListener("click", function (e) {
  e.preventDefault(); // Zabraňte výchozímu chování odkazu

  /* Změň sekci "registrace" na "block" */
  registrationSection.style.display = "block";
});


/* Přidání kliknutí na odkaz registrace*/
showRegistrationButton.addEventListener("click", () => {
  registrationSection.style.display = "block";
  evidenceSection.style.display = "none";
  infoSection.style.display = "none";
  kontaktSection.style.display = "none";
});

/* Přidání kliknutí na odkaz pojištěnci*/
showEvidence.addEventListener("click", () => {
  if (existujiZaznamy) {
    registrationSection.style.display = "none";
    evidenceSection.style.display = "block";
    infoSection.style.display = "none";
    kontaktSection.style.display = "none";
  } else {
    alert("Nejsou žádné záznamy k zobrazení.");
  }
});
/* Přidání kliknutí na odkaz informace*/
showInfoButton.addEventListener("click", () => {
  evidenceSection.style.display = "none";
  registrationSection.style.display = "none";
  infoSection.style.display = "block";
  kontaktSection.style.display = "none";
});

/* Přidání kliknutí na odkaz kontakt*/
showKontakt.addEventListener("click", () => {
  evidenceSection.style.display = "none";
  registrationSection.style.display = "none";
  infoSection.style.display = "none";
  kontaktSection.style.display = "block";
});
