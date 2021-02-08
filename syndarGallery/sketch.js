var rgb = [];
var rgb2 = [];
var xyz = [];
var lms = [];
var pro, deu, tri, mono, change = false;

var boxes = [];
var imgs = [];
var pics = [];
var names = [];
var col;
var x, y, w, h, d;
var onCezanne, onKandinsky, onBasquiat, onHofmann, onKlimt, onMondrian, info, clicked = false;

var onNor = true;
var onPro, onDeu, onTri, onMono = false;

var backHover, backClicked = false;
var soundOnHover, soundOffHover = false;

var home = true;
var start1 = true;
var start2, start3, start4 = false;
var alpha, alpha1, alpha2, alpha3, alpha4, alpha5, alpha6, screenAlpha;
var changeAlpha = false;

var cogD, homeCogD;
var cogClicked, homeCogClicked = false;

var soundOn = true;
var volumeX;
var soundNum;
var homeSoundNum;

var xmargin;
var ymargin;

var val;

function preload() {
  //prelaod fonts (one regular, one bold)
  myFont = loadFont('assets/Butler_Medium.otf');
  myBoldFont = loadFont('assets/Butler_ExtraBold.otf')

  //iterate through and preload 6 images named chronologically
  for(var i = 0; i < 6; i++) {
    imgs[i] = loadImage("assets/image"+(i+1)+".jpg");
  }

  //preload images for artist pages
  //https://paintingandframe.com/buy/paul_cezanne_still_life_with_curtain_1899_framed_print-28114.html
  image1 = loadImage('assets/cezanne.jpg');
  //https://www.arsmundi.com/en/artwork/bild-schweres-rot-1924-gerahmt-882732.html
  image2 = loadImage('assets/kandinsky.jpg');
  //https://www.kingandmcgaw.com/prints/jean-michel-basquiat/untitled-skull-1981-435613#435613::border:50_frame:880229_glass:770007_media:3_mount:108644_mount-width:50_size:548,620
  image3 = loadImage('assets/basquiat.jpg');
  //https://www.wsj.com/articles/hans-hofmann-the-nature-of-abstraction-review-a-vivid-push-and-pull-11573504239
  image4 = loadImage('assets/hofmann.jpg');
  //https://www.popartuk.com/art/gustav-klimt/black-wooden-framed-the-kiss-8624-pp30540-framed-poster.asp
  image5 = loadImage('assets/klimt.jpg');
  //https://www.khanacademy.org/humanities/ap-art-history/later-europe-and-americas/modernity-ap/a/mondrian-composition
  image6 = loadImage('assets/mondrian.jpg');

  //preload misc images for settings and background

  //https://www.hiclipart.com/free-transparent-background-png-clipart-bcdxx
  cog = loadImage('assets/cog.png');
  cog2 = loadImage('assets/cog2.png');
  cog3 = loadImage('assets/cog3.png');
  cog4 = loadImage('assets/cog4.png');
  //https://www.clipartmax.com/middle/m2i8i8d3H7i8b1i8_black-check-mark-png/
  tick = loadImage('assets/tick.png');
  tick2 = loadImage('assets/tick2.png');
  gallery = loadImage('assets/gallery.jpg');

  //preload background audio

  //https://www.youtube.com/watch?v=y5A86JYKfJU
  //royalty free
  jazz = createAudio('assets/jazz.m4a');
  //https://www.youtube.com/watch?v=Y2Ec2eQNfDw
  //royalty free
  talking = createAudio('assets/talking.m4a');

}

function setup() {
  //keep the width and height proportional, but make sure the canvas never extends off the screen
  if(windowWidth < windowHeight*1.683) {
    createCanvas(windowWidth, floor(windowWidth/1.683));
  } else {
    createCanvas(floor(windowHeight*1.683), windowHeight);
  }

  col = color(255);

  //set pixel density to 1 as I am manipulating the screen pixels
  pixelDensity(1);

  //set my downloaded font as the main programme font
  textFont(myFont);

  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 2; j++) {
      //create 6 new boxes across 2 rows to act as the page buttons
      boxes.push(new Box(width/18.29 + i * width/3.2, height/4.2 + j * height/2.53, width/3.76, height/3.7, (3 * j + i) + 1));

      index = j + i * 2;

      //create an array of 6 graphics to mask the boxes with in the draw function
      pics[index] = createGraphics(width, height);
      pics[index].rect(width/18.29 + i * width/3.2, height/4.2 + j * height/2.53, width/3.76, height/3.7, 5);

      imgs[index].resize(width, height);
    }
  }

  //variables to offset slider values relative to eachother
  soundNum = width/35;
  homeSoundNum = 0;

  slider = new volumeSlider(width/2 + width/50 + width/7.36 - width/4 + homeSoundNum, height - height/14.3 - height/1.22, width/20.6,  width/2 + width/50 - width/4 + homeSoundNum, width/10.3);
  slider2 = new volumeSlider(width/2 + width/50 + width/7.36 - width/4 + soundNum, height - height/14.3, width/20.6,  width/2 + width/50 - width/4 + soundNum, width/10.3);

  names = ['cézanne', 'kandinsky', 'basquiat', 'hofmann', "klimt", "mondrian"];

  //resize all images based on size of canvas so they remain proportional
  image1.resize(width/3.43, width/4.46);
  image2.resize((width/3.7)*0.75, width/3.7);
  image3.resize(width/(1.17*2.7), width/2.7);
  image4.resize(width/2.7, width/2.7);
  image5.resize(width/(2.7*1.45), width/(2.7));
  image6.resize(width/(2.7*2.5), width/(2.7*2.5));

  cog.resize(width/20.6, width/20.6);
  cog2.resize(width/20.6, width/20.6);
  cog3.resize(width/14.71, width/14.71);
  cog4.resize(width/14.71, width/14.71);
  tick.resize(width/67.15, width/67.15);
  tick2.resize(width/60.15, width/60.15);

  gallery.resize(width, height);

  //global variables used to dictate some sizes and positions relative to each other
  x = width / 35;
  y = height / 15.5;
  w = width / 10 - width/51.5;
  h = height / 15.5 - height/93.14;

  //variables to move multiple objects relative to eachother (top bar elements)
  xmargin = width/250;
  ymargin = height/70;

  //alpha values for the start pages to fade text (and screens) in and out
  alpha = 255;
  alpha1 = 0;
  alpha2 = 0;
  alpha3 = 0;
  alpha4 = 0;
  alpha5 = 0;
  alpha6 = 0;
  screenAlpha = 255;
}

