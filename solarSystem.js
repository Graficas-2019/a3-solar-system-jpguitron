/*
Checar problema del anillo de saturno
Preguntar por el cinturon de asteroides textura y bump map
Preguntar cuantas lunas
Preguntar sobre los controles
Phong o lambert?
el bump map del sol no sale
*/ 



var renderer = null, 
scene = null, 
camera = null,
root = null,

sunRotation = null,
mercuryRotationOrbit = null,
venusRotationOrbit = null,
earthRotationOrbit = null,
marsRotationOrbit = null,
jupiterRotationOrbit = null,
saturnRotationOrbit = null,
uranusRotationOrbit = null,
neptuneRotationOrbit = null,
plutoRotationOrbit = null,

mercuryRotation = null,
venusRotation = null,
earthRotation = null,
marsRotation = null,
jupiterRotation = null,
saturnRotation = null,
uranusRotation = null,
neptuneRotation = null,
plutoRotation = null,

earthMoonRotationOrbit = null,
marsMoon1RotationOrbit = null,
marsMoon2RotationOrbit = null,
genericMoon1RotationOrbit = null,
genericMoon2RotationOrbit = null,


sphere = null,
sphereEnvMapped = null,
orbitControls = null;


var offset = 6;
var baseMercury = 13 + offset; 
var baseVenus = 15 + offset*2; 
var baseEarth = 17 + offset*3; 
var baseMars = 19 + offset*4; 
var baseJupiter = 21 + offset*5; 
var baseSaturn = 23 + offset*6; 
var baseUranus = 25 + offset*7;
var baseNeptune = 27 + offset*8; 
var basePluto = 29 + offset*9; 

var speedRotationOrbit = 0.000;
var speedRotationPlanets = 0.000;
var distance = 0;


var duration = 20000; // ms
var currentTime = Date.now();

function rotationSpeedPlanets(s)
{
    speedRotationPlanets = s
    $("#scale").html("scale: " + s);
}

function rotationSpeedOrbit(s)
{
    speedRotationOrbit = s
    $("#scale").html("scale: " + s);
}

function dist(scale)
{
    sunRotation.scale.set(scale, scale, scale);
    mercuryRotationOrbit.scale.set(scale, scale, scale);
    venusRotationOrbit.scale.set(scale, scale, scale);
    earthRotationOrbit.scale.set(scale, scale, scale);
    marsRotationOrbit.scale.set(scale, scale, scale);
    jupiterRotationOrbit.scale.set(scale, scale, scale);
    saturnRotationOrbit.scale.set(scale, scale, scale);
    uranusRotationOrbit.scale.set(scale, scale, scale);
    neptuneRotationOrbit.scale.set(scale, scale, scale);
    plutoRotationOrbit.scale.set(scale, scale, scale);

    $("#scale").html("scale: " + scale);
}

var orbitsMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );

function createOrbits(base1)
{
    
    var orbit = new THREE.RingGeometry( base1-0.1,base1+0.1, 100, 12);
    var mesh = new THREE.Mesh( orbit, orbitsMaterial );
    mesh.rotation.x = Math.PI / 2;
    return mesh;
}

function animate() 
{
    

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;

    var angle = (Math.PI * 2 * fract)+speedRotationPlanets;
    var angleRotationOrbit = (Math.PI * 2 * fract)+speedRotationOrbit;


    //----------------------rotations-------------------------------//
    sunRotation.rotation.y += angle;
    //--------Planets rotation-------//
    mercuryRotation.rotation.y += angle; 
    venusRotation.rotation.y += angle; 
    earthRotation.rotation.y += angle;  
    marsRotation.rotation.y += angle; 
    jupiterRotation.rotation.y += angle;  
    saturnRotation.rotation.y += angle;  
    uranusRotation.rotation.y += angle;  
    neptuneRotation.rotation.y += angle;  
    plutoRotation.rotation.y += angle; 

    earthMoonRotationOrbit.rotation.y  += angle; 
    marsMoon2RotationOrbit.rotation.y += angle; 
    genericMoon1RotationOrbit.rotation.y += angle; 
    genericMoon2RotationOrbit.rotation.y += angle; 

    //--------Planets orbits-------//
    mercuryRotationOrbit.rotation.y += angleRotationOrbit; 
    venusRotationOrbit.rotation.y += angleRotationOrbit*.73; 
    earthRotationOrbit.rotation.y += angleRotationOrbit*.62; 
    marsRotationOrbit.rotation.y += angleRotationOrbit*.50; 
    jupiterRotationOrbit.rotation.y += angleRotationOrbit*.27; 
    saturnRotationOrbit.rotation.y += angleRotationOrbit*.20; 
    uranusRotationOrbit.rotation.y -= angleRotationOrbit*.14; 
    neptuneRotationOrbit.rotation.y += angleRotationOrbit*.11; 
    plutoRotationOrbit.rotation.y += angleRotationOrbit*.09; 






}


