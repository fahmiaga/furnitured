module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#e8cdba",
        secondary: "#c4a187",
      },
      fontFamily: {
        body: ["Poppins"],
      },
      boxShadow: {
        card: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;",
      },
      zIndex: {
        "-10": "-10",
      },
      // borderStyle: ["hover"],
      backgroundImage: {
        "hero-pattern":
          "url('https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
      },
      fontSize: {
        xxs: "10px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
