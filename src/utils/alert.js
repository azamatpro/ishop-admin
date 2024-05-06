/* eslint-disable */
export const hideAlert = () => {
  const el = document.querySelector('.murkup');
  const parentElement = el.parentElement;
  if (el) parentElement.removeChild(el);
};

// type is 'success' or 'error'
export const showAlert = (type, msg) => {
  const alertStyles = `
  position: fixed;
  top: 0;
  left: 50%;
  width: 400px;
  transform: translateX(-50%);
  z-index: 1003;
  font-size: 1.2rem;
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  text-align: center;
`;
  const markup = `<div style="${alertStyles}" class="murkup alert  alert-${type}">${msg}</div>`;

  const body = document.body;
  body.insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};