function draw() {
  background(col);

  //set distance for three buttons in draw so mouseX and mouseY are uodated as the programme runs
  d = dist(mouseX, mouseY, 14 * width / 15.5 + width/51.5, height / 10);
  cogD = dist(mouseX, mouseY, width/51.5 + width/41.2, height - height/9.1 + width/41.2);
  homeCogD = dist(mouseX, mouseY,  width/12 + width/29.42, height/21 + width/29.42);

  //two different sliders control the volume. depending on which slider is being moved they alter each others position so the volume is universal across the programme
  if(!home) {
    volumeX = map(slider2.return(), width/2 + width/50 - width/4 + soundNum, width/2 + width/50 - width/4 + soundNum + width/5.42, 0, 1);
    slider.x = slider2.x - soundNum;
  } else {
    volumeX = map(slider.return(), width/2 + width/50 - width/4, width/2 + width/50 - width/4 + width/5.42, 0, 1);
    slider2.x = slider.x + soundNum;
  }

  if(soundOn) {
    //if sound is playing, the volume is dictated by the sliders
    jazz.volume(volumeX * 0.93);
    talking.volume(volumeX);
  } else {
    //if sound is off volume is zero
    jazz.volume(0);
    talking.volume(0);
  }

  if(onCezanne) {
    cezanne(x, y, w, h);
    //coordinates to place colour filters over the image on cezanne's page
    RGBtoLMS(floor(width - width/3.8 - image1.width/2 + width/60), floor(height/2 + height/30.6 - image1.height/2 + height/40), floor(width - width/3.8 + image1.width/2 - width/70), floor(height/2 + height/30.6 + image1.height/2 - height/40));
  } else if(onKandinsky){
    kandinsky(x, y, w, h);
    //coordinates to place colour filters over the image on kandinsky's page
    RGBtoLMS(floor(width/4 - image2.width/2 + width/280), floor(height/2 + height/40 - image2.height/2 + height/160), floor(width/4 + image2.width/2 - width/280), floor(height/2 + height/40 + image2.height/2 - height/160));
  } else if(onBasquiat){
    basquiat(x, y, w, h);
    //coordinates to place colour filters over the image on basquiat's page
    RGBtoLMS(floor(width - width/4 - width/6.32), floor(height/2 - height/3.6), floor(width - width/4 + width/6.32), floor(height/2 + width/4.8));
  } else if(onHofmann){
    hofmann(x, y, w, h);
    //coordinates to place colour filters over the image on hoffman's page
    RGBtoLMS(floor(width/4 - width/5.4), floor(height/2 - width/5.9), floor(width/4 + width/5.4), floor(height/2 + width/4.8));
  } else if(onKlimt){
    klimt(x, y, w, h);
    //coordinates to place colour filters over the image on klimt's page
    RGBtoLMS(floor(width - width/4 - image5.width/2 + width/90), floor(height/2 + 20 - image5.height/2 + height/60), floor(width - width/4 + image5.width/2 - width/100), floor(height/2 + 20 + image5.height/2 - height/70));
  } else if(onMondrian){
    mondrian(x, y, w, h);
    //coordinates to place colour filters over the image on mondrian's page
    RGBtoLMS(floor(width/4 + 2 - image6.width / 2), floor(height/2 + 13 - image6.height / 2), floor(width/4 - 1 + image6.width / 2), floor(height/2 + 7 + image6.height / 2));
  } else if(home){
    for(var i = 0; i < pics.length; i++) {
      //iterate through images and fill boxes on the screen with them
      imgs[i].mask(pics[i])

      image(imgs[i], 0, 0);
    }
    for(var i = 0; i < boxes.length; i++) {
      //call functions on all boxes in the array
      boxes[i].show();
      boxes[i].detect();
      boxes[i].update();
    }

    if(!homeCogClicked) {
      //volume settings cog on the homepage
      if(homeCogD > max(width/41.2, height/24.48)) {
        //different colour images to appear as a hover over effect
        image(cog3, width/12, height/21);
      } else {
        image(cog4, width/12, height/21);
      }
    }
  }

  if(!info) {
    if(!home) {
      //show info button when not on info page or home page
      noFill();
      infoButton(x+width/103, y+height/100.4);
      //settings button for artist pages
      if(!cogClicked) {
            if(cogD > width/41.2) {
              //different colour images for hover over effect
              image(cog, width/51.5, height - height/9.1);
            } else {
              image(cog2, width/51.5, height - height/9.1);
            }
      } else {
        //function to adjust sound on artist pages
        soundBar();
      }
    }
  } else {
    information(x, y, w, h);
    cogClicked = false;
  }

  if(backClicked) {
    if(!home && !info) {
      //if back button pressed on artist page take user back to homepage
      home = true;
      onCezanne = onKandinsky = onBasquiat = onHofmann = onKlimt = onMondrian = false;
    }

    if(info) {
      info = false;
    }
  }

  if(home && !info) {
  } else {
    //back button on all pages excluding homepage
    backButton(x+width/103, y+height/100.4);
  }

  if(backClicked) {
    //if back button pressed it is ready to be clicked again
    backClicked = false;
  }

  //page background that gradually fades in at beginning of programme to look more smooth
  fill(255, screenAlpha);
  rect(0, 0, width, height);

  if(!start1 && !start2 && !start3 && !start4) {
  } else {
    //start prompts only run at beginning of programme
    startScreen();
  }

  //if start screen exited increment alpha values. different values reflected by counteractive incrementations in startscreen function
  if(changeAlpha) {
    if(alpha > 0) {
      alpha -= 10;
      alpha1 -= 15;
      alpha2 -= 15;
      alpha3 -= 15;
      alpha4 -= 15;
      alpha5 -= 10;
      alpha6 -= 20.625
    } else {
      start1 = false;
      start2 = false;
      start3 = false;
      start4 = false;
      if(screenAlpha > 0) {
        screenAlpha -= 5;
      } else if(screenAlpha == 0) {
        changeAlpha = false;
      }
    }
  }

  if(!homeCogClicked) {
  } else {
    //function to adjust sound on home page
    homeSoundBar(height/1.22);
  }
}

