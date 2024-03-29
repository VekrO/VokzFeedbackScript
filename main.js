let userId = null;
let sender = document.querySelector('[data-user]');
const button = document.querySelector('.data-vokz');
let iframe = document.querySelector('.vokz-iframe');
let container = document.querySelector('.vokz-iframe-container');
let inserted = false;

function insertInBody() {
    if(container) {
        container.classList.add('show');
        document.body.appendChild(container);
    }
}

function removeFromBody() {
    if(container) {
        container.classList.remove('show');
        document.body.removeChild(container);
    }
}

function buttonClickEvent() {

    if(!inserted) {
        insertInBody();
    } else {
        removeFromBody();
    }

    inserted = !inserted;

}

function initButtonConfiguration() {

    if (!button) {
        console.log('[Vokz]: As configurações iniciais não foram encontradas!');
        return;
    }

    button.addEventListener('click', buttonClickEvent);

}

function initIframeConfiguration() {
    if (!container) {
        container = document.createElement('div');
        container.classList.add('vokz-iframe-container');
        iframe = document.createElement('iframe');
        const closeButton = document.createElement('button');
        closeButton.classList.add('vokz-iframe-close-button');
        closeButton.classList.add('fa-solid');
        closeButton.classList.add('fa-circle-xmark');
        closeButton.addEventListener('click', buttonClickEvent);
        iframe.classList.add('vokz-iframe');

        let url = '';

        if(sender && sender.dataset) {
            url = 'http://localhost:4200/widget?id=' + userId + '&sender=' + sender.dataset.user;
        } else {
            url = 'http://localhost:4200/widget?id=' + userId;
        }

        iframe.src = url;
        iframe.frameBorder = 0;
        container.appendChild(closeButton);
        container.appendChild(iframe);

    }
}

function init() {
    const url = new URL(document.currentScript.src);
    const id = url.searchParams.get("id");
    console.log("O ID é:", id);
    if (id) {
        userId = id;
    } else {
        console.log('[Vokz]: As informações de usuário não foram encontradas!');
    }
}

init();

if (userId) {
    initButtonConfiguration();
    initIframeConfiguration();
}
