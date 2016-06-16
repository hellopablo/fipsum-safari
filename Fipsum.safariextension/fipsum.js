/**
 * The Fipsum class
 * Populates input fields on the page with _correct_ dummy data
 *
 * Originally by Dustin Senos (@dustinsenos), ported to Chrome by Connor Montgomery (@connor),
 * resurrected by Pablo de la Peña (@hellopablo)
 *
 * https://github.com/hellopablo/fipsum-safari
 */
var Fipsum = function() {

    /**
     * Avoid scope issues in callbacks by using `base` instead of `this`
     * @type {Object}
     */
    var base = this;

    // --------------------------------------------------------------------------

    /**
     * The bank of words to use to build phrases
     * @type {Array}
     */
    base.pseudoWords     = [
        'Pharetra', 'Ridiculus', 'Venenatis', 'Egestas', 'Lorem', 'Mattis', 'Dolor', 'Quam', 'Venenatis', 'Ultricies',
        'Tortor', 'Vehicula', 'Justo', 'Ipsum', 'Purus', 'Nibh', 'Ornare', 'Condimentum', 'Sem', 'Justo', 'Ornare',
        'Ridiculus', 'Dolor', 'Inceptos'
    ];

    // --------------------------------------------------------------------------

    /**
     * Build paragraphs using these sentences
     * @type {Array}
     */
    base.pseudoSentences = [
        'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
        'Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
        'Donec ullamcorper nulla non metus auctor fringilla.',
        'Aenean lacinia bibendum nulla sed consectetur.',
        'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.'
    ];

    // --------------------------------------------------------------------------

    /**
     * Populates fields on the page with _correct_ data
     * @return {Void}
     */
    base.go = function() {

        var els,textarea,length,ta_length,i;

        els         = document.querySelectorAll('input');
        textareas   = document.querySelectorAll('textarea');
        selects     = document.querySelectorAll('select');
        length      = els.length;
        ta_length   = textareas.length;
        sel_length  = selects.length;
        i           = 0;

        for (i; i < length; i ++) {

            if (els[i].isVisible(els[i])) {
                switch (els[i].type) {
                    case 'submit' :
                    case 'hidden' :
                        break;

                    case 'text' :
                        els[i].value = base.getRandomStringWithSpaces(1, 4);
                        break;

                    case 'url' :
                        els[i].value = ('http://' + base.getRandomStringWithNoSpaces(1, 4) + '.com');
                        break;

                    case 'email' :
                        els[i].value = (base.getRandomStringWithNoSpaces(1, 2) + '@' + base.getRandomStringWithNoSpaces(1, 4) + '.com');
                        break;

                    case 'date' :
                        els[i].value = base.getRandomDate();
                        break;

                    case 'time' :
                        els[i].value = base.getRandomTime();
                        break;

                    case 'datetime' :
                    case 'datetime-local' :
                        els[i].value = base.getRandomDate() + 'T' + base.getRandomTime();
                        break;

                    case 'month' :
                        els[i].value = base.getRandomMonthYear();
                        break;

                    case 'week' :
                        els[i].value = base.getRandomWeek();
                        break;

                    case 'number' :
                    case 'range' :

                        var max,min,value;
                        if (els[i].max) {
                            max = els[i].max;
                        }
                        else {
                            max = base.randomFromTo(0, 1000);
                        }

                        if (els[i].min) {
                            min = els[i].min;
                        }
                        else {
                            min = base.randomFromTo(0, 1000);
                        }

                        value = base.randomFromTo(min, max);

                        if (els[i].step) {
                            value -= (value % els[i].step);
                        }

                        els[i].value = value;
                        break;

                    case 'tel' :
                        els[i].value = base.getRandomTel();
                        break;

                    case 'color' :
                        els[i].value = base.getRandomColor();
                        break;

                    case 'checkbox' :
                    case 'radio' :
                        if (Math.random() < 0.5) {
                            els[i].checked = true;
                        }
                        break;

                    case 'textarea' :
                        els[i].value = base.getRandomParagraphWithSpaces(1, 4);
                        break;

                    default :
                        els[i].value = base.getRandomStringWithSpaces(1, 4);
                        break;
                }
            }
        }

        for (var t = 0; t < ta_length; t++) {
            if (textareas[t].isVisible(textareas[t])) {
                textareas[t].value = base.getRandomParagraphWithSpaces(10, 20);
            }
        }

        for (var s = 0; s < sel_length; s++) {
            if (selects[s].isVisible(selects[s])) {

                var isMultiple = selects[s].multiple;
                var children = selects[s].getElementsByTagName('option');

                //  Clear selections, randomly check them again
                var c;
                for (c = children.length - 1; c >= 0; c--) {
                    children[c].selected = false;
                }

                for (c = children.length - 1; c >= 0; c--) {
                    if (Math.random() < 0.5 && children[c].value !== "") {
                        children[c].selected = true;
                        if (!isMultiple) {
                            break;
                        }
                    }
                }
            }
        }
    };

    // --------------------------------------------------------------------------

    base.getRandomParagraphWithSpaces = function(min, max) {
        var wordCount = base.randomFromTo(min, max);
        var wordLength = base.pseudoSentences.length;
        var i = 0;
        var out = '';

        while (i < wordCount) {
            out += base.pseudoSentences[base.randomFromTo(0, (wordLength - 1))] + ' ';
            i++;
        }

        return out;
    };

    // --------------------------------------------------------------------------

    base.getRandomStringWithSpaces = function(min, max) {
        var wordCount = base.randomFromTo(min, max);
        var wordLength = base.pseudoWords.length;
        var i = 0;
        var out = '';

        while (i < wordCount)   {
            out += base.pseudoWords[base.randomFromTo(0, (wordLength - 1))] + ' ';
            i++;
        }

        return out;
    };

    // --------------------------------------------------------------------------

    base.getRandomStringWithNoSpaces = function(min, max) {
        var wordCount = base.randomFromTo(min, max);
        var wordLength = base.pseudoWords.length;
        var i = 0;
        var out = '';

        while (i < wordCount) {
            out += base.pseudoWords[base.randomFromTo(0, (wordLength - 1))];
            i++;
        }

        return out.toLowerCase();
    };

    // --------------------------------------------------------------------------

    base.getRandomDate = function() {
        return base.getRandomMonthYear() + '-' + base.zeroPad(base.randomFromTo(1, 28), 2);
    };

    // --------------------------------------------------------------------------

    base.getRandomTime = function() {
        return base.zeroPad(base.randomFromTo(0, 23), 2) + ':' + base.zeroPad(base.randomFromTo(1, 59), 2) + ':' + base.zeroPad(base.randomFromTo(1, 59), 2);
    };

    // --------------------------------------------------------------------------

    base.getRandomMonthYear = function() {
        return base.randomFromTo(1912, 2011) + '-' + base.zeroPad(base.randomFromTo(1, 12), 2);
    };

    // --------------------------------------------------------------------------

    base.getRandomWeek = function() {
        return base.randomFromTo(1912, 2011) + '-W' + base.zeroPad(base.randomFromTo(1, 52), 2);
    };

    // --------------------------------------------------------------------------

    base.getRandomTel = function() {
        return '1 ' + '(' + base.randomFromTo(100, 999) + ')' + ' ' + base.randomFromTo(100, 999) + '-' + base.randomFromTo(1000, 9999);
    };

    // --------------------------------------------------------------------------

    base.zeroPad = function(num,count) {
        var numZeropad = num + '';
        while(numZeropad.length < count) {
            numZeropad = "0" + numZeropad;
        }
        return numZeropad;
    };

    // --------------------------------------------------------------------------

    base.getRandomColor = function() {
        return '#'+Math.floor(Math.random()*16777215).toString(16).toUpperCase();
    };

    // --------------------------------------------------------------------------

    base.randomFromTo = function(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    };
};