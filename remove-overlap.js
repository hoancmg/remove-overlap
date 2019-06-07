// This is helper.
const removeOverlap = function (checkedArray) {
    return checkedArray.reduce(
        (accumulator, currentValue, currentIndex, array) => {
            if (currentValue.isRemoved) return accumulator;

            if (currentIndex === array.length - 1)
                return accumulator.concat([currentValue]);

            let currentMax = Math.max(currentValue.startPx, currentValue.endPx),
                currentMin = Math.min(currentValue.startPx, currentValue.endPx),
                nextMax = Math.max(
                    array[currentIndex + 1].startPx,
                    array[currentIndex + 1].endPx
                ),
                nextMin = Math.min(
                    array[currentIndex + 1].startPx,
                    array[currentIndex + 1].endPx
                );

            if (currentMax < nextMin || currentMin > nextMax)
                return accumulator.concat([currentValue]);
            else {
                array[currentIndex + 1].isRemoved = true;
                return accumulator.concat([
                    {
                        startPx: Math.min(
                            currentValue.startPx,
                            currentValue.endPx,
                            array[currentIndex + 1].startPx,
                            array[currentIndex + 1].endPx
                        ),
                        endPx: Math.max(
                            currentValue.startPx,
                            currentValue.endPx,
                            array[currentIndex + 1].startPx,
                            array[currentIndex + 1].endPx
                        )
                    }
                ]);
            }
        },
        []
    );
};

// This is main function.
const checkAll = function (checkedArray) {
    let newArray = removeOverlap(checkedArray);
    while (newArray.length !== removeOverlap(newArray).length) {
        newArray = removeOverlap(newArray);
    }
    return newArray;
};

// Test cases.

let testCase0 = [
    {startPx: 10, endPx: 20},
    {startPx: 30, endPx: 40}
]
let testCase1 = [
    {startPx: 10, endPx: 30},
    {startPx: 55, endPx: 65},
    {startPx: 35, endPx: 50},
    {startPx: 20, endPx: 40},
    {startPx: 35, endPx: 70}
];

let testCase2 = [
    {startPx: 10, endPx: 30},
    {startPx: 20, endPx: 40}];

let testCase3 = [
    {startPx: 10, endPx: 30},
    {startPx: 55, endPx: 55},
    {startPx: 35, endPx: 60},
    {startPx: 30, endPx: 40},
    {startPx: 65, endPx: 70}
];

let testCase4 = [
    {startPx: 10, endPx: 30},
    {startPx: 55, endPx: 65},
    {startPx: 35, endPx: 50},
    {startPx: 20, endPx: 40},
    {startPx: 60, endPx: 70}
];

let result0 = checkAll(testCase0);
console.log("result1", result0);

let result1 = checkAll(testCase1);
console.log("result1", result1);

let result2 = checkAll(testCase2);
console.log("result2", result2);

let result3 = checkAll(testCase3);
console.log("result3", result3);

let result4 = checkAll(testCase4);
console.log("result4", result4);
