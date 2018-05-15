


//DATA
var terrainNoiseMap
var mapsize
var move
var maps
var img
function setup(){
    mapsize = createVector(400,300)
    move = createVector(-200,45,650)
    createCanvas(1200, 800, WEBGL);
    terrainNoiseMap = new SimplexNoise() //CreateNoiseMap
    maps = genTerrain(mapsize)
}

var rotated = -170
var counter = 0
function draw(){
    counter += 10
    background(147,112,219)
    fill(0);
    stroke(255)
    push()
    translate(move)
    rotateX(radians(rotated))
    drawTerrain(maps)
    pop()
}


/**
 *
 * @param vec A 2d vector for map size
 */
function genTerrain(vec){
    let w = vec.x
    let h = vec.y
    let d = 10
    let tcloth = [[],[]]
    //loop through 2D array and set the position of each createVector point
    for(var x = 0; x < w/d; x++){
        tcloth[x] = []
        for(var z = 0; z < h/d; z++){
            tcloth[x][z] = {
                "x":x*d,
                "z":z*d,
                "y":0,
                "vel":createVector(0,0,0)
            }

        }
    }
    return tcloth
}

function drawTerrain(terrain){
    var m = 15
    for(var x = 0; x < terrain.length; x++){
        for(var z = 0; z < terrain[x].length; z++) {
            //Check to see if there is a point next to it
            try {
                //Create 2 triangles
                beginShape(TRIANGLE_STRIP);
                vertex(terrain[x][z].x,terrainNoiseMap.noise(terrain[x][z].x,terrain[x][z].z+counter)*m,terrain[x][z].z)
                vertex(terrain[x + 1][z].x,terrainNoiseMap.noise(terrain[x+1][z].x,terrain[x+1][z].z+counter)*m, terrain[x + 1][z].z)
                vertex(terrain[x][z + 1].x,terrainNoiseMap.noise(terrain[x][z+1].x,terrain[x][z+1].z+counter)*m, terrain[x][z + 1].z)
                endShape(CLOSE);

                beginShape(TRIANGLE_STRIP);
                vertex(terrain[x + 1][z + 1].x, terrainNoiseMap.noise(terrain[x+1][z+1].x,terrain[x+1][z+1].z+counter)*m, terrain[x + 1][z + 1].z)
                vertex(terrain[x + 1][z].x, terrainNoiseMap.noise(terrain[x + 1][z].x,terrain[x + 1][z].z+counter)*m, terrain[x + 1][z].z)
                vertex(terrain[x][z + 1].x, terrainNoiseMap.noise(terrain[x][z + 1].x,terrain[x][z + 1].z+counter)*m, terrain[x][z + 1].z)
                endShape(CLOSE);
            }catch(e){}
        }
    }
}