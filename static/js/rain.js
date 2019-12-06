let rainSketch = function(p){
    p.raindrops = [];
    p.font;
    
    p.preload = function() {
        p.font = p.loadFont('https://joschahenningsen.github.io/static/font/RobotoMonoforPowerline.ttf');
    }

    p.setup = function() {
        p.createCanvas(p.displayWidth, p.displayHeight);
        for (let i = 0; i < 400; i++) {
            p.raindrops[p.raindrops.length]={
                x:p.random(0, p.displayWidth),
                y:p.random(-p.displayHeight,p.displayHeight),
                z:p.random(0,5)
            }
        }
        p.textSize(16);
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont(p.font);
        p.frameRate(120);
        p.fullscreen();
    }

    p.draw = function(){
        // draw score text
        p.background("#0f111a");
        p.fill(255);
        p.text("quit: q/click anywhere", 120, 20);
        p.stroke(255);
        p.raindrops.forEach(element => {
            p.line(element.x, element.y, element.x+element.z/2, element.y+element.z*1.5);
            element.y+=5+element.z;
            element.x+=element.z/3;
            if(element.y>p.displayHeight){
                element.x = p.random(-50, p.displayWidth);
                element.y = 0;
            }
        });
    }

    p.keyPressed = function() {
        if (p.keyCode === 81) {
            var elem = document.getElementById("defaultCanvas0");
            if(elem!==null)
                elem.parentNode.removeChild(elem);
        }
    }

    p.mouseClicked = function() {
        var elem = document.getElementById("defaultCanvas0");
        if(elem!==null)
            elem.parentNode.removeChild(elem);
    }
}