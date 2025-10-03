let cBox = document.getElementById("colorBox")
let colorBtn = document.getElementById("changecolor")
let imgBox = document.getElementById("FrogImage") 
let imageBtn = document.getElementById("toggleImage")

let assignRandomColor = function()
{
    let rComp = 255 * Math.random()
    let gComp = 255 * Math.random()
    let bComp = 255 * Math.random()
    cBox.style.backgroundColor = "rgb(" + rComp + ", " + gComp + ", "+ bComp + ")"
}

const toggleFrogImage = () =>
{
    console.log (imgBox.src)
    if(imgBox.src.includes("frog1"))
    {
        imgBox.src = "assets/frog0.jpg"
    }
    else
    {
        imgBox.src = "assets/frog1.jpg"
    }
}

imageBtn.addEventListener("click", toggleFrogImage)
colorBtn.addEventListener("click", assignRandomColor)  