function RGBtoLMS(x_min, y_min, x_max, y_max) {
  loadPixels();

  //x_min, y_min etc are passed in for each painting to signify it's location
  for(var y = y_min; y < y_max; y++) {
    for(var x = x_min; x < x_max; x++) {
      var index = (x+y*width)*4;

      //first access the RGB channels for each pixel on the screen
      r = pixels[index+0];
      g = pixels[index+1];
      b = pixels[index+2];
      a = pixels[index+3];

      if(!mono) {
        //gamma correction
        rgb[index] = pow((pixels[index+0]/255+0.055)/1.055, 2.4);
        rgb[index+1] = pow((pixels[index+1]/255+0.055)/1.055, 2.4);
        rgb[index+2] = pow((pixels[index+2]/255+0.055)/1.055, 2.4);

        //converted using transformation matrix
        xyz[index] = rgb[index]*0.4124564 + rgb[index+1]*0.3575761 + rgb[index+2]*0.1804375;
        xyz[index+1] = rgb[index]*0.2126729 + rgb[index+1]*0.7151522 + rgb[index+2]*0.0721750;
        xyz[index+2] = rgb[index]*0.0193339 + rgb[index+1]*0.1191920 + rgb[index+2]*0.9503041;

        lb = 0.04649755;
        mb = 0.08670142;
        sb = 0.87256922;
        lw = 1;
        mw = 1;
        sw = 1;

        q1 = (lb * sw - lw * sb) / (mb * sw - mw * sb);
        q2 = (lb * mw - lw * mb) / (sb * mw - sw * mb);

        if(!pro) {
          lms[index] = xyz[index]*0.4002 + xyz[index+1]*0.7076 + xyz[index+2]*-0.0808;
        } else {
          //no red cone input
          lms[index] = q1 * lms[index+1] + q2 * lms[index+2];
        }

        if(!deu) {
          lms[index+1] = xyz[index]*-0.2263 + xyz[index+1]*1.1653 + xyz[index+2]*0.0457;
        } else {
          //no green cone input
          lms[index+1] = 0.8513092 * lms[index] + 0.11866992 * lms[index+2];
        }

        if(!tri) {
          lms[index+2] = xyz[index]*0 + xyz[index+1]*0 + xyz[index+2]*0.9182;
        } else {
          //no blue cone input
          lms[index+2] = -0.86744736 * lms[index] + 1.86727089 * lms[index+1];
        }

        rgb2[index] = lms[index]*5.47221206 + lms[index+1]*-4.6419601 + lms[index+2]*0.16963708;
        rgb2[index+1] = lms[index]*-1.1252419 + lms[index+1]*2.29317094 + lms[index+2]*-0.1678952
        rgb2[index+2] = lms[index]*0.02980165 + lms[index+1]*-0.19318073 + lms[index+2]*1.16364789;

        //reapply gamma
        r = 255 * (1.055 * pow(rgb2[index], 0.41666) - 0.055);
        g = 255 * (1.055 * pow(rgb2[index+1], 0.41666) - 0.055);
        b = 255 * (1.055 * pow(rgb2[index+2], 0.41666) - 0.055);

        //reassign corrected colours to the pixel channels
        pixels[index] = r;
        pixels[index+1] = g;
        pixels[index+2] = b;
        pixels[index+3] = a;
      } else {
        //variable for blue-cone monochromacy
        var w = r * 0.01775 + g * 0.10945 + b * 0.87262;

          pixels[index] = w;
          pixels[index+1] = w;
          pixels[index+2] = w;
          pixels[index+3] = w;
      }
    }
  }

  updatePixels();
}

function Box(xpos, ypos, boxW, boxH, i) {
  this.x = xpos;
  this.y = ypos;
  this.length = boxW;
  this.height = boxH;
  this.boxDetected = false;

  this.show = function() {
    noFill();
    noStroke();
    //homepage artist buttons
    rect(this.x, this.y, this.length, this.height, 4);

    fill(255);
    //artist name tags
    rect(this.x - 5, this.y + this.height*0.74, this.length * 0.6, this.height*0.17);

    fill(0);
    textSize(width/50);
    text(names[i-1], this.x + this.length / 2 - width / 8.5, this.y + this.height / 2 + height / 10.2);

    textSize(width / 23);
    if(!homeCogClicked){
      //if sound isn't being altered
      text("sýndar gallery", width/2 - textWidth("sýndar gallery")/2, height / 8);
    }

    if(this.boxDetected == true) {
      fill(255, 70);
      //hover over effect
      rect(this.x, this.y, this.length, this.height, 4);
    }
  }

  this.detect = function() {
    if((mouseX > this.x && mouseX < this.x + this.length && mouseY > this.y && mouseY < this.y + this.height) && !info && !start1 && !start2 && !start3 && !start4) {

      this.boxDetected = true;
    } else {
      this.boxDetected = false;
    }
  }

  this.update = function() {
    cogClicked = false;
    if(this.boxDetected == true && mouseIsPressed) {
      //conditional. whichever box you're hovering over when you click the mouse will take you to that page
      switch(i) {
        case 1:
          onCezanne = true;
          break;
        case 2:
          onKandinsky = true;
          break;
        case 3:
          onBasquiat = true;
          break;
        case 4:
          onHofmann = true;
          break;
        case 5:
          onKlimt = true;
          break;
        case 6:
          onMondrian = true;
          break;
      }
    }

    //set filters back to normal when you come off an artists page
    change = false;
    pro = false;
    deu = false;
    tri = false;
    mono = false;
  }
}

