document.addEventListener("contextmenu", function (e){
    e.preventDefault();
});

document.addEventListener('keydown', function (e) {
    // Detect if Cmd (Mac) or Ctrl (Windows/Linux) is pressed
    const isMeta = e.ctrlKey || e.metaKey;
    // Detect if Shift or Alt (Option on Mac) is pressed
    const isAltShift = e.shiftKey || e.altKey;

    // Block: Cmd+Opt+I (Mac), Ctrl+Shift+I (Windows), Cmd+Opt+J, etc.
    if (isMeta && isAltShift && (e.code === 'KeyI' || e.code === 'KeyJ' || e.code === 'KeyC')) {
        e.preventDefault();
        return false;
    }

    // Block: Cmd+U or Ctrl+U (View Source)
    if (isMeta && e.code === 'KeyU') {
        e.preventDefault();
        return false;
    }

    // Block: F12 (Standard DevTools shortcut)
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
}, false);
