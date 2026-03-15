const DAYS = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const MONTHS = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
const links = JSON.parse(localStorage.getItem('links')) || []; //Parte link
window.NAME = localStorage.getItem('NAME') ?? 'User'; //Nome dell'utente

function aggiornaListaSettings() {
    const container = document.getElementById('linkListSettings');
    container.innerHTML = '';

    links.forEach((link, i) => {
        const row = document.createElement('div');
        const nomeLink = link.nome;
        
        const label = document.createElement('label');
        label.textContent = i+1 + '° Link: ' + nomeLink.charAt(0).toUpperCase() + nomeLink.slice(1);
        
        const removeBtn = document.createElement('button');
        const icon = document.createElement('img');
        icon.src = 'assets/trash.svg';
        icon.width = 30;
        icon.draggable = false;
        removeBtn.appendChild(icon)
        removeBtn.onclick = () => {
            links.splice(i, 1);
            localStorage.setItem('links', JSON.stringify(links));
            aggiornaListaSettings();
            render();
        };
        
        row.appendChild(label);
        row.appendChild(removeBtn);
        container.appendChild(row);
    });
}

function apriPopup() {
    document.getElementById('inputValoreNome').value = window.NAME;
    document.getElementById('popupImpostazioni').style.display = 'block';
    aggiornaListaSettings();
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

function update() {
    const oraAttuale = new Date();
    const h = String(oraAttuale.getHours()).padStart(2, '0');
    const m = String(oraAttuale.getMinutes()).padStart(2, '0');

    document.getElementById('clock').textContent = `${h}:${m}`;
    document.getElementById('date').textContent =
        `${DAYS[oraAttuale.getDay()]} ${oraAttuale.getDate()} ${MONTHS[oraAttuale.getMonth()]}`;
}

function stampaMessaggio() {
    const MESSAGGIDISPONIBILI = ['Buongiorno', 'Buon pomeriggio', 'Buonasera'];
    const oraAttuale = new Date();
    const h = oraAttuale.getHours();
    let MESSAGGIO = '';

    if (h >= 5 && h < 14) MESSAGGIO = MESSAGGIDISPONIBILI[0];
    else if (h >= 14 && h < 18) MESSAGGIO = MESSAGGIDISPONIBILI[1];
    else MESSAGGIO = MESSAGGIDISPONIBILI[2];
    
    document.getElementById('welcomeText').textContent = `${MESSAGGIO}, ${NAME}!`;
}
document.querySelectorAll('.search-engine').forEach(button => {
    button.onclick = () => {
        const searchBar = document.getElementById('searchBar');
        const query = searchBar.value.trim();
        const baseUrl = button.getAttribute('data-url');
        
        if (query) {
            window.location.href = baseUrl + encodeURIComponent(query);
        } else {
            // Aggiunge la classe errore
            searchBar.classList.add('search-error');
            
            // La rimuove automaticamente dopo 500ms o quando l'utente scrive
            searchBar.oninput = () => searchBar.classList.remove('search-error');
            setTimeout(() => searchBar.classList.remove('search-error'), 500);
        }
    };
});

function render() {
    const container = document.getElementById('linkContainer');
    container.innerHTML = '';

    links.forEach((link, i) => {
        const btn = document.createElement('button');
        btn.style.display = 'flex';
        btn.style.flexDirection = 'column';
        btn.style.alignItems = 'center';

        const img = document.createElement('img');
        img.src = `https://www.google.com/s2/favicons?domain=${link.url}&sz=64`;
        img.style.width = '44px';
        img.style.height = '44px';
        img.draggable = false;

        const label = document.createElement('span');
        label.textContent = link.nome.charAt(0).toUpperCase() + link.nome.slice(1);



        btn.appendChild(img);
        btn.appendChild(label);
        btn.onclick = () => window.location.href = link.url;
        container.appendChild(btn);
    });

    if (links.length < 10) {
        const add = document.createElement('button');
        add.textContent = '+';
        add.onclick = aggiungiLink;
        container.appendChild(add);
    }
}

function aggiungiLink() {
    document.getElementById('popupLink').style.display = 'block';
}

function salvaLink(){
    const nome = document.getElementById('inputNomeSito').value;
    const url = document.getElementById('inputUrlSito').value;
    if (url && nome) {
        links.push({ url, nome });
        localStorage.setItem('links', JSON.stringify(links));
        render();
    }
    chiudiPopupLink();
}

function chiudiPopupLink(){
    document.getElementById('popupLink').style.display = 'none';
}


document.addEventListener('keydown', function(e) {
    const popupImpostazioni = document.getElementById('popupImpostazioni').style.display === 'block';
    const popupLink = document.getElementById('popupLink').style.display === 'block';

    if (e.key === 'Escape') {
        if (popupImpostazioni) chiudiPopup();
        if (popupLink) chiudiPopupLink();
    }
    if (e.key === 'Enter') {
        if (popupImpostazioni) salva();
        else if (popupLink) salvaLink();
        else {
            const query = document.getElementById('searchBar').value;
            if (e.shiftKey) window.location.href = 'https://www.duckduckgo.com/search?q=' + encodeURIComponent(query);
            else window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
        }
    }
});

update();
setInterval(update, 1000);
stampaMessaggio()
render();