function cezanne() {
  //cannot alter homepage sound volume on artist pages
  homeCogClicked = false;
  image(gallery, 0, 0);
  topBar();

  noStroke();
  fill(0);
  textSize(width / 65.8);

  push();
  textFont(myBoldFont);
  text("paul cézanne", width/6.87 - width/25, height/3.4);
  text("oranges,", width/6.87 - width/25, height/3.07);
  pop();

  text("(b. 1839)", width/6.87 + textWidth("paul cézanne") + width/90 - width/25, height/3.4);
  text("1890", width/6.87 + textWidth("oranges,") + width/100 - width/25, height/3.07);

  push();
  textSize(width / 77.6);
  // /https://www.musee-orsay.fr/en/collections/works-in-focus/painting/commentaire_id/apples-and-oranges-7153.html?S=1&tx_commentaire_pi1%5BpidLi%5D=509&tx_commentaire_pi1%5Bfrom%5D=841&cHash=b3ebec33f3&print=1&no_cache=1&
  text("though cézanne painted still life compositions from the \nstart of his career, it was only in later years that this genre \nbegan to occupy an essential place in his work. oranges \nbelongs to this period. it forms part of a series of six still \nlifes produced in 1899 in cézanne's parisian studio. \n\neach painting features the same accessories: earthenware \ndishes and a jug decorated with a floral motif. their \narrangement is also similar, with a draped cloth, reminiscent \nof 17th century flemish still lifes, closing the perspective. \nhowever, the dynamic effect created by a complex spatial \nconstruction and cézanne's subjective perception of the \narranged objects illustrate his essentially pictorial approach.", width/6.87 - width/25, height/2.448)
  pop();

  push();
  imageMode(CENTER);
  image(image1, width - width/3.8, height/2 + height/30.6);
  pop();

  //change = true therefore filter buttons can be clicked and changed
  change = true;
  home = false;
}

function kandinsky() {
  //cannot alter homepage sound volume on artist pages
  homeCogClicked = false;
  image(gallery, 0, 0);
  topBar();

  noStroke();
  fill(0);
  textSize(width / 65.8);

  push();
  textFont(myBoldFont);
  text("wassily kandinsky", width - 2.5 * width/6.87 - width/20, height/3.4 + height/43 + height/35);
  text("heavy red,", width - 2.5 * width/6.87 - width/20, height/3.07 + height/43 + height/35);
  pop();

  text("(b. 1866)", width - 2.5 * width/6.87 + textWidth("wassily kandinsky") + width/70 - width/20, height/3.4 + height/43 + height/35);
  text("1924", width - 2.5 * width/6.87 + textWidth("heavy red,") + width/90 - width/20, height/3.07 + height/43 + height/35);

  push();
  textSize(width / 73.6);
  //https://www.tate.org.uk/whats-on/tate-modern/exhibition/kandinsky-path-abstraction/kandinsky-path-abstraction-room-guide
  text('wassily kandinsky made the first steps to \nabstraction in 1908. during this time we see \nhis works become compositions, in which the \nsynaesthete looks for colour patterns and shape \ndependencies. therefore, kandinsky tried to explore \ngeometric shapes and calculated colour schemes \nsystematically. from the period of his teaching \nat bauhaus, the painting "heavy red" originates.', width - 2.5 * width/6.87 - width/20, height/2.448 + height/43 + height/35)
  pop();

  push();
  imageMode(CENTER);
  image(image2, width/4, height/2 + height/40);
  pop();

  //change = true therefore filter buttons can be clicked and changed
  change = true;
  home = false;
}

function basquiat() {
  //cannot alter homepage sound volume on artist pages
  homeCogClicked = false;
  image(gallery, 0, 0);
  topBar();

  noStroke();
  fill(0);
  textSize(width / 65.8);

  push();
  textFont(myBoldFont);
  text("jean-michel basquiat", width/9, height/3.4 + height/100);
  text("untitled (skull),", width/9, height/3.07 + height/100);
  pop();

  text("(b. 1960)", width/9 + textWidth("jean-michel basquiat") + width/70, height/3.4 + height/100);
  text("1981", width/9 + textWidth("untitled (skull),") + width/60, height/3.07 + height/100);

  push();
  textSize(width / 77.6);
  //https://www.thebroad.org/art/jean-michel-basquiat/untitled
  text("many of jean-michel basquiat’s paintings are in some way \nautobiographical, and untitled may be considered a form \nof self-portraiture. the skull here exists somewhere between \nlife and death. the eyes are listless, the face is sunken in, and \nthe head looks lobotomized and subdued. yet there are wild \ncolors and spirited marks that suggest a surfeit of internal activity. \n\ndeveloping his own personal iconography, in this early work \nbasquiat both alludes to modernist appropriation of african \nmasks and employs the mask as a means of exploring identity. \nbasquiat labored over this painting for months — evident in \nthe worked surface and imagery — while most of his pieces \nwere completed with bursts of energy over just a few days.", width/9, height/2.448 + height/100)
  pop();

  push();
  imageMode(CENTER);
  image(image3, width - width/4, height/2 + height/30.6);
  pop();

  //change = true therefore filter buttons can be clicked and changed
  change = true;
  home = false;
}

