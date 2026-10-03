const cookiesFrame = document.getElementsByClassName('cookies')[0];
const cookiesAcceptButton = document.getElementsByClassName('cookies-button-yes')[0];
const cookiesDenyButton = document.getElementsByClassName('cookies-button-no')[0];

if (!localStorage.getItem('cookies')) {
    cookiesFrame.classList.add('active');
}

cookiesAcceptButton.addEventListener('click', () => {
    cookiesFrame.classList.remove('active');

    localStorage.setItem('cookies', 'true');
});

cookiesDenyButton.addEventListener('click', () => {
    cookiesFrame.classList.remove('active');

    localStorage.setItem('cookies', 'false');
});

if (localStorage.getItem('cookies') === 'true') {
    gtag('consent', 'update', {'analytics_storage': 'granted'});
}