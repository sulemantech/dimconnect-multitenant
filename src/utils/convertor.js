export function commarize(number) {
    const splitval = number?.toString().split('.');
    if (splitval.length > 1) {
        if (splitval[0].length < 6) {
            return splitval[0]
        }
    }


    var units = ["K", "M", "B", "T"];
    var decimal;

    for (var i = units.length - 1; i >= 0; i--) {
        decimal = Math.pow(1000, i + 1);

        if (number <= -decimal || number >= decimal) {
            return +(number / decimal).toFixed(1) + units[i];
        }
    }

    return number
}

export const formatCamelCaseToTitleCase = (str) => {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, function (str) { return str.toUpperCase(); })
        .replace(/_/g, " ")
}