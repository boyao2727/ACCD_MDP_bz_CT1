let cBox = document.getElementById("colorBox")
let colorBtn = document.getElementById("changecolor")

let assignRandomColor = function()
{
    let rComp = 255 * Math.random()
    let gComp = 255 * Math.random()
    let bComp = 255 * Math.random()
    cBox.style.backgroundColor = "rgb(" + rComp + ", " + gComp + ", "+ bComp + ")"
}



colorBtn.addEventListener("click", assignRandomColor)  