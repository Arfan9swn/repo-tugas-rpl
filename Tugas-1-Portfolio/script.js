// script.js punya ramzi

// bikin kotak2 huruf WEBSITE pake loop biar ga ngetik manual satu2
var teks = "WEBSITE";
var wadah = document.getElementById("hurufWebsite");
for (var i = 0; i < teks.length; i++) {
  var kotak = document.createElement("span");
  kotak.innerHTML = teks[i];
  wadah.appendChild(kotak);
}

// gatau ini kepake apa engga tapi biarin aja
console.log("website ramzi udah kebuka nih");

// scroll halus pas klik menu navbar
var linkNav = document.querySelectorAll(".navbar a");
for (var j = 0; j < linkNav.length; j++) {
  linkNav[j].addEventListener("click", function (e) {
    var tujuan = this.getAttribute("href");
    if (tujuan && tujuan.startsWith("#") && tujuan.length > 1) {
      e.preventDefault();
      document.querySelector(tujuan).scrollIntoView({ behavior: "smooth" });
    }
  });
}

// iseng2 taro alert kalo klik tombol email, buat testing doang, lupa dihapus
document.querySelector(".isi-kontak-link").addEventListener("click", function () {
  console.log("orang ini mau ngirim email ke ramzi");
});
