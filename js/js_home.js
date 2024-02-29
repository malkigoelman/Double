// .home .play:hover,
// .home .instructions:hover

document.querySelectorAll('.home .links img').forEach(l => {
    l.addEventListener('mousemove', (e) => e.currentTarget.style.scale = '90%');
    l.addEventListener('mouseout', (e) => e.currentTarget.style.scale = '100%');
});