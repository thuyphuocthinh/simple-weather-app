
const closeAlertAuto = () => {
    let alertNode = document.getElementById("alert");
    if (alertNode) {
        alertNode.style.transform = "translateX(-105%)";
    }
}

const openAlert = () => {
    let alertNode = document.getElementById("alert");
    if (alertNode) {
        alertNode.style.transform = "translateX(10%)";
    }
    setTimeout(closeAlertAuto, "3000");
}

const closeAlert = () => {
    let alertNode = document.getElementById("alert");
    let closetBtn = document.getElementById("alert__close");
    if (alertNode && closetBtn) {
        alertNode.onclick = () => {
            alertNode.style.transform = "translateX(-105%)";
        }
    }
}



closeAlert();