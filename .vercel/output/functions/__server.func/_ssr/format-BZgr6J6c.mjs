const naira = (n) => `₦${Math.round(n).toLocaleString("en-NG")}`;
export {
  naira as n
};
