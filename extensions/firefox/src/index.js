const constants = {
  appURL: 'http://localhost:3000',
  CSS: `
  button {
      border: none;
      position: absolute;
      top: 0;
      left: 0;
      padding: 0;
      height: 25px;
      width: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 7px;
      border-radius: 40px;
      box-shadow: 0px 0px 4px #999;
      background-color: #000;
      margin: 0;
  }
  
  button:hover {
      background-color: #dadada;
      transform: scale(1.13);
  }

  button:hover svg {
    fill: black
  }
  `,
};

function htmlDecode(input) {
  const e = document.createElement('textarea');
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function init() {
  const $$ = (selctor) => document.querySelectorAll(selctor);

  $$('pre, code').forEach((el) => {
    const inside = htmlDecode(el.textContent);

    if (el.querySelector('save-btn-js')) return;

    // If parent has `save-btn-js` inside, don't add button
    if (el.parentNode.querySelector('save-btn-js')) return;

    if (inside.length < 30) return;

    const saveBTN = document.createElement('save-btn-js');
    const shadow = saveBTN.attachShadow({ mode: 'open' });

    const parent = el.parentNode;

    Object.assign(saveBTN.style, {
      display: 'inline',
      position: 'absolute',
      height: 0,
      width: 0,
      'z-index:': 9999,
      right: 20 + "px",
      top: 0,
    });

    shadow.innerHTML = `
  <style>${constants.CSS}</style>
  <button><svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="white">
  <path d="M42 13.85V39q0 1.2-.9 2.1-.9.9-2.1.9H9q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h25.15Zm-3 1.35L32.8 9H9v30h30ZM24 35.75q2.15 0 3.675-1.525T29.2 30.55q0-2.15-1.525-3.675T24 25.35q-2.15 0-3.675 1.525T18.8 30.55q0 2.15 1.525 3.675T24 35.75ZM11.65 18.8h17.9v-7.15h-17.9ZM9 15.2V39 9Z"/></button> 
  `;

    el.appendChild(saveBTN);

    saveBTN.addEventListener('click', () => {
      console.log(inside);
    });

    el.style.position = 'relative';
  });
}

setTimeout(init, 1000);
setInterval(init, 1000);
