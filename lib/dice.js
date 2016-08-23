(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dice = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    combineArrayWith: combineArrayWith,
    extendObjectPrototype: extendObjectPrototype,
    flatten: flatten,
    isObject: isObject,
    mapObject: mapObject,
    range: range,
    sum: sum
};

function extendObjectPrototype() {
    Object.prototype.keys = function () {
        return Object.keys(this);
    };
    Object.prototype.map = function (fn) {
        return mapObject(this, fn);
    }
}

function flatten(array) {
    if (array && typeof array.reduce === 'function')
        return array.reduce(concatAllArrayValues, []);
    return [];

    function concatAllArrayValues(resultArray, nextValue) {
        return resultArray.concat(nextValue);
    }
}

function range(size) {
    var result = [];
    var i = 1;
    if (size && typeof size === 'number') {
        var max = size + 1;
        while (i < max) {
            result.push(i++);
        }
    }
    return result;
}

function sum(array) {
    if (array && typeof array.reduce === 'function')
        return array.reduce(addNext, 0);
    return 0;

    function addNext(total, numberToAdd) {
        if (typeof numberToAdd != 'number')
            return total;
        return total + numberToAdd;
    }
}

function isObject(obj) {
    return !!obj && Object.prototype.toString.call(obj) === '[object Object]';
}

function mapObject(obj, fn) {
    if (obj && isObject(obj) && typeof fn === 'function') {
        var result = {};
        Object.keys(obj).forEach(function (key) {
            result[key] = fn(obj[key]);
        });
        return result;
    }
    return {};
}