function hofmann() {
  //cannot alter homepage sound volume on artist pages
  homeCogClicked = false;
  image(gallery, 0, 0);
  topBar();

  noStroke();
  fill(0);
  textSize(width / 65.8);

  push();
  textFont(myBoldFont);
  text("hans hofmann", width - 2.5 * width/6.87 - width/40, height/3.4 + height/43);
  text("sanctum sanctorum,", width - 2.5 * width/6.87 - width/40, height/3.07 + height/43);
  pop();

  text("(b. 1880)", width - 2.5 * width/6.87 + textWidth("hans hofmann") + width/80 - width/40, height/3.4 + height/43);
  text("1962", width - 2.5 * width/6.87 + textWidth("sanctum sanctorum,") + width/70 - width/40, height/3.07 + height/43);

  push();
  textSize(width / 73.6);
  //https://www.wsj.com/articles/hans-hofmann-the-nature-of-abstraction-review-a-vivid-push-and-pull-11573504239
  text("in the juicy, jewel-like paintings “sanctum \nsanctorum (holy of holies—holy place)”, \ncolored rectangles and ground hover between \nopaque and fluid, near and far, atmosphere and \nvolume—all shining and pulsing within the plane. \n\nthe picture feels alive, becoming, evolving, working \nout it’s own fate. in this and other mature paintings, \nhofmann explores color, form and space—“push and \npull”—as living elements and forces, bodily experiences \nworthy of devotion.", width - 2.5 * width/6.87 - width/40, height/2.448 + height/43)
  pop();

  push();
  imageMode(CENTER);
  image(image4, width/4, height/2 + height/30.6);
  pop();

  //change = true therefore filter buttons can be clicked and changed
  change = true;
  home = false;
}

function klimt() {
  //cannot alter homepage sound volume on artist pages
  homeCogClicked = false;
  image(gallery, 0, 0);
  topBar();

  noStroke();
  fill(0);
  textSize(width / 65.8);

  push();
  textFont(myBoldFont);
  text("gustav klimt", width/6.87 - width/30, height/3.4 + height/40);
  text("the kiss,", width/6.87 - width/30, height/3.07 + height/40);
  pop();

  text("(b. 1862)", width/6.87 + textWidth("gustav klimt") + width/90 - width/30, height/3.4 + height/40);
  text("1907-1908", width/6.87 + textWidth("the kiss,") + width/100 - width/30, height/3.07 + height/40);

  push();
  textSize(width / 73.6);
  //https://blog.artsper.com/en/a-closer-look/art-analysis-the-kiss-by-klimt/
  text("gustav klimt’s the kiss is the archetype \nof tenderness and passion. this shimmering, \ncolourful, love scene of two faces and bodies \nembracing each other, is conserved at the \nbelvedere museum in vienna. \n\nalthough clearly extravagant, the gold leaf \ncovered canvas does not compromise the \nprofound significance behind the work.", width/6.87 - width/30, height/2.448 + height/40)
  pop();

  push();
  imageMode(CENTER);
  image(image5, width - width/4, height/2 + 20);
  pop();

  //change = true therefore filter buttons can be clicked and changed
  change = true;
  home = false;
}

function mondrian() {
  //cannot alter homepage sound volume on artist pages
  homeCogClicked = false;
  image(gallery, 0, 0);
  topBar();

  noStroke();
  fill(0);
  textSize(width / 65.8);

  push();
  textFont(myBoldFont);
  text("piet mondrian", width - 2.7 * width/6.87 - width/20, height/3.4 + height/43);
  text("composition with red, blue and yellow,", width - 2.7 * width/6.87 - width/20, height/3.07 + height/43);
  pop();

  text("(b. 1872)", width - 2.7 * width/6.87 + textWidth("piet mondrian") + width/70 - width/20, height/3.4 + height/43);
  text("1930", width - 2.7 * width/6.87 + textWidth("composition with red, blue and yellow,") + width/37 - width/20, height/3.07 + height/43);

  push();
  textSize(width / 73.6);
  //https://www.khanacademy.org/humanities/ap-art-history/later-europe-and-americas/modernity-ap/a/mondrian-composition
  text("mondrian’s composition with red, blue, and yellow \ndemonstrates his commitment to relational opposites, \nasymmetry, and pure planes of color. mondrian \ncomposed this painting as a harmony of contrasts that \nsignify both balance and the tension of dynamic forces. \n\nmondrian viewed his black lines not as outlines but as \nplanes of pigment in their own right; an idea seen in the \nhorizontal black plane on the lower right of the painting \nthat stops just short of the canvas edge", width - 2.7 * width/6.87 - width/20, height/2.448 + height/43)
  pop();

  push();
  imageMode(CENTER);
  image(image6, width/4, height/2 + 10);
  pop();

  //change = true therefore filter buttons can be clicked and changed
  change = true;
  home = false;
}

