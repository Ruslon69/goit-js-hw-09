const formState = {
  email: '',
  message: '',
};

const storageKey = 'feedback-form-state';
const form = document.querySelector('form.feedback-form');

try {
  const savedState = JSON.parse(localStorage.getItem(storageKey));
  formState.email =
    typeof savedState?.email === 'string' ? savedState.email.trim() : '';
  formState.message =
    typeof savedState?.message === 'string' ? savedState.message.trim() : '';
} catch {
  // Ignore malformed saved data and keep the initial empty state.
}

form.elements.email.value = formState.email;
form.elements.message.value = formState.message;

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name !== 'email' && name !== 'message') {
    return;
  }

  formState[name] = value.trim();
  localStorage.setItem(storageKey, JSON.stringify(formState));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formState.email || !formState.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formState);
  localStorage.removeItem(storageKey);
  form.reset();
  formState.email = '';
  formState.message = '';
});
