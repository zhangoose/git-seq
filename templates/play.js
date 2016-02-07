var context = new AudioContext();
var frequencies = [
    261.626,
    293.665,
    329.628,
    349.228,
    391.995,
    440.000,
    493.883
];

/**
 * to play a week of contributions:
 * - maps each index to an oscillator element
 * - starts the oscillator at time `set`
 * - stops at `set` + 0.5
 *
 * arr = week's array of contributions
 * set = index of that week; week number
 */
function play_set(arr, set){
    arr.forEach(function(element){
        oscillator = context.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequencies[element];
        oscillator.connect(context.destination);
        oscillator.start(context.currentTime + set);
        oscillator.stop(context.currentTime + set + 0.9);
    });
}

function play(arr){
    var i;
    for(i = 0; i < arr.length; i++){
        play_set(arr[i],i);
    }   
}

play({{ to_play }});
