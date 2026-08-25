(() => {
  const STORAGE = "bellwork.v1";
  const EX = window.BELLWORK_EXERCISES;

  function art(id) {
    if (!id) return "";
    return `<img class=\"ex-svg\" alt=\"\" src=\"art/${id}.gif\" onerror=\"this.onerror=null;this.src='${id}.gif'\">`;
  }
})();
