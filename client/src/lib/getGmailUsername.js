function getGmailUsername(email) {
  const atIndex = email.indexOf('@');
  const username = email.slice(0, atIndex);
  return username;
}

export default getGmailUsername;
