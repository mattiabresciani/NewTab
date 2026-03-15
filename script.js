window.NAME = localStorage.getItem('NAME') ?? 'User'; //Nome dell'utente

function apriPopup() { //Apre il popup delle impostazini
    document.getElementById('inputValoreNome').value = window.NAME;
    document.getElementById('popupImpostazioni').style.display = 'block';
}
function salva() { 
    window.NAME = document.getElementById('inputValoreNome').value;
    localStorage.setItem('NAME', window.NAME); 
    chiudiPopup();
    stampaMessaggio();
}
function chiudiPopup() {
    document.getElementById('popupImpostazioni').style.display = 'none';
}
document.addEventListener('keydown', function(e) { //esc e enter per uscire/salvare
    if (e.key === 'Escape') chiudiPopup();
    if (e.key === 'Enter') salva();
});

const DAYS = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const MONTHS = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

function update() {
    const oraAttuale = new Date();
    const h = String(oraAttuale.getHours()).padStart(2, '0');
    const m = String(oraAttuale.getMinutes()).padStart(2, '0');

    document.getElementById('clock').textContent = `${h}:${m}`;
    document.getElementById('date').textContent =
        `${DAYS[oraAttuale.getDay()]} ${oraAttuale.getDate()} ${MONTHS[oraAttuale.getMonth()]}`;
}

update();
setInterval(update, 1000);

function stampaMessaggio() {
    const MESSAGGIDISPONIBILI = ['Buongiorno', 'Buon pomeriggio', 'Buonasera'];
    const oraAttuale = new Date();
    const h = oraAttuale.getHours;
    let MESSAGGIO = '';

    if (h >= 5 && h < 14) MESSAGGIO = MESSAGGIDISPONIBILI[0];
    else if (h >= 14 && h < 18) MESSAGGIO = MESSAGGIDISPONIBILI[1];
    else MESSAGGIO = MESSAGGIDISPONIBILI[2];
    
    document.getElementById('welcomeText').textContent = `${MESSAGGIO}, ${NAME}!`;
}
stampaMessaggio()

document.addEventListener('keydown', function(e) {  //Shift+enter e enter per ddg e google.
    if (e.key === 'Enter') {
        const query = document.getElementById('searchBar').value;
        if (e.shiftKey) {
            window.location.href = 'https://www.duckduckgo.com/search?q=' + encodeURIComponent(query);
        } else {
            window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
        }
    }
});