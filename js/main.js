document.addEventListener('DOMContentLoaded', () => {

    let pantalla = document.querySelector("#pantalla");
    let hipopotam = document.querySelector("#hipopotam");

    // Centrar hipopotam al centre verticalment
    const alturaH = hipopotam.clientHeight / 2;
    const alturaPantalla = pantalla.clientHeight / 2;
    const centrarVertical = alturaPantalla - alturaH;

    // Centrar hipopotam al centre horitzontalment
    const ampladaH = hipopotam.clientWidth / 2
    const ampladaPantalla = pantalla.clientWidth / 2
    const centrarHoritzontal = ampladaPantalla - ampladaH;

    // CENTRAR AL MIG
    hipopotam.style.top = centrarVertical + "px";
    hipopotam.style.left = centrarHoritzontal + "px";



    //Control per teclat
    // window.addEventListener('keydown',function(ev){
    //     //Per simular mateix efecte que amb el ratolí cal ubicar eix coordenades (x,y) al centre de l'objecte
    //     let x = hipopotam.offsetLeft + hipopotam.clientWidth/2;
    //     let y = hipopotam.offsetTop + hipopotam.clientHeight/2;

    //     switch(ev.key)
    //     {
    //         case 'ArrowDown'    :   hipopotam.style.top = getTopBoxPosition(y+2) + "px";
    //                                 console.log("Avall");
    //                                 break;
    //         case 'ArrowUp'      :   hipopotam.style.top = getTopBoxPosition(y-2) + "px";
    //                                 console.log("Amunt");
    //                                 break;
    //         case 'ArrowLeft'    :   hipopotam.style.left = getLeftBoxPosition(x-2) + "px";
    //                                 console.log("Esquerra");
    //                                 break;
    //         case 'ArrowRight'   :   hipopotam.style.left = getLeftBoxPosition(x+2) + "px";
    //                                 console.log("Dreta");
    //                                 break;
    //     }
    //     detectarXoc();
    // },false);





    // EVITAR QUE SOBREPASI ELS MARGES
    function detectarXocMarges() {
        if (hipopotam.offsetLeft < 0)
            hipopotam.style.left = 0;
        if (hipopotam.offsetTop < 0)
            hipopotam.style.top = 0;
        if (hipopotam.offsetTop + hipopotam.clientHeight > pantalla.clientHeight)
            hipopotam.style.top = (pantalla.clientHeight - hipopotam.clientHeight) + "px";
        if (hipopotam.offsetLeft + hipopotam.clientWidth > pantalla.clientWidth)
            hipopotam.style.left = (pantalla.clientWidth - hipopotam.clientWidth) + "px";
    }



    //Control per ratolí
    window.addEventListener('mousemove', function (ev) {
        const offsetY = hipopotam.clientHeight / 2.5;
        const offsetX = hipopotam.clientWidth / 2;
        hipopotam.style.top = ev.clientY - offsetY + "px";
        hipopotam.style.left = ev.clientX - offsetX + "px";
        console.log(alturaPantalla);

        detectarXoc();
        detectarXocMarges();
    }, false);



    let boles = generateBalls(20); 

    function generateBalls(amountBalls) {
        //Creem una llista/array de boles buida
        const boles = [];
        let color;
        let left;
        let top;
        let size;
        let text;
        //Bucle per generar el número de boles (amountBalls)
        for (let i = 0; i < amountBalls; i++) {

            // Creació de la bola
            boles[i] = document.createElement("div");
            document.body.appendChild(boles[i]);

            // Tamany de la bola
            size = generarNumero(2, 10);
            boles[i].style.width = size + "vw";
            boles[i].style.height = size + "vw";

            // Posició de la bola
            left = generarNumero(0, pantalla.clientWidth - boles[i].clientWidth);
            top = generarNumero(0, pantalla.clientHeight - boles[i].clientHeight);
            boles[i].style.position = "absolute";
            boles[i].style.left = left + "px";
            boles[i].style.top = top + "px";

            // Bordes de la bola
            boles[i].style.border = "solid black 2px";
            boles[i].style.margin = 5 + "px";
            boles[i].style.borderRadius = "100%";

            // Funció retornar color
            color = generarColor(); // Genera numero aleatori per el color
            boles[i].style.backgroundColor = color;
            boles[i].setAttribute("id", "bola" + i);
            boles[i].setAttribute("class", color);
        }
        //Retornem la llista de boles generades (la farem servir després)
        return boles;
    }

    function generarColor() {
        let num;
        let color = ["red", "blue", "yellow", "green"];
        num = Math.round(generarNumero(0, 3));
        return color[num];
    }

   


    let qttBoles = 0;
    qttBolesGrogues();
    function qttBolesGrogues() {
        
        boles.forEach(groc => {
            if (groc.style.backgroundColor === "yellow") {
                qttBoles++;
            }
        });
        console.log("contador: ", qttBoles);
        
    }

    let valor = 0;

    function detectarXoc() {
        for (let i = 0; i < 20; i++) {
            const latDret = hipopotam.offsetLeft + hipopotam.clientWidth > boles[i].offsetLeft;
            const latEsq = hipopotam.offsetLeft < boles[i].offsetLeft + boles[i].clientWidth;
            const altSup = hipopotam.offsetTop < boles[i].offsetTop + boles[i].clientHeight;
            const altInf = hipopotam.offsetTop + hipopotam.clientHeight > boles[i].offsetTop;


            if (latDret && latEsq && altSup && altInf) {
                if (boles[i].style.backgroundColor == "yellow") {
                    console.log("ha tocat groc");
                    valor++;
                    boles[i].remove();
                    qttBoles--;
                }
                else if (boles[i].style.backgroundColor != "yellow") {
                    console.log("no es groc");
                    valor--;
                    boles[i].remove();
                }
                if (qttBoles == 0) {
                    pantallaFinal();
                }
            }
        }
    }

    function pantallaFinal() {
        pantalla.innerHTML = " ";
        let info = document.createElement("h1");
        let punts = document.createElement("h2");
        document.body.appendChild(info);
        document.body.appendChild(punts);
        if (valor > 0) 
        {
            info.innerHTML = "VICTORY!";
            punts.innerHTML = "Puntuació: " + valor;
        }
        else
        {
            info.innerHTML = "Game Over!";
            punts.innerHTML = "Puntuació: " + valor;
        }
        info.style.textAlign = "center";
        punts.style.textAlign = "center";
    }



    // GENERAR NÚMEROS ALEATORIS
    function generarNumero(min, max) {
        let num = Math.random() * (max - min) + min;
        return num;
    }


}, false);