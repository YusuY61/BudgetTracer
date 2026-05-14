function ozetiGuncelle() {
    var toplamGelir = 0;
    var toplamGider = 0;

    for (var i = 0; i < harcamalar.length; i++) {
        var k = harcamalar[i];
        if (k.tur === "income") {
            toplamGelir = toplamGelir + k.tutar;
        } else {
            toplamGider = toplamGider + k.tutar;
        }
    }

    var bakiye = toplamGelir - toplamGider;

    document.getElementById("toplam-gelir").textContent = paraFormatla(toplamGelir);
    document.getElementById("toplam-gider").textContent = paraFormatla(toplamGider);
    document.getElementById("bakiye").textContent = paraFormatla(bakiye);
}
