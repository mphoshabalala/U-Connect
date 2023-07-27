

const hamburgerMenu = document.querySelector('#menu');
const menuItems = document.querySelector('.menu-Items');
const body = document.querySelector('.body');
const cards = document.querySelectorAll('.card-primary');
const buttons = document.querySelector('.btn-primary');
const purchase = document.getElementById('purchase');
const primaryHeader  =document.querySelector('#color-shift');
// const rotate = document.querySelector('.rotate');
// const check = document.querySelector('.check');
// const successStory = document.querySelector('.success-story');
 

// MENUBAR 

//Variables For menuBar
let li1 = document.createElement('li');
let li2 = document.createElement('li');
let li3 = document.createElement('li');
let a1 = document.createElement('a');
let a2 = document.createElement('a');
let a3 = document.createElement('a');

hamburgerMenu.addEventListener('click', (e) => {
    e.target = hamburgerMenu;
    // menuItems.innerHTML = ' ';
    if (!menuItems.innerHTML.trim()) {
        e.target = li1;
        e.target = menuItems;
        appendChildrenTomenuItems();
        listenToAClick();
        dimBackground();

       
    }else if(!menuItems.contains(e.target)){
        hideMenubar();
        undimBackground();
    }
    else {
        hideMenubar();
        undimBackground();
        
    } 

    e.preventDefault();
});

addEventListener('resize', () => {
    if(innerWidth > 800){
        menuItems.style.display = 'none';
        div.style.display = 'none';
        undimBackground();
    }
});

const arrowUp = document.createElement('a');
const arrowImg = document.createElement('img');
arrowUp.appendChild(arrowImg);
arrowUp.setAttribute('class', 'primary-Icons');
arrowUp.setAttribute('href', '#body');
arrowImg.setAttribute('src', 'arrow-up.png');
arrowImg.style.height = '2rem'
arrowUp.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    display: none;
`;

body.appendChild(arrowUp);

addEventListener('scroll', () => {
    if(window.scrollY > 0){
        arrowUp.style.display = 'flex';
        primaryHeader.style.cssText = `
        background-color: #003295;
        transition: background-color 1s ease;;
        `;

    }
    else{
        arrowUp.style.display = 'none';
        primaryHeader.style.cssText = `
        background-color: none;
        transition: background-color .5s ease;`;
    }

    
});

document.addEventListener('click', (e) => {
    if(!hamburgerMenu.contains(e.target)){
        hideMenubar();
        undimBackground();
    }

    e.preventDefault();

    
});


// utilities

function hideMenubar(){ 
    menuItems.innerHTML = '';
    menuItems.style.display = 'none';
}

function appendChildrenTomenuItems(){
    a1.setAttribute('href', '/studentPosts');
    a2.setAttribute('href', '/tutorPosts');
    a3.setAttribute('href', '#');

    a1.innerText = 'Find Students';
    a2.innerText = 'Find Tutors';
    a3.innerText = 'Collaborate';

    li1.append(a1);
    li2.append(a2);
    li3.append(a3);


    menuItems.append(li1, li2, li3);
    menuItems.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 500;
    padding: 1rem;
    position: fixed;
    top: 4.7rem;
    background-color: #2d4299;
    width: 100vw;
    color: #fff;`;
}

function listenToAClick(){
    a1.addEventListener('click', () => {
        hideMenubar();
        undimBackground();
    });

    a2.addEventListener('click', () => {
        hideMenubar();
        undimBackground();
    });

    a3.addEventListener('click', () => {
        hideMenubar();
        undimBackground();
    });

    menuItems.addEventListener('mouseout',() =>{
        hideMenubar();
        undimBackground();
    });
}

function dimBackground(){
    body.style.cssText =  `
        background-color: rgba(0, 0, 0, 0.5);
        overflow-y: hidden;
    `;
    cards.forEach((card) =>{
        card.style.cssText =  `
            background-color:  rgba(214, 226, 255, .5);
        `;
    });
}

function undimBackground(){
    body.style.cssText =  `
        background-color: rgba(0, 0, 0, 0.0);
    `;
    cards.style.cssText =  `
        // background-color: rgba(0, 0, 0, 0.8);
    `;

    buttons.style.cssText = `
        border-color: rgba(0, 0, 0, .5);
    `;
}


// PURCHASE

//Global Variables
const div = document.createElement('div');
const container = document.createElement('div');
container.style.cssText = `
    position: relative;
    padding-top: 5rem;
`;

const cancel = document.createElement('img');
cancel.setAttribute('src', 'cancel.png');
cancel.setAttribute('class', 'primary-Icons');
cancel.setAttribute('id', 'cancel');
cancel.style.cssText = `
    position: absolute;
    right: 1rem;
`;

const purchaseUL = document.createElement('ul');
const purchaseLI1 = document.createElement('li');
const purchaseLI2 = document.createElement('li');
const purchaseLI3 = document.createElement('li');

const purchaseAnchor1 = document.createElement('a');
const purchaseAnchor2 = document.createElement('a');
const purchaseAnchor3 = document.createElement('a');

purchaseAnchor1.innerText = 'Amazon Books';
purchaseAnchor2.innerText = 'Takealot Books';
purchaseAnchor3.innerText = 'Alibaba Books';
purchaseLI1.appendChild(purchaseAnchor1);
purchaseLI2.appendChild(purchaseAnchor2);
purchaseLI3.appendChild(purchaseAnchor3);
purchaseUL.append(purchaseLI1, purchaseLI2, purchaseLI3);

purchaseUL.style.cssText = `
    color: #f2f2f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;




container.append(cancel, purchaseUL);
div.appendChild(container);
purchase.addEventListener('click', () => {

    div.style.cssText = `
        position: fixed;
        top: 0;
        left: 0rem;
        height: 100%;
        width: 80%;
        background-color: #000;
        z-index: 9;
    `;

    body.appendChild(div);
    dimBackground();

    // e.preventDefault();
});

cancel.addEventListener('click', ()=>{
    div.style.display = 'none';
        undimBackground();
});


