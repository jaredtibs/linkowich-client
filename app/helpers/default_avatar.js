export function randomDefaultAvatar() {
  const avatarOptions = [
    "../assets/images/default_avatar_blue.svg",
    "../assets/images/default_avatar_pink.svg",
    "../assets/images/default_avatar_purple.svg"
  ];

  let randomNum = Math.floor(Math.random() * avatarOptions.length);
  return require(avatarOptions[randomNum]);
}
