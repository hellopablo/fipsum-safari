var fipsum = new Fipsum();

// if (window === window.top) {
    safari.self.addEventListener(
        'message',
        function(e) {
            console.log(e);
            if (e.name === 'fipsumize') {
                fipsum.go();
            }
        },
        false
    );
// }