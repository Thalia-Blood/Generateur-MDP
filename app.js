const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const passwordOutput = document.getElementById('password-output');
const copyStatus = document.getElementById('copy-status');

generateBtn.addEventListener('click', async () => {
  const url = 'https://api.motdepasse.xyz/create/?include_lowercase&include_uppercase&include_digits&exclude_similar_characters&add_custom_characters=!?&password_length=14&quantity=1';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.passwords && data.passwords.length > 0) {
      const password = data.passwords[0];
      passwordOutput.textContent = password;
      copyBtn.style.display = 'inline-block';
      copyStatus.textContent = '';
    } else {
      passwordOutput.textContent = 'Erreur de génération.';
    }
  } catch (error) {
    passwordOutput.textContent = 'Erreur lors de la requête.';
    console.error(error);
  }
});

copyBtn.addEventListener('click', () => {
  const password = passwordOutput.textContent;
  if (!password) return;

  navigator.clipboard.writeText(password)
    .then(() => {
      copyStatus.textContent = '✅ Copié dans le presse-papier !';
    })
    .catch(() => {
      copyStatus.textContent = '❌ Échec de la copie.';
    });
});
