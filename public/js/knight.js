window.knightAnimation = {
    isPlaying: true,
    isRendering: true,
    pause: function() {
        this.isPlaying = false;
        this.isRendering = false;
    },
    resume: function() {
        this.isPlaying = true;
        this.isRendering = true;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Knight loading...');
    
    let scene, camera, renderer, knight, controls;
    let animationId = null;
    let isKnightVisible = true;
    let animate;
    
    function init3D() {
        const container = document.getElementById('knightModel');
        if (!container) return;
        
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x3a3a3a);
        
        camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0.8, 3.0);
        
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = false;
        renderer.setPixelRatio(1);
        renderer.domElement.style.cssText = 'position:absolute;top:0;left:0;z-index:1;cursor:pointer;';
        container.appendChild(renderer.domElement);
        
        renderer.domElement.addEventListener('click', function() {
            window.knightAnimation.isPlaying ? window.knightAnimation.pause() : window.knightAnimation.resume();
        });
        
        scene.add(new THREE.AmbientLight(0xffffff, 0.8));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
        dirLight.position.set(5, 10, 5);
        scene.add(dirLight);
        
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 1.5;
        controls.maxDistance = 4.0;
        controls.target.set(0, 0.5, 0);
        
        loadModel();
        
        animate = function() {
            if (isKnightVisible) {
                animationId = requestAnimationFrame(animate);
                if (knight && window.knightAnimation.isPlaying) knight.rotation.y += 0.01;
                if (controls) controls.update();
                if (renderer && scene && camera) renderer.render(scene, camera);
            }
        };
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
        const paths = ['/images/knight3d.glb', '/models/knight3d.glb'];
        let i = 0;
        function tryPath() {
            if (i >= paths.length) { createPlaceholder(); return; }
            loader.load(paths[i],
                function(gltf) {
                    knight = gltf.scene;
                    knight.scale.set(2.0, 2.0, 2.0);
                    knight.position.y = -0.5;
                    knight.traverse(function(n) { if (n.isMesh && n.material) n.material.precision = 'lowp'; });
                    scene.add(knight);
                    window.isKnightLoaded = true;
                    hideSpinner();
                },
                function(xhr) { if (xhr.total) console.log(`Loading: ${(xhr.loaded/xhr.total*100).toFixed(1)}%`); },
                function() { i++; tryPath(); }
            );
        }
        tryPath();
    }
    
    function hideSpinner() {
        const c = document.getElementById('knightModel');
        if (!c) return;
        const s = c.querySelector('.model-loading');
        if (s) { s.style.opacity = '0'; s.style.transition = 'opacity 0.5s ease'; setTimeout(() => { if (s.parentNode) s.style.display = 'none'; }, 500); }
    }
    
    function createPlaceholder() {
        const g = new THREE.Group();
        const b = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 0.5), new THREE.MeshStandardMaterial({ color: 0x666666 }));
        b.position.y = 0.75; g.add(b);
        const h = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), new THREE.MeshStandardMaterial({ color: 0xFFD700 }));
        h.position.y = 1.8; g.add(h);
        scene.add(g); knight = g;
        window.isKnightLoaded = true;
        hideSpinner();
    }
    
    const landingObserver = new IntersectionObserver((e) => {
        if (e[0].isIntersecting) { init3D(); landingObserver.disconnect(); }
    }, { threshold: 0.1 });
    landingObserver.observe(document.getElementById('landing'));
    
    const knightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const wasVisible = isKnightVisible;
            isKnightVisible = entry.isIntersecting;
            if (!wasVisible && isKnightVisible && animate && !animationId) {
                animate();
            }
        });
    }, { threshold: 0, rootMargin: '50px' });
    
    setTimeout(() => {
        const kc = document.getElementById('knightModel');
        if (kc) knightObserver.observe(kc);
    }, 1000);
    
    document.addEventListener('visibilitychange', function() {
        window.knightAnimation.isPlaying = !document.hidden;
    });
});