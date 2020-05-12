function ready() {
    var elem = document.getElementById("currentPage");

    if (elem != null) {
        elem.innerText = (document.title.split(' | '))[1];
    }
}
document.addEventListener("DOMContentLoaded", ready);