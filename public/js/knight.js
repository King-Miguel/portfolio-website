window.knightAnimation = {
    isPlaying: true,
    isRendering: true,
    pause: function() {
        this.isPlaying = false;
        this.isRendering = false;
        console.log('⏸️ Knight animation and rendering paused');
    },
    resume: function() {
        this.isPlaying = true;
        this.isRendering = true;
        console.log('▶️ Knight animation and rendering resumed');
    },
    stopRendering: function() {
        this.isRendering = false;
        console.log('🛑 Knight rendering stopped');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Knight loading...');
    
    let scene, camera, renderer, knight, controls;
    let animationId = null;
    
    function init3D() {
        console.log('Starting 3D scene...');
        
        const container = document.getElementById('knightModel');
        if (!container) {
            console.error('Knight container not found!');
            return;
        }
        
        // Create scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x3a3a3a);
        
        // Camera
        camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0.8, 3.0);
        
        // Renderer - balanced performance
        renderer = new THREE.WebGLRenderer({ 
            antialias: false,
            alpha: true,
            powerPreference: "low-power"
        });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = false;
        renderer.setPixelRatio(1);
        
        container.innerHTML = '';
        container.appendChild(renderer.domElement);
        
        // Add click to pause functionality
        renderer.domElement.style.cursor = 'pointer';
        renderer.domElement.addEventListener('click', function() {
            if (window.knightAnimation.isPlaying) {
                window.knightAnimation.pause();
                console.log('🖱️ Knight paused by click');
            } else {
                window.knightAnimation.resume();
                console.log('🖱️ Knight resumed by click');
            }
        });
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 10, 5);
        scene.add(directionalLight);
        
        // Controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 1.5;
        controls.maxDistance = 4.0;
        controls.target.set(0, 0.5, 0);
        
        // Load model
        loadModel();
        
        // Optimized Animation
        function animate() {
            // ONLY request next frame if we should be rendering
            if (window.knightAnimation.isRendering) {
                animationId = requestAnimationFrame(animate);
            }
            
            // Only update if playing
            if (window.knightAnimation.isPlaying && knight) {
                knight.rotation.y += 0.01;
            }
            
            // Only update controls and render if rendering
            if (window.knightAnimation.isRendering) {
                controls.update();
                renderer.render(scene, camera);
            }
        }
        
        animate();
        
        // Handle window resize
        function handleResize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
        
        window.addEventListener('resize', handleResize);
    }
    
    function loadModel() {
        const loader = new THREE.GLTFLoader();
        
        console.log('Loading knight model...');
        
      const modelPaths = [
            '/images/knight3d.glb',
            './images/knight3d.glb',
            'images/knight3d.glb'
        ];
        
        let currentPathIndex = 0;
        
        function tryLoadPath() {
            if (currentPathIndex >= modelPaths.length) {
                console.error('All model paths failed');
                createPlaceholder();
                return;
            }
            
            const path = modelPaths[currentPathIndex];
            console.log(`Trying: ${path}`);
            
            loader.load(
                path,
                function(gltf) {
                    console.log('✅ Knight model loaded successfully!');
                    
                    knight = gltf.scene;
                    knight.scale.set(2.0, 2.0, 2.0);
                    knight.position.y = -0.5;
                    
                    // Simple material optimization
                    knight.traverse(function(node) {
                        if (node.isMesh) {
                            node.castShadow = false;
                            node.receiveShadow = false;
                            if (node.material) {
                                node.material.precision = 'lowp';
                            }
                        }
                    });
                    
                    scene.add(knight);
                    
                    // ✅ CRITICAL: Tell preloader we're ready!
                    window.isKnightLoaded = true;
                    console.log('✅ Knight loaded flag set!');
                },
                function(xhr) {
                    console.log(`Loading: ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`);
                },
                function(error) {
                    console.error(`Failed: ${path}`, error);
                    currentPathIndex++;
                    
                    if (currentPathIndex >= modelPaths.length) {
                        window.isKnightLoaded = true;
                        console.log('✅ All paths exhausted, setting flag to continue');
                    }
                    tryLoadPath();
                }
            );
        }
        
        tryLoadPath();
    }
    
    function createPlaceholder() {
        console.log('Creating placeholder knight');
        const group = new THREE.Group();
        
        // Body
        const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.75;
        group.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.4, 8, 8);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.8;
        group.add(head);
        
        scene.add(group);
        knight = group;
        
        window.isKnightLoaded = true;
        console.log('✅ Placeholder created, flag set!');
    }
    
    // Initialize when visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            console.log('Landing section visible, loading knight...');
            init3D();
            observer.disconnect();
        }
    }, { threshold: 0.1 });
    
    observer.observe(document.getElementById('landing'));
    
    // Performance optimization: COMPLETE pause when not visible
    const knightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Knight is visible - resume everything
                window.knightAnimation.resume();
                console.log('🎮 Knight visible - animation and rendering RESUMED');
                
                // Restart animation loop if it was stopped
                if (!animationId && renderer) {
                    function restartAnimate() {
                        animationId = requestAnimationFrame(restartAnimate);
                        if (window.knightAnimation.isPlaying && knight) {
                            knight.rotation.y += 0.01;
                        }
                        controls.update();
                        renderer.render(scene, camera);
                    }
                    restartAnimate();
                }
            } else {
                // Knight is not visible - COMPLETE STOP to save GPU
                window.knightAnimation.pause();
                console.log('🎮 Knight not visible - animation and rendering PAUSED');
                
                // Cancel animation frame to stop all rendering
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe the knight container once it's loaded
    setTimeout(() => {
        const knightContainer = document.getElementById('knightModel');
        if (knightContainer) {
            knightObserver.observe(knightContainer);
            console.log('🎮 Knight performance observer activated');
        }
    }, 1000);
    
    // Also pause knight when page is hidden (tab switch)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            window.knightAnimation.pause();
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            console.log('🎮 Page hidden - knight COMPLETELY stopped');
        } else {
            // Only resume if knight is actually visible
            const knightContainer = document.getElementById('knightModel');
            if (knightContainer && knightContainer.getBoundingClientRect().top < window.innerHeight && knightContainer.getBoundingClientRect().bottom > 0) {
                window.knightAnimation.resume();
                console.log('🎮 Page visible - knight resumed');
            }
        }
    });
});