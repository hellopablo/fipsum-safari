/**
 * The Fipsum Bootstrapper
 * Binds to the Safari contextual menu and sends messages to injected scripts.
 *
 * Originally by Dustin Senos (@dustinsenos), ported to Chrome by Connor Montgomery (@connor),
 * resurrected by Pablo de la Peña (@hellopablo)
 *
 * https://github.com/hellopablo/fipsum-safari
 */

safari.application.addEventListener(
    'command',
    function(e) {
        if (e.command === 'fipsumize') {
            safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
                'fipsumize'
            );
        }
    },
    false
);
