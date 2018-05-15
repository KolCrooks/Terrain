


//DATA
var terrainNoiseMap
var mapsize
var move
var img
function setup(){
    mapsize = createVector(500,250)
    move = createVector(-250,55,600)
    createCanvas(1200, 800, WEBGL);
    terrainNoiseMap = new SimplexNoise() //CreateNoiseMap
}

var rotated = -170
var counter = 0
function draw(){
    counter += 5
    background(100)

    fill(0);
    stroke(255)
    push()
    translate(move)
    rotateX(radians(rotated))
    drawTerrain(genTerrain(mapsize))
    pop()
}


/**
 *
 * @param vec A 2d vector for map size
 */
function genTerrain(vec){
    let w = vec.x
    let h = vec.y
    let d = 5
    let tcloth = [[],[]]
    //loop through 2D array and set the position of each createVector point
    for(var x = 0; x < w/d; x++){
        tcloth[x] = []
        for(var z = 0; z < h/d; z++){
            tcloth[x][z] = {
                "x":x*d,
                "z":z*d,
                "y":terrainNoiseMap.noise(x*d,z*d+counter)*10,
                "vel":createVector(0,0,0)
            }

        }
    }
    return tcloth
}

function drawTerrain(terrain){

    for(var x = 0; x < terrain.length; x++){
        for(var z = 0; z < terrain[x].length; z++) {
            //Check to see if there is a point next to it
            try {
                //Create 2 triangles
                beginShape(TRIANGLE_STRIP);
                vertex(terrain[x][z].x,terrain[x][z].y,terrain[x][z].z)
                vertex(terrain[x + 1][z].x, terrain[x + 1][z].y, terrain[x + 1][z].z)
                vertex(terrain[x][z + 1].x, terrain[x][z + 1].y, terrain[x][z + 1].z)
                endShape(CLOSE);

                beginShape(TRIANGLE_STRIP);
                vertex(terrain[x + 1][z + 1].x, terrain[x + 1][z + 1].y, terrain[x + 1][z + 1].z)
                vertex(terrain[x + 1][z].x, terrain[x + 1][z].y, terrain[x + 1][z].z)
                vertex(terrain[x][z + 1].x, terrain[x][z + 1].y, terrain[x][z + 1].z)
                endShape(CLOSE);
            }catch(e){}
        }
    }
}