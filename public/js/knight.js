window.knightAnimation = {
    isPlaying: true,
    isRendering: true,
    pause: function() {
        this.isPlaying = false;
        this.isRendering = false;
        console.log('⏸️ Knight paused');
    },
    resume: function() {
        this.isPlaying = true;
        this.isRendering = true;
        console.log('▶️ Knight resumed');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Knight loading...');
    
    let scene, camera, renderer, knight;
    let animationId = null;
    
    function init3D() {
        console.log('Starting 3D scene...');
        
        const container = document.getElementById('knightModel');
        if (!container) return;
        
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x3a3a3a);
        
        camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0.8, 3.0);
        
        renderer = new THREE.WebGLRenderer({ 
            antialias: false,
            alpha: true,
            powerPreference: "low-power"
        });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = false;
        renderer.setPixelRatio(1);
        
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '1';
        renderer.domElement.style.pointerEvents = 'none'; // ← Can't touch it
        container.appendChild(renderer.domElement);
        
        scene.add(new THREE.AmbientLight(0xffffff, 0.8));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
        dirLight.position.set(5, 10, 5);
        scene.add(dirLight);
        
        loadModel();
        
        function animate() {
            if (!window.knightAnimation.isRendering) return;
            animationId = requestAnimationFrame(animate);
            if (knight && window.knightAnimation.isPlaying) {
                knight.rotation.y += 0.01;
            }
            if (renderer && scene && camera) renderer.render(scene, camera);
        }
        animate();
        
        window.addEventListener('resize', function() {
            if (!container || !camera || !renderer) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
    
    function loadModel() {
        const loader = new THREE.GLTFLoader();
        const modelPaths = ['/images/knight3d.glb', '/models/knight3d.glb'];
        let pathIndex = 0;
        
        function tryPath() {
            if (pathIndex >= modelPaths.length) { createPlaceholder(); return; }
            const path = modelPaths[pathIndex];
            console.log(`Trying: ${path}`);
            
            loader.load(path,
                function(gltf) {
                    console.log('✅ Knight loaded!');
                    knight = gltf.scene;
                    knight.scale.set(2.0, 2.0, 2.0);
                    knight.position.y = -0.5;
                    knight.traverse(function(node) {
                        if (node.isMesh && node.material) node.material.precision = 'lowp';
                    });
                    scene.add(knight);
                    window.isKnightLoaded = true;
                    hideSpinner();
                },
                function(xhr) {
                    if (xhr.total) console.log(`Loading: ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`);
                },
                function(error) {
                    console.error(`Failed: ${path}`);
                    pathIndex++;
                    tryPath();
                }
            );
        }
        tryPath();
    }
    
    function hideSpinner() {
        const container = document.getElementById('knightModel');
        if (!container) return;
        const spinner = container.querySelector('.model-loading');
        if (spinner) {
            spinner.style.opacity = '0';
            spinner.style.transition = 'opacity 0.5s ease';
            setTimeout(() => { if (spinner.parentNode) spinner.style.display = 'none'; }, 500);
        }
    }
    
    function createPlaceholder() {
        const group = new THREE.Group();
        const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 0.5), new THREE.MeshStandardMaterial({ color: 0x666666 }));
        body.position.y = 0.75;
        group.add(body);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), new THREE.MeshStandardMaterial({ color: 0xFFD700 }));
        head.position.y = 1.8;
        group.add(head);
        scene.add(group);
        knight = group;
        window.isKnightLoaded = true;
        hideSpinner();
    }
    
    // Init when landing is visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { init3D(); observer.disconnect(); }
    }, { threshold: 0.1 });
    observer.observe(document.getElementById('landing'));
    
    // FULL STOP when off-screen
    const knightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!window.knightAnimation.isRendering) {
                    window.knightAnimation.isRendering = true;
                    window.knightAnimation.isPlaying = true;
                    function restartAnimate() {
                        if (!window.knightAnimation.isRendering) return;
                        animationId = requestAnimationFrame(restartAnimate);
                        if (knight && window.knightAnimation.isPlaying) knight.rotation.y += 0.01;
                        if (renderer && scene && camera) renderer.render(scene, camera);
                    }
                    restartAnimate();
                }
            } else {
                window.knightAnimation.isRendering = false;
                window.knightAnimation.isPlaying = false;
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }
        });
    }, { threshold: 0.05 });
    
    setTimeout(() => {
        const kc = document.getElementById('knightModel');
        if (kc) knightObserver.observe(kc);
    }, 1000);
    
    document.addEventListener('visibilitychange', function() {
        window.knightAnimation.isPlaying = !document.hidden;
    });
});