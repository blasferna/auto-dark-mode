(function () {
  const getCurrentMode = function () {
    let mode = localStorage.getItem("mode");
    if (!mode) {
      mode = "light";
    }
    return mode;
  };

  const changeMode = function (toggler) {
    let mode = getCurrentMode();
    if (toggler) {
      toggler.checked = mode === "dark";
    }
    if (mode === "dark") {
      DarkReader.setFetchMethod(window.fetch);
      DarkReader.enable({
        brightness: 100,
        contrast: 90,
        sepia: 10,
      });
    } else {
      DarkReader.disable();
    }
  };

  const configure = function () {
    const darkSwitch = document.getElementById("dark-switch");
    if (darkSwitch) {
      darkSwitch.addEventListener("change", function (e) {
        if (darkSwitch.checked) {
          localStorage.setItem("mode", "dark");
        } else {
          localStorage.setItem("mode", "light");
        }
        changeMode(darkSwitch);
      });
    }
    changeMode(darkSwitch);
  };

  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  ready(function () {
    configure();
  });

  changeMode();
})();
