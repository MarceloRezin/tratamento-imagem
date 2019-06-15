var img = new Image();
img.src = 'cachorro.jpg';

var ALTURA;
var LARGURA;

var canvas;
var ctx;

img.onload = function () {
    init();
};

function init() {
    canvas = document.getElementById('img');

    ALTURA = img.height;
    LARGURA = img.width;

    let ca = document.getElementById('imgOriginal');
    ca.height = ALTURA;
    ca.width = LARGURA;

    let ctx2 = ca.getContext('2d');
    ctx2.drawImage(img, 0, 0);

    canvas.height = ALTURA;
    canvas.width = LARGURA;

    ctx = canvas.getContext('2d');

    reset();
}

function reset() {
    ctx.drawImage(img, 0, 0);
}

function grid() {
    reset();

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    // i = y, j = x
    for (let i=0,k=0; i < ALTURA; i+=4, k = i * (LARGURA * 4) ) {

        for(let j=k; j< (i + 1) * LARGURA * 4; j += 4 * 4){
            data[j]     = 0; // red
            data[j + 1] = 0; // green
            data[j + 2] = 0; // blue
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function grid4x4() {
    reset();

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for(let i=0; i<ALTURA; i+=8){
        for(let j=i; j<i+4; j++){
            for(k=0; k<LARGURA; k+=8){
                for(l=k; l< k + 4; l++){
                    let p = getPosByXY(l, j);
                    data[p] = 0;
                    data[p + 1] = 0;
                    data[p + 2] = 0;
                }
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function vermelho() {
    reset();

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for (let i=0; i<data.length; i+=4) {
        data[i + 1] = 0; // green
        data[i + 2] = 0; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}

function verde() {
    reset();

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for (let i=0; i < data.length; i+= 4) {
        data[i]     = 0; // red
        data[i + 2] = 0; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}

function azul() {
    reset();

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for (let i=0; i<data.length; i+=4) {
        data[i]     = 0; // red
        data[i + 1] = 0; // green
    }
    ctx.putImageData(imageData, 0, 0);
}

function selecionarNariz() {
    reset();

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for(let i=Math.floor(ALTURA / 2) + 19; i<ALTURA - 100; i++){
        for(let j=Math.floor(LARGURA / 2) + 5; j<Math.floor(LARGURA / 2) + 46; j++){
            let p = getPosByXY(j, i);

            let lum = ( data[p] * 299 + data[p+1] * 587 + data[p+2] * 114) / 1000; //Calculo de luminosidade da cor

            if(lum < 145){
                data[p + 1] = 255;
                data[p + 2] = 0;
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function getPosByXY(x, y) {
    return y * (LARGURA * 4) + x * 4;
}