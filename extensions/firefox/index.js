const constants = {
  appURL: 'http://localhost:3000',
};

function saveSnippet(snippet) {
  return fetch(`${constants.appURL}/snippets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(snippet),
  });
}

const $$ = (selctor) => document.querySelectorAll(selctor);

$$('pre, code').forEach((el) => {
  console.error(el);

  el.onclick = () => {
    alert('Saving snippet...');
    saveSnippet({
      code: el.innerText,
      language: el.className,
    }).then(() => {
      alert('Snippet saved!');
    });
  };
});
