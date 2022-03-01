export const deleteToken = () => {
  setInterval(function () {
    console.log("token");
  }, 2000);
};

export const deleteInterval = () => {
  clearInterval(deleteToken);
};

// export default deleteToken;
