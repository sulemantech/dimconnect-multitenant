export function commarize(number) {
    var units = ["k", "M", "B", "T"];
    var decimal;

    for (var i = units.length - 1; i >= 0; i--) {
        decimal = Math.pow(1000, i + 1);

        if (number <= -decimal || number >= decimal) {
            return +(number / decimal).toFixed(1) + units[i];
        }
    }

    return number;
}