function information() {
    //cannot alter homepage sound volume on information pages
  homeCogClicked = false;
  fill(255, 250);
  rect(0, 0, width, height);

  push();
  textAlign(CENTER);

  push();
  noStroke();
  fill(0);
  //change font to make text bold
  textFont(myBoldFont);
  textSize(width / 46);
  text("protanopia  - ", width/7, height/3.65);
  text("deuteranopia   - ", width/7.75, height/2.3);
  text("tritanopia  - ", width/6.75, height/1.64);
  text("monochromacy   - ", width/8.2, height/1.295);
  pop();

  textSize(width / 55.8);
  fill(0);
  push();

  textAlign(LEFT);

  push();
  textSize(width / 23);
  text("sýndar gallery", width/2 - textWidth("sýndar gallery")/2, height / 8);
  pop();

  //https://www.britannica.com/science/protanopia
  text("blindness to red is known as protanopia, a state in which the red cones are absent, leaving only \nthe cones that absorb blue and green light.", width/4.4, height/3.7);

  //https://www.britannica.com/science/deuteranopia
  text("blindness to green is known as deuteranopia, wherein green cones are lacking and blue and red \ncones are functional.", width/4.4, height/2.3);

  //https://www.britannica.com/science/tritanopia
  text("tritanopia (blindness to blue, usually with the inability to distinguish between blue and yellow) \noccurs when blue cones are absent.", width/4.4, height/1.66);

  //https://www.cs.mcgill.ca/~rwest/wikispeedia/wpcd/wp/c/Color_blindness.htm#:~:text=By%20etiology&text=Monochromacy%2C%20also%20known%20as%20%22total,is%20reduced%20to%20one%20dimension.
  text('monochromacy (also known as "total color blindness") is the lack of ability to distinguish colors; \ncaused by cone defect or absence. monochromacy occurs when two or all three of the cone \npigments are missing and color and lightness vision is reduced to one dimension.', width/4.4, height/1.3);
  pop();
  pop();
}

function backButton(backX, backY) {
    noFill();
    stroke(0);
    strokeWeight(width/550);
    rect(backX, backY, w, h, width / 320);

    noStroke();
    fill(0);
    textSize(width / 45);
    text("back", backX + width / 58.3, backY + height / 25.2);

    //if mouse hovered over button, hover over effect
    if(mouseX > backX && mouseX < backX + w && mouseY > backY && mouseY < backY + h) {
      fill(0, 30);
      rect(backX, backY, w, h, width / 320);
      backHover = true;
    } else {
      backHover = false;
    }

    if(backClicked) {
      backClicked = false;
    }
}

function topBar() {
  var add = width/33;
  noStroke();
  textSize(width / 55);

  //hover over effect on word which mouse is hovered over
  if((mouseX > width/6.5 + add - xmargin && mouseX < width/6.5 + add + textWidth("normal") + xmargin && mouseY < y + height/22 + ymargin && mouseY > y + height/22 - textAscent("normal") - ymargin) && !info) {
    fill(110);
    onNor = true;
  } else {
    fill(0);
    onNor = false;
  }
  text("normal", width/6.5 + add, y + height / 22);

  if((mouseX > width/3.9 + add - xmargin && mouseX < width/3.9 + add + textWidth("protanopia") + xmargin && mouseY < y + height/22 + ymargin && mouseY > y + height/22 - textAscent("protanopia") - ymargin)  && !info) {
    fill(110);
    onPro = true;
  } else {
    fill(0);
    onPro = false;
  }
  text("protanopia", width/3.9 + add, y + height / 22);

  if((mouseX > width/2.57 + add - xmargin && mouseX < width/2.57 + add + textWidth("deuteranopia") + xmargin && mouseY < y + height/22 + ymargin && mouseY > y + height/22 - textAscent("deuteranopia") - ymargin) && !info) {
    fill(110);
    onDeu = true;
  } else {
    fill(0);
    onDeu = false;
  }
  text("deuteranopia", width/2.57 + add, y + height / 22);

  if((mouseX > width/1.85 + add - xmargin && mouseX < width/1.85 + add + textWidth("tritanopia") + xmargin && mouseY < y + height/22 + ymargin&& mouseY > y + height/22 - textAscent("tritanopia") - ymargin) && !info) {
    fill(110);
    onTri = true;
  } else {
    fill(0);
    onTri = false;
  }
  text("tritanopia", width/1.85 + add, y + height / 22);

  if((mouseX > width/1.5 + add - xmargin && mouseX < width/1.5 + add + textWidth("monochromacy") + xmargin && mouseY < y + height/22 + ymargin && mouseY > y + height/22 - textAscent("monochromacy") - ymargin) && !info) {
    fill(110);
    onMono = true;
  } else {
    fill(0);
    onMono = false;
  }
  text("monochromacy", width/1.5 + add, y + height / 22);


  fill(0);
  //draw line under word which colour filter is currently on
  if(pro) {
    rect(width/3.9 + add, y + height / 15.5, textWidth("protanopia"), width/700, width/206);
  } else if(deu) {
    rect(width/2.57 + add, y + height / 15.5, textWidth("deuteranopia"), width/700, width/206);
  } else if(tri) {
    rect(width/1.85 + add, y + height / 15.5, textWidth("tritanopia"), width/700, width/206);
  } else if(mono){
    rect(width/1.5 + add, y + height / 15.5, textWidth("monochromacy"), width/700, width/206);
  } else {
    rect(width/6.5 + add, y + height / 15.5, textWidth("normal"), width/700, width/206);
  }

  textSize(width / 66.8);
  push();
  textAlign(CENTER);
  if(!info) {
    fill(0);
    if(!cogClicked) {
      //user suggestion to help with ease of using the programme. only show when sound is not being altered
      text("click the subheadings to change between different colour vision deficiencies", width/2, height - height/16);
    }

    noFill();
    stroke(0);
    strokeWeight(width/1030);
  }
  pop();
}