function combineArrayWith(array, itemToCombine) {
    if (Array.isArray(array))
        return array.map(combine(itemToCombine));
    return [];

    function combine(secondItem) {
        return function (item) {
            return [].concat(secondItem,item);
        }
    }
}
},{}],"/dice":[function(require,module,exports){
var lib = require('./functions');
var flatten = lib.flatten;
var sum = lib.sum;

module.exports = {
    listFaces: listFaces,
    computeRollsForDice: computeRollsForDice,
    combineRolls: combineRolls,
    combineTotals: combineTotals,
    getPercentageStatsFromTotals: getPercentageStatsFromTotals,
    sumPercentagesGreaterThanRoll: sumPercentagesGreaterThanRoll,
    parseDiceFromCommandLine: parseDiceFromCommandLine,
    parseTargetFromCommandLine: parseTargetFromCommandLine,
    sumPercentagesLessThanRoll: sumPercentagesLessThanRoll,
    convertDiceToListOfDiceSizes: convertDiceToListOfDiceSizes,
    getStatsForDice: getStatsForDice
};

function listFaces(size) {
    return lib.range(size);
}

function computeRollsForDice(diceSizes) {
    if (Array.isArray(diceSizes) && diceSizes.length > 0) {
        return diceSizes.reduce(combineRolls, []);
    }
    return [];
}

function combineRolls(existingRolls, diceSize) {
    if (Array.isArray(existingRolls)) {
        if (existingRolls.length === 0)
            return listFaces(diceSize).map(makeArray);
        else
            return flatten(listFaces(diceSize).map(function (number) {
                return lib.combineArrayWith(existingRolls, number);
            }));
    }
    return [];

    function makeArray(val) {
        return [val];
    }
}

function combineTotals(arrayOfCombinations) {
    return arrayOfCombinations.reduce(sumCombinationsAndTrackTotal, {});

    function sumCombinationsAndTrackTotal(trackingObject, arrayOfCombinationsToSum) {
        var currentSum = sum(arrayOfCombinationsToSum);
        trackingObject[currentSum] = trackingObject[currentSum] + 1 || 1;
        return trackingObject;
    }
}

function getPercentageStatsFromTotals(statsObject, optionalPrecision) {
    var result = {};
    var totalRolls = countTotalRolls(statsObject);
    var precision = optionalPrecision || 1;

    Object.keys(statsObject).map(function (total) {
        result[total] = ((statsObject[total] * 100) / totalRolls).toFixed(precision);
    });

    return result;

    function countTotalRolls(obj) {
        return sum(Object.keys(obj).map(getCount));

        function getCount(total) {
            return statsObject[total];
        }
    }
}

function sumPercentagesGreaterThanRoll(percentageStats, targetRoll) {
    if (!percentageStats || typeof percentageStats !== 'object' || typeof targetRoll !== 'number' || targetRoll < 0) {
        return 0;
    }
    var sum = 0;
    Object.keys(percentageStats).forEach(function (roll) {
        if (roll > targetRoll) {
            sum += parseFloat(percentageStats[roll]);
        }
    });
    return sum;
}

function sumPercentagesLessThanRoll(percentageStats, targetRoll) {
    if (!percentageStats || typeof percentageStats !== 'object' || typeof targetRoll !== 'number' || targetRoll < 0) {
        return 0;
    }
    var sum = 0;
    Object.keys(percentageStats).forEach(function (roll) {
        if (roll < targetRoll) {
            sum += Number.parseFloat(percentageStats[roll]);
        }
    });
    return sum;
}

function parseDiceFromCommandLine(stringToParse) {
    if (stringToParse && typeof stringToParse === 'string') {
        var parsed = stringToParse.split('d');
        var number = Number.parseInt(parsed[0]);
        var size = Number.parseInt(parsed[1]);

        if (!isNaN(number) && number > 0 && !isNaN(size) && size > 0) {
            return {
                number: number,
                size: size
            };
        }
    }

    return {};
}

function parseTargetFromCommandLine(stringToParse) {
    var direction = 'greater';

    if (!stringToParse || typeof stringToParse !== 'string' || stringToParse.length === 0) {
        return {};
    }

    var first = 0;
    var last = stringToParse.length - 1;

    if (stringToParse[first] === '+') {
        stringToParse = stripFirst(stringToParse);
    }

    if (stringToParse[last] === '+') {
        stringToParse = stripLast(stringToParse);
    }

    if (stringToParse[first] === '-') {
        direction = 'less';
        stringToParse = stripFirst(stringToParse);
    }

    if (stringToParse[last] === '-') {
        direction = 'less';
        stringToParse = stripLast(stringToParse);
    }

    var target = Number.parseInt(stringToParse);

    if (isNaN(target)) {
        return {};
    }

    return {
        target: target,
        direction: direction
    };

    function stripFirst(string) {
        return string.substring(1);
    }

    function stripLast(string) {
        return string.substring(0, string.length - 1);
    }
}

function convertDiceToListOfDiceSizes(listOfDiceObjects) {
    if (Array.isArray(listOfDiceObjects) && listOfDiceObjects.length > 0)
        return flatten(listOfDiceObjects.map(getSize)).filter(validNumber);
    return [];

    function getSize(diceObj) {
        if (!validNumber(diceObj.number)) {
            return null;
        }
        var n = diceObj.number;
        var result = [];
        while (n-- > 0)
            result.push(diceObj.size);
        return result;
    }

    function validNumber(value) {
        return value && typeof value === 'number';
    }
}

function getStatsForDice(diceConfig, optionalModifier, optionalPrecision){
    var diceToRoll = convertDiceToListOfDiceSizes(diceConfig);
    var rolls = computeRollsForDice(diceToRoll);
    var totals = combineTotals(rolls);
    var stats = getPercentageStatsFromTotals(totals, optionalPrecision);

    var modifier = Number(optionalModifier) || 0;
    var finalStats = {};

    if ( modifier ) {
        Object.keys(stats).forEach(function (key) {
            var newKey = Number(key) + modifier;
            finalStats[newKey] = stats[key];
        });
    }
    else {
        finalStats = stats;
    }

    return finalStats;
}
},{"./functions":1}]},{},[])("/dice")
});