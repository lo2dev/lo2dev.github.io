const defaultColor = "#a51d2d";
const cp = document.querySelector("#cp");
const title = document.querySelector("#title");
const label = document.querySelector(".label");
const inputs = document.querySelectorAll(".inputs");

const hexIn = document.querySelector("#hex");
const rgbIn = document.querySelector("#rgb");
const hslIn = document.querySelector("#hsl");

window.addEventListener("load", startup, false);

function startup()
{
    cp.value = hexIn.value = defaultColor;
    rgbIn.value = "rgb(" + hexToRgb(defaultColor) + ")";
    hslIn.value = hexToHsl(defaultColor);

    title.style.color = defaultColor;
    label.style.color = defaultColor;
    inputs.forEach(input => {
        input.style.borderColor = defaultColor;
    });

    listenEvent(hexIn);
    listenEvent(cp);
}

function update(event)
{
    cp.value = title.style.color = label.style.color = event.target.value;
    inputs.forEach(input => {
        input.style.borderColor = cp.value;
    });

    hexIn.value = event.target.value;
    rgbIn.value = "rgb(" + hexToRgb(cp.value) + ")";
    hslIn.value = hexToHsl(cp.value);
}

/* if value is hex return hex, if value is rgb convert hex rgb, if value is hsl convert hex to hsl */

function listenEvent(func)
{
    func.addEventListener("input", update, false);
    func.addEventListener("change", update, false);
}

/* yes, taken from stackoverflow */
const hexToRgb = hex =>
      hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                  ,(m, r, g, b) => '#'+ r + r + g + g + b + b)
      .substring(1).match(/.{2}/g)
      .map(x => parseInt(x, 16))

/* yes, taken from a github gist */
function hexToHsl(hex, valuesOnly = false)
{
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    let cssString = '';
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min)
    {
        h = s = 0;
    }
    else
    {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max)
        {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d+ 4; break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    cssString = h + ',' + s + '%,' + l + '%';
    cssString = !valuesOnly ? 'hsl(' + cssString + ')' : cssString;

    return cssString;
}