function infoButton(infoX, infoY) {
  strokeWeight(width / 550);
  num = 10;

  noFill();
  stroke(0);
  strokeWeight(width/550);
  rect(width - infoX - w, infoY, w, h, width / 320);

  noStroke();
  fill(0);
  textSize(width / 45);
  text("info", width - (infoX + width / 58.3) - w/1.95, infoY + height / 25.2);

  //if mouse is over box create hover effect
  if(mouseX > width - infoX - w && mouseX < width - infoX && mouseY > infoY && mouseY < infoY + h) {

    fill(0, 30);
    rect(width - infoX - w, infoY, w, h, width / 320);
    //if mouse is pressed on box take to information page
    if(mouseIsPressed) {
      info = true;
    }
  }
}

function mousePressed() {
  //change to normal filter
  if(onNor) {
    pro = false;
    deu = false;
    tri = false;
    mono = false;
  }
  //change to protanopia
  if(onPro) {
    pro = true;
    deu = false;
    tri = false;
    mono = false;
  }
  //change to deuteranopia
  if(onDeu) {
    pro = false;
    deu = true;
    tri = false;
    mono = false;
  }
  //change to tritanopia
  if(onTri) {
    pro = false;
    deu = false;
    tri = true;
    mono = false;
  }
  //change to monochromacy
  if(onMono) {
    pro = false;
    deu = false;
    tri = false;
    mono = true;
  }
  //turn sound on and off
  if(!soundOn && soundOnHover) {
    soundOn = true;
  } else if(soundOn && soundOffHover){
    soundOn = false;
  }
  //boolean for dragging slider
  MP = true;
}

function mouseReleased() {
  //click cues for start screen
  if(start1 && !start2 && !start3 && !start4) {
    alpha5 = 255;
    start2 = true;
  } else if(start1 && start2 && !start3 && !start4) {
    alpha2 = 255;
    start3 = true;
  } else if(start1 && start2 && start3 && !start4) {
    alpha3 = 255;
    start4 = true;
  } else if(start1 && start2 && start3 && start4) {
    //begin altering alpha values to fade into home screen
    changeAlpha = true;
    //turn audio on as you enter gallery
    jazz.loop();
    talking.loop();

  }

  if(cogD <  width/41.2) {
    //artist page sound button
    cogClicked = true;
  }

  if(homeCogD < max(width/41.2, height/24.48) && home && !start1) {
    //homepage sound button
    homeCogClicked = true;
  }

  if(backHover) {
    //back button
    backClicked = true;
  }

  //boolean for dragging slider
  MP = false;
}

function volumeSlider(x, y, length, start, end) {
  this.clicked = false;
  this.buttonW = width/180;
  this.buttonH = height/28.5;
  this.x = x;
  this.y = y;
  this.start = start;
  this.end = this.x + length;
  //allows for the mouse to be dragged faster than the slider but not lose contact with it
  this.gap = 0;
  this.col = 255;

  this.move = function() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.buttonH - 0.5 * (this.buttonH - this.buttonW)) {
      if (MP && this.clicked == false) {
        this.gap = mouseX - this.x;
        this.clicked = true;
    }
    //set colour based on whether it's clicked or not
    this.col = 100;
    } else {
      this.col = 0;
    }
    if (this.clicked == true) {
      this.col = 170;
      soundOn = true;
    }
    if (MP == false && this.clicked == true) {
      this.clicked = false;
    }
    if (this.clicked) {
      this.x = mouseX - this.gap;
      //keep it within the slider length. cannot exceed it's bounds
      this.x = constrain(this.x, this.start, this.end);
    }
  }

  this.display = function() {
    //draw the slider
    stroke(0);
    strokeWeight(1.5);
    line(this.start, this.y, this.end, this.y);
    noStroke();
    fill(this.col);
    rect(this.x, this.y, this.buttonW, this.buttonH, width/500);
  }

  this.return = function() {
    return this.x;
  }
}

function startScreen() {
  push();

  fill(255, alpha);
  rect(0, 0, width, height);

  if(start1) {
    if(alpha1 < 255) {
      alpha1 += 5;
    }

    if(alpha1 == 255 && alpha5 < 255) {
      alpha5 += 5;
    }
    fill(0, alpha1);
    textSize(width/40);
    text("welcome to                           , a virtual exhibition showcasing some of the \nmost famous pieces of art from the last three centuries.", width/20, height/2 - height/4 - height/10.12);
    push();
    textFont(myBoldFont);
    text("sýndar gallery", width/20 + width/7.6, height/2 - height/4 - height/10.12);
    pop();

    fill(0, alpha2);
    textSize(width/55);
    text("the purpose of this gallery is to explore the relationship between art and colour. does art continue to serve it’s \npurpose if it cannot be perceived how the artist intended?", width/20, height/2 - height/15 - height/10.12);

    fill(0, alpha3);
    text("to answer this question I have created four colour filters, each emulating a different colour vision deficiency (more \ncommonly known as colour blindness).", width/20, height/2 + height/8.5 - height/9.8);

    fill(0, alpha4);
    text("explore the gallery and then ask yourself: how does the ability (or inability) to see colour change your perception \nof the images in front of you?", width/20, height/2 + height/5);
  }

  if(start2 & alpha2 < 255) {
    alpha2 += 5;
  }

  if(start3 && alpha3 < 255) {
    alpha3 += 5;
  }

  if(start4) {
    //different incrementations of alpha alter their corresponding incrementations when changeAlpha = true
    alpha5 -= 10.625;

    if(alpha5 <= 0 && alpha6 < 255) {
      alpha6 += 10.625;
    }

    if(alpha4 < 255) {
      alpha4 += 5;
    }

    fill(0, alpha6);
    textSize(width/70);
    text("click anywhere to enter the gallery and start exploring", width/20, height/2 + height/2.6);
  }

  fill(0, alpha5);
  textSize(width/70);
  text("click anywhere to continue", width/20, height/2 + height/2.6);

  pop();
}