function run() {
    requestAnimationFrame(function() { run(); });
    
        // Render the scene
        renderer.render( scene, camera );

        // Spin the cube for next frame
        animate();

        // Update the camera controller
        orbitControls.update();
}

var directionalLight = null;
var spotLight = null;
var pointLight = null;
var ambientLight = null;
var mapUrl = "../images/checker_large.gif";

function createScene(canvas) {
    
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();
    
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, 190, 0);
    scene.add(camera);
    
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    
    // Create a group to hold all the objects
    root = new THREE.Object3D;
    
    // light
    pointLight = new THREE.PointLight (0xffffff, 5, 85);
    root.add(pointLight);

    //------------------------------groups------------------//
    sunRotation = new THREE.Object3D;
    root.add(sunRotation)


    //--------Planets rotation-------//

    mercuryRotation = new THREE.Object3D;
    venusRotation = new THREE.Object3D;
    earthRotation = new THREE.Object3D;
    marsRotation = new THREE.Object3D;
    jupiterRotation = new THREE.Object3D;
    saturnRotation = new THREE.Object3D;
    uranusRotation = new THREE.Object3D;
    neptuneRotation = new THREE.Object3D;
    plutoRotation = new THREE.Object3D;

    

    //--------Planets orbits-------//
    mercuryRotationOrbit = new THREE.Object3D;
    venusRotationOrbit = new THREE.Object3D;
    earthRotationOrbit = new THREE.Object3D;
    marsRotationOrbit = new THREE.Object3D;
    jupiterRotationOrbit = new THREE.Object3D;
    saturnRotationOrbit = new THREE.Object3D;
    uranusRotationOrbit = new THREE.Object3D;
    neptuneRotationOrbit = new THREE.Object3D;
    plutoRotationOrbit = new THREE.Object3D;

    earthMoonRotationOrbit = new THREE.Object3D;
    marsMoon1RotationOrbit = new THREE.Object3D;
    marsMoon2RotationOrbit = new THREE.Object3D;
    genericMoon1RotationOrbit = new THREE.Object3D;
    genericMoon2RotationOrbit = new THREE.Object3D;


    root.add(mercuryRotationOrbit);
    root.add(venusRotationOrbit);
    root.add(earthRotationOrbit);
    root.add(marsRotationOrbit);
    root.add(jupiterRotationOrbit);
    root.add(saturnRotationOrbit);
    root.add(uranusRotationOrbit);
    root.add(neptuneRotationOrbit);
    root.add(plutoRotationOrbit);

    

    //-----------------------create materials-----------//
    //------Sun---------//
    var sunTextureUrl = "../images/sun.jpg";
    var sunbumpMapUrl = "../images/sun_bump.jpg";

    var sunTexture = new THREE.TextureLoader().load(sunTextureUrl);
    var sunbumpMap = new THREE.TextureLoader().load(sunbumpMapUrl);

    var sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture, bumpMap: sunbumpMap, bumpScale: 0.06 });
    //------Mercury---------//
    var mercuryTextureUrl = "../images/mercury.jpg";
    var mercurybumpMapUrl = "../images/mercury_bump.jpg";

    var mercuryTexture = new THREE.TextureLoader().load(mercuryTextureUrl);
    var mercurybumpMap = new THREE.TextureLoader().load(mercurybumpMapUrl);

    var mercuryMaterial = new THREE.MeshPhongMaterial({ map: mercuryTexture, bumpMap: mercurybumpMap, bumpScale: 0.06 });

    //var mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });

    //------Venus---------//
    var venusTextureUrl = "../images/venus.jpg";
    var venusbumpMapUrl = "../images/venus_bump.jpg";

    var venusTexture = new THREE.TextureLoader().load(venusTextureUrl);
    var venusbumpMap = new THREE.TextureLoader().load(venusbumpMapUrl);
    
    var venusMaterial = new THREE.MeshPhongMaterial({ map: venusTexture, bumpMap: venusbumpMap, bumpScale: 0.06 });
    
    //var venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });

    //------Earth---------//
    var earthTextureUrl = "../images/earth_daymap.jpg";
    var earthbumpMapUrl = "../images/earth_bump.jpg";

    var earthTexture = new THREE.TextureLoader().load(earthTextureUrl);
    var earthbumpMap = new THREE.TextureLoader().load(earthbumpMapUrl);

    var earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture, bumpMap: earthbumpMap, bumpScale: 0.06 });
    //var earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });

    //------Mars---------//
    var marsTextureUrl = "../images/mars.jpg";
    var marsbumpMapUrl = "../images/mars_bump.jpg";

    var marsTexture = new THREE.TextureLoader().load(marsTextureUrl);
    var marsbumpMap = new THREE.TextureLoader().load(marsbumpMapUrl);

    var marsMaterial = new THREE.MeshPhongMaterial({ map: marsTexture, bumpMap: marsbumpMap, bumpScale: 0.06 });
    //var marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });

    //------Jupiter---------//
    var jupiterTextureUrl = "../images/jupiter.jpg";
    var jupiterbumpMapUrl = "../images/jupiter_bump.jpg";

    var jupiterTexture = new THREE.TextureLoader().load(jupiterTextureUrl);
    var jupiterbumpMap = new THREE.TextureLoader().load(jupiterbumpMapUrl);

    var jupiterMaterial = new THREE.MeshPhongMaterial({ map: jupiterTexture, bumpMap: jupiterbumpMap, bumpScale: 0.06 });
    //var jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture });

    //------Saturn---------//
    var saturnTextureUrl = "../images/saturn.jpg";
    var saturnbumpMapUrl = "../images/saturn_bump.jpg";

    var saturnTexture = new THREE.TextureLoader().load(saturnTextureUrl);
    var saturnbumpMap = new THREE.TextureLoader().load(saturnbumpMapUrl);

    var saturnMaterial = new THREE.MeshPhongMaterial({ map: saturnTexture, bumpMap: saturnbumpMap, bumpScale: 0.06 });
    //var saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture });
    //------Saturn Ring---------//
    var saturnRingTextureUrl = "../images/saturn_ring.png";
    var saturnRingTexture = new THREE.TextureLoader().load(saturnRingTextureUrl);
    //var saturnRingMaterial = new THREE.MeshPhongMaterial({ map: saturnRingTexture });
    var saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTexture });

    //------Uranus---------//
    var uranusTextureUrl = "../images/uranus.jpg";
    var uranusbumpMapUrl = "../images/uranus_bump.jpg";

    var uranusTexture = new THREE.TextureLoader().load(uranusTextureUrl);
    var uranusbumpMap = new THREE.TextureLoader().load(uranusbumpMapUrl);

    var uranusMaterial = new THREE.MeshPhongMaterial({ map: uranusTexture, bumpMap: uranusbumpMap, bumpScale: 0.06 });
    //var uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTexture });

    //------Neptune---------//
    var neptuneTextureUrl = "../images/neptune.jpg";
    var neptunebumpMapUrl = "../images/neptune_bump.jpg";

    var neptuneTexture = new THREE.TextureLoader().load(neptuneTextureUrl);
    var neptunebumpMap = new THREE.TextureLoader().load(neptunebumpMapUrl);

    var neptuneMaterial = new THREE.MeshPhongMaterial({ map: neptuneTexture, bumpMap: neptunebumpMap, bumpScale: 0.06 });
    //var neptuneMaterial = new THREE.MeshBasicMaterial({ map: neptuneTexture });

    //------Pluto---------//
    var plutoTextureUrl = "../images/pluto.jpg";
    var plutobumpMapUrl = "../images/pluto_bump.jpg";

    var plutoTexture = new THREE.TextureLoader().load(plutoTextureUrl);
    var plutobumpMap = new THREE.TextureLoader().load(plutobumpMapUrl);

    var plutoMaterial = new THREE.MeshPhongMaterial({ map: plutoTexture, bumpMap: plutobumpMap, bumpScale: 0.06 });
    //var plutoMaterial = new THREE.MeshBasicMaterial({ map: plutoTexture });

    //------Asteroids---------//
    var asteroidsTextureUrl = "../images/asteroids.jpg";
    var asteroidsTexture = new THREE.TextureLoader().load(asteroidsTextureUrl);
    var asteroidsMaterial = new THREE.MeshBasicMaterial({ map: asteroidsTexture });

    //-------moons---------//
    //--earth moon--/
    var earthMoonTextureUrl = "../images/moon.jpg";
    var earthMoonbumpMapUrl = "../images/moon_bump.jpg";

    var earthMoonTexture = new THREE.TextureLoader().load(earthMoonTextureUrl);
    var earthMoonbumpMap = new THREE.TextureLoader().load(earthMoonbumpMapUrl);

    var earthMoonMaterial = new THREE.MeshPhongMaterial({ map: earthMoonTexture, bumpMap: earthMoonbumpMap, bumpScale: 0.06 });

    //--mars moons--/
    var marsMoon1TextureUrl = "../images/mars_moon_1.jpg";
    var marsMoon1bumpMapUrl = "../images/mars_moon_1_bump.jpg";

    var marsMoon1Texture = new THREE.TextureLoader().load(marsMoon1TextureUrl);
    var marsMoon1bumpMap = new THREE.TextureLoader().load(marsMoon1bumpMapUrl);

    var marsMoon1Material = new THREE.MeshPhongMaterial({ map: marsMoon1Texture, bumpMap: marsMoon1bumpMap, bumpScale: 0.06 });

    var marsMoon2TextureUrl = "../images/mars_moon_2.jpg";
    var marsMoon2bumpMapUrl = "../images/mars_moon_2_bump.jpg";

    var marsMoon2Texture = new THREE.TextureLoader().load(marsMoon2TextureUrl);
    var marsMoon2bumpMap = new THREE.TextureLoader().load(marsMoon2bumpMapUrl);

    var marsMoon2Material = new THREE.MeshPhongMaterial({ map: marsMoon2Texture, bumpMap: marsMoon2bumpMap, bumpScale: 0.06 });

    //--generic moon--/

    var genericMoonTextureUrl = "../images/mars_moon_1.jpg";
    var genericMoonbumpMapUrl = "../images/mars_moon_1_bump.jpg";

    var genericMoonTexture = new THREE.TextureLoader().load(genericMoonTextureUrl);
    var genericMoonbumpMap = new THREE.TextureLoader().load(genericMoonbumpMapUrl);

    var genericMoonMaterial = new THREE.MeshPhongMaterial({ map: genericMoonTexture, bumpMap: genericMoonbumpMap, bumpScale: 0.06 });

    //---------------------------meshes-----------------//

    
    

    //------Sun---------//
    sunSize = new THREE.SphereGeometry(10, 50, 50);
    sunTextured = new THREE.Mesh(sunSize, sunMaterial);
    sunRotation.add(sunTextured);

        
    var asteroids = new THREE.RingGeometry( baseMars+4-0.5,baseMars+4+0.5, 100, 12);

    var mesh = new THREE.Mesh( asteroids, asteroidsMaterial );
    mesh.rotation.x = -(Math.PI / 2);
    sunRotation.add(mesh)

    //------Mercury---------//
    mercurySize = new THREE.SphereGeometry(0.5, 50, 50);

    mercuryTextured = new THREE.Mesh(mercurySize, mercuryMaterial); 
    mercuryRotation.add(mercuryTextured)
    mercuryRotation.position.x = baseMercury;
    mercuryRotationOrbit.add(mercuryRotation)

    mercuryRotationOrbit.add(createOrbits(baseMercury))

    //------Venus---------//
    venusSize = new THREE.SphereGeometry(1, 50, 50);
    venusTextured = new THREE.Mesh(venusSize, venusMaterial); 
    venusRotation.add(venusTextured)
    venusRotation.position.x = baseVenus;
    venusRotationOrbit.add(venusRotation)

    venusRotationOrbit.add(createOrbits(baseVenus))

    //------Earth---------//
    earthSize = new THREE.SphereGeometry(1, 50, 50);
    earthTextured = new THREE.Mesh(earthSize, earthMaterial); 
    earthRotation.add(earthTextured)
        //---- Earth moon---///
        earthMoonSize = new THREE.SphereGeometry(0.2, 50, 50);
        earthMoonTextured = new THREE.Mesh(earthMoonSize, earthMoonMaterial ); 
        earthMoonRotationOrbit.add(earthMoonTextured)
        earthMoonRotationOrbit.position.x = 1.3;
        earthMoonRotationOrbit.position.z = 1.3;
        earthRotation.add( earthMoonRotationOrbit)


    earthRotation.position.x = baseEarth;
    
    earthRotationOrbit.add(earthRotation)
    
    earthRotationOrbit.add(createOrbits(baseEarth))

    //------Mars---------//
    marsSize = new THREE.SphereGeometry(1, 50, 50);
    marsTextured = new THREE.Mesh(marsSize, marsMaterial); 
    marsRotation.add(marsTextured)
        //----Mars moon---///

        marsMoon1MoonSize = new THREE.SphereGeometry(0.3, 50, 50);
        marsMoon1MoonTextured = new THREE.Mesh(marsMoon1MoonSize, marsMoon1Material ); 
        marsMoon1RotationOrbit.add( marsMoon1MoonTextured)
        marsMoon1RotationOrbit.position.x = 1.4;
        marsMoon1RotationOrbit.position.z = 1.4;
        marsRotation.add(marsMoon1RotationOrbit)

        marsMoon2MoonSize = new THREE.SphereGeometry(0.2, 50, 50);
        marsMoon2MoonTextured = new THREE.Mesh(marsMoon2MoonSize, marsMoon2Material ); 
        marsMoon2RotationOrbit.add(marsMoon2MoonTextured)
        marsMoon2RotationOrbit.position.z = 1.3;
        marsRotation.add( marsMoon2RotationOrbit)

    marsRotation.position.x = baseMars;
    marsRotationOrbit.add(marsRotation)

    marsRotationOrbit.add(createOrbits(baseMars))

    //------Jupiter---------//
    jupiterSize = new THREE.SphereGeometry(3, 50, 50);
    jupiterTextured = new THREE.Mesh(jupiterSize, jupiterMaterial); 
    jupiterRotation.add(jupiterTextured)

        //----jupiter moons---///
        genericMoonSize = new THREE.SphereGeometry(0.4, 50, 50);

        genericMoonTextured = new THREE.Mesh(genericMoonSize, genericMoonMaterial ); 
        genericMoon1RotationOrbit.add(genericMoonTextured)
        genericMoon1RotationOrbit.position.x = 3.4;
        genericMoon1RotationOrbit.position.z = 3.5;

        jupiterRotation.add(genericMoon1RotationOrbit)

        genericMoon2Size = new THREE.SphereGeometry(0.2, 50, 50);
        genericMoon2Textured = new THREE.Mesh(genericMoon2Size, genericMoonMaterial ); 
        genericMoon2RotationOrbit.add(genericMoon2Textured)
        genericMoon2RotationOrbit.position.x = 3.3;

        jupiterRotation.add(genericMoon2RotationOrbit)



    jupiterRotation.position.x = baseJupiter ;
    jupiterRotationOrbit.add(jupiterRotation)

    jupiterRotationOrbit.add(createOrbits(baseJupiter))


    //------Saturn---------//
    saturnSize = new THREE.SphereGeometry(2, 50, 50);
    saturnTextured = new THREE.Mesh(saturnSize, saturnMaterial); 

    var ring = new THREE.RingGeometry( 2.1, 2.5, 50, 12);
    var saturnRing = new THREE.Mesh( ring,saturnRingMaterial);
    saturnRing.material.opacity = 0.5;
    saturnRing.rotation.x = -(Math.PI /1.5);

    saturnRotation.add(saturnRing)
    saturnRotation.add(saturnTextured)

    saturnRotation.position.x = baseSaturn;
    saturnRotationOrbit.add(saturnRotation)

    saturnRotationOrbit.add(createOrbits(baseSaturn))


    //------Uranus---------//
    uranusSize = new THREE.SphereGeometry(1, 50, 50);
    uranusTextured = new THREE.Mesh(uranusSize, uranusMaterial); 

    uranusRotation.add(uranusTextured)

    uranusRotation.position.x = baseUranus;
    uranusRotationOrbit.add(uranusRotation)

    uranusRotationOrbit.add(createOrbits(baseUranus))


    //------Neptune---------//
    neptuneSize = new THREE.SphereGeometry(1, 50, 50);
    neptuneTextured = new THREE.Mesh(neptuneSize, neptuneMaterial); 
    neptuneRotation.add(neptuneTextured)
    neptuneRotation.position.x = baseNeptune;
    neptuneRotationOrbit.add(neptuneRotation)
    
    neptuneRotationOrbit.add(createOrbits(baseNeptune))
    


    //------Pluto---------//
    plutoSize = new THREE.SphereGeometry(1, 50, 50);
    plutoTextured = new THREE.Mesh(plutoSize, plutoMaterial); 
    plutoRotation.add(plutoTextured)
    plutoRotation.position.x = basePluto;
    plutoRotationOrbit.add(plutoRotation)

    plutoRotationOrbit.add(createOrbits(basePluto))



    scene.add( root );
}
