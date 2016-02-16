var context = new AudioContext();
var frequencies = [
    493.883,
    440.000,
    391.995,
    349.228,
    329.628,
    293.665,
    261.626
];
var username = "{{ username }}";

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

window.onload = function(){
    gh = GitHubCalendar(".calendar", username);
    play({{ to_play }});
};