function soundBar() {
    fill(0);
    push();
    rectMode(CENTER);
    slider2.move();
    slider2.display();
    pop();

    textSize(width/60);
    text("sound              ", width/2 + width/15 + soundNum, height - height/16);
    text("sound volume                           ", width/6.8 + soundNum, height - height/16);

    strokeWeight(width/687);
    noFill();
    stroke(0);
    line(width/2 + width/21.9 + width/8.3 + soundNum, height/1.13 + height/45, width/2 + width/21.9 + width/8.3 + soundNum, height/1.08 + height/45);

    if(soundOn) {
      line(width/2 + width/34.3 + width/9 + soundNum, height - height/18, width/2 + width/34.3 + textWidth("on") + width/9 + soundNum, height - height/18);
    } else {
      line(width/2 + width/15.8 + width/9 + soundNum, height - height/18, width/2 + width/15.8 + textWidth("off") + width/9 + soundNum, height - height/18);
    }

    //hover over cogs to activate sound bar
    if(mouseX > width/2+width/34.3-textWidth("on")/2 + width/9 + soundNum && mouseX < width/2 + width/34.3-textWidth("on")/2 + textWidth("on") + width/8  + soundNum&& mouseY > height - height/16 - textAscent('on') && mouseY < height - height/16 - textAscent('on') + textAscent("on")){
      soundOnHover = true;
    } else {
      soundOnHover = false;
    }

    //hover over button to exit sound bar
    if(mouseX > width/2 + width/15.4 - textWidth("off")/2 + width/9 + soundNum && mouseX < width/2 + width/15.4 - textWidth("off")/2 + textWidth("off") + width/8 + soundNum && mouseY > height - height/16 - textAscent('off') - height/61.2 && mouseY < height - height/16 - textAscent('off') + textAscent("off")){
      soundOffHover = true;
    } else {
      soundOffHover = false;
    }

    push();
    noStroke();
    if(soundOnHover) {
      fill(130);
    } else {
      fill(0);
    }
    text("on", width/2 + width/34.3 + width/9 + soundNum, height - height/16);
    pop();

    push();
    noStroke();
    if(soundOffHover) {
      fill(130);
    } else {
      fill(0);
    }
    text("off", width/2 + width/15.85 + width/9 + soundNum, height - height/16);
    pop();

    pop();

    if(dist(mouseX, mouseY, width - width/27.8, height - height/10.7 + height/47.1) < width/76.3) {
      fill(180);
      if(mouseIsPressed) {
        cogClicked = false;
      }
    } else {
      noFill();
    }

    strokeWeight(min(2.5, width/515));
    ellipse(width - width/27.8, height - height/10.7 + height/47.1, width/38.1);
    image(tick, width - width/22.9, height - height/11.6 + height/408);
}

function homeSoundBar(yOffset) {
  fill(0);
  push();
  rectMode(CENTER);
  slider.move();
  slider.display();
  pop();

  textSize(width/60);
  text("sound              ", width/2 + width/15 + homeSoundNum, height - height/16 - yOffset);
  text("sound volume                           ", width/6.8 + homeSoundNum, height - height/16 - yOffset);

  strokeWeight(width/687);
  noFill();
  stroke(0);
  line(width/2 + width/21.9 + width/8.3 + homeSoundNum, height/1.13 + height/45 - yOffset, width/2 + width/21.9 + width/8.3 + homeSoundNum, height/1.08 + height/45 - yOffset);

  if(soundOn) {
    line(width/2 + width/34.3 + width/9 + homeSoundNum, height - height/18 - yOffset, width/2 + width/34.3 + textWidth("on") + width/9 + homeSoundNum, height - height/18 - yOffset);
  } else {
    line(width/2 + width/15.8 + width/9 + homeSoundNum, height - height/18 - yOffset, width/2 + width/15.8 + textWidth("off") + width/9 + homeSoundNum, height - height/18 - yOffset);
  }

  //hover over cogs to activate sound bar
  if(mouseX > width/2+width/34.3-textWidth("on")/2 + width/9 + homeSoundNum && mouseX < width/2 + width/34.3-textWidth("on")/2 + textWidth("on") + width/8  + homeSoundNum&& mouseY > height - height/16 - textAscent('on') - yOffset && mouseY < height - height/16 - textAscent('on') + textAscent("on") - yOffset){
    soundOnHover = true;
  } else {
    soundOnHover = false;
  }

  //hover over button to exit sound bar
  if(mouseX > width/2 + width/15.4 - textWidth("off")/2 + width/9 + homeSoundNum && mouseX < width/2 + width/15.4 - textWidth("off")/2 + textWidth("off") + width/8 + homeSoundNum && mouseY > height - height/16 - textAscent('off') - height/61.2 - yOffset && mouseY < height - height/16 - textAscent('off') + textAscent("off") - yOffset){
    soundOffHover = true;
  } else {
    soundOffHover = false;
  }

  push();
  noStroke();
  if(soundOnHover) {
    fill(130);
  } else {
    fill(0);
  }
  text("on", width/2 + width/34.3 + width/9 + homeSoundNum, height - height/16 - yOffset);
  pop();

  push();
  noStroke();
  if(soundOffHover) {
    fill(130);
  } else {
    fill(0);
  }
  text("off", width/2 + width/15.85 + width/9 + homeSoundNum, height - height/16 - yOffset);
  pop();

  pop();

  if(dist(mouseX, mouseY, width - width/10.73, height - height/10.7 - yOffset + height/55.64) < width/66.45) {
    fill(220);
    if(mouseIsPressed) {
      homeCogClicked = false;
    }
  } else {
    noFill();
  }

  strokeWeight(min(3, width/468));
  ellipse(width - width/10.73, height - height/10.7 - yOffset + height/55.64, width/33.22);
  image(tick2, width - width/9.8, height - height/12 - yOffset - height/174.86);
}
