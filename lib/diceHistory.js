(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.diceHistory = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/diceHistory":[function(require,module,exports){
module.exports = function(storage) {
    var history = loadFromStorage();

    function loadFromStorage() {
        var historyString = storage.getItem("history");

        if(historyString)
            return JSON.parse(historyString);
        else
            return [];
    }

    function saveToStorage() {
        storage.setItem("history", JSON.stringify(history));
    }

    function add(input) {
        if (isObject(input) && !containsInput(input)) {
            history.push(input);
            saveToStorage();
        }
    }

    function containsInput(input) {
        if(history.indexOf(input) > -1)
            return true;
        if(!input.diceConfig)
            return false;

        var sortedInput = input.diceConfig.sort(function(a, b) { return a.size - b.size; });
        return history.filter(function(historyItem) {
            if(!historyItem.diceConfig)
                return false;

            var sortedHistoryItem = historyItem.diceConfig.sort(function(a, b) { return a.size - b.size; });

            if(sortedHistoryItem.modifier != sortedInput.modifier)
                return false;
            if(sortedHistoryItem.length != sortedInput.length)
                return false;

            for(var i = 0; i < sortedInput.length; i++)
                if(sortedInput[i].size != sortedHistoryItem[i].size || sortedInput[i].number != sortedHistoryItem[i].number)
                    return false;

            return true;
        }).length;
    }

    function list() {
        return history;
    }

    function isObject(obj) {
        return !!obj && Object.prototype.toString.call(obj) === '[object Object]';
    }

    return {
        add: add,
        list: list
    };
};

},{}]},{},[])("/diceHistory")
});