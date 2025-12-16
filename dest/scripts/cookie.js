const tmplCookie = `
  <div class="cookie" id="cookie">
    <div class="cookie__row">
      <div class="cookie__text">By continuing to use the site, you agree to the processing of <a href="cookie-policy.html">cookie</a></div>
      
      <div class="cookie__actions">
        <button class="btn btn--accent cookie__btn" id="cookie-accept">Accept</button>
        <button class="btn btn--secondary cookie__btn" id="cookie-decline">Decline</button>
      </div>
    </div>
  </div>
`;

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
      '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function checkcookie() {
  let cookieNote = document.getElementById('cookie');
  let cookieBtnAccept = document.getElementById('cookie-accept')
  let preloader = document.getElementById('preloader');

  if (!getCookie('cookie_policy')) {
      cookieNote.classList.add('show');
  }

  cookieBtnAccept.addEventListener('click', function () {
    setCookie('cookie_policy', 'true', 365);

    cookieNote.classList.remove('show');

    cookieNote.classList.add('cookie--fadeOut');
  });
}
function addCookie() {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', tmplCookie);
    checkcookie();
  });
}

addCookie();
