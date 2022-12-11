"use strict";

(function () {

    function launch() {
        getDay1();
    }

// day 1
    let meals;

    function getDay1() { // hash map for icon filenames
        let url = `./assets/data/meals.txt`
        $.ajax(url).done(function (data) { // once we have lat lon from zip code get the local area name
            meals = data;
            day1();
            getDay2();
        }).fail(function (jqXhr, status, error) {
            alert("There was an error with the data file! Check the console for details");
            console.log("Response status: " + status);
            console.log("Error object: " + error);
        });
    }

    function day1() {
        let myArray = meals.split("\n");
        let totals = [];
        let sum = 0;
        for (let i = 0; i < myArray.length; i++) {
            if (myArray[i] !== "") {
                sum += parseInt(myArray[i]);
            } else {
                totals.push(sum);
                sum = 0;
            }
        }
        console.log("Day 1 - part 1: " + Math.max(...totals));
        totalTopThree(totals);
    }

    function totalTopThree(totals) {
        let sum = 0;
        let first = 0;
        let second = 0;
        let third = 0;
        let max = 0;
        for (let i = 0; i < totals.length; i++) {
            if (totals[i] > max) {
                first = i;
                max = totals[i];
            }
        }
        sum += totals[first];
        totals[first] = 0;
        max = 0;
        for (let i = 0; i < totals.length; i++) {
            if (totals[i] > max) {
                second = i;
                max = totals[i];
            }
        }
        sum += totals[second];
        totals[second] = 0;
        max = 0;
        for (let i = 0; i < totals.length; i++) {
            if (totals[i] > max) {
                third = i;
                max = totals[i];
            }
        }
        sum += totals[third];
        console.log("Day 1 - part 2: " + sum);
    }

// day 2
    let rps;

    function getDay2() { // hash map for icon filenames
        let url = `./assets/data/rockPaperSciccors.txt`
        $.ajax(url).done(function (data) { // once we have lat lon from zip code get the local area name
            rps = data;
            day2();
            getDay3();
        }).fail(function (jqXhr, status, error) {
            alert("There was an error with the data file! Check the console for details");
            console.log("Response status: " + status);
            console.log("Error object: " + error);
        });
    }

    function day2() {
        let myArray = rps.split("\n");
//    console.log(rps.length);
        let totalScore = 0;
        let score = 0;
        for (let i = 0; i < myArray.length; i++) {
            score = 0;
            let moveArray = myArray[i].split(" ");
//        console.log(moveArray[0] + " " + moveArray[1]);
            if (moveArray[1] === "X") {
                score += 1;
            } else if (moveArray[1] === "Y") {
                score += 2;
            } else if (moveArray[1] === "Z") {
                score += 3;
            }
//        console.log(score);
            if ((moveArray[0] === "A" && moveArray[1] === "Y") ||
                (moveArray[0] === "B" && moveArray[1] === "Z") ||
                (moveArray[0] === "C" && moveArray[1] === "X")) {
                score += 6;
            } else if ((moveArray[0] === "A" && moveArray[1] === "X") ||
                (moveArray[0] === "B" && moveArray[1] === "Y") ||
                (moveArray[0] === "C" && moveArray[1] === "Z")) {
                score += 3;
            } else {
                score += 0;
            }
            totalScore += score;
        }
        console.log("Day 2 - part 1: " + totalScore);
        strategyPart2(myArray);
    }

    function strategyPart2(myArray) {
        let totalScore = 0;
        let score = 0;
        for (let i = 0; i < myArray.length; i++) {
            score = 0;
            let moveArray = myArray[i].split(" ");
//        console.log(moveArray[0] + " " + moveArray[1]);
            if (moveArray[1] === "X") {// must lose
                score += 0;
                score += lose(moveArray[0]);
            } else if (moveArray[1] === "Y") {// must draw
                score += 3;
                score += draw(moveArray[0]);
            } else if (moveArray[1] === "Z") {// must win
                score += 6;
                score += win(moveArray[0]);
            }
            totalScore += score;
        }
        console.log("Day 2 - part 2: " + totalScore);
    }

    function lose(s) {
        switch (s) {
            case "A":
                return 3;
            case "B":
                return 1;
            case "C":
                return 2;
        }
    }

    function draw(s) {
        switch (s) {
            case "A":
                return 1;
            case "B":
                return 2;
            case "C":
                return 3;
        }
    }

    function win(s) {
        switch (s) {
            case "A":
                return 2;
            case "B":
                return 3;
            case "C":
                return 1;
        }

    }

// day 3
    let rucks;

    function getDay3() { // hash map for icon filenames
        let url = `./assets/data/rucks.txt`
        $.ajax(url).done(function (data) { // once we have lat lon from zip code get the local area name
            rucks = data;
            day3();
            getDay4();
        }).fail(function (jqXhr, status, error) {
            alert("There was an error with the data file! Check the console for details");
            console.log("Response status: " + status);
            console.log("Error object: " + error);
        });
    }

    function day3() {
        let myArray = rucks.split("\n");
        let totalPriorities = 0;
        for (let i = 0; i < myArray.length; i++) {
            let priority = 0;
            let l = myArray[i].length;
            let comp1 = myArray[i].slice(0, l / 2);
            let comp2 = myArray[i].slice(l / 2, l);
            let charVal = 0;
//        console.log(comp1, comp2);
            if (comp1.length > 0 && comp2.length > 0) {
                for (let j = 0; j < comp1.length; j++) {
                    if (comp2.includes(comp1.charAt(j))) {
                        charVal = comp1.codePointAt(j);
//                    console.log(j, comp1.charAt(j), charVal);
                        break;
                    }
                }
                //a = 97 maps to 1, A = 65 maps to 27
//            console.log("charval - ", charVal);
                if (charVal >= 97) {
                    priority = (charVal - 96);
                } else {
                    priority = (charVal - 38);
                }
//            console.log("Priority - ", priority);
                totalPriorities += priority;
//            console.log("Running total - ", totalPriorities);
            }
        }
        console.log("Day 3 - part 1: " + totalPriorities);
        rucksPart2(myArray);
    }

    function rucksPart2(myArray) {
        let totalPriorities = 0;
        for (let i = 0; i < myArray.length; i = i + 3) {
            let priority = 0;
            let charVal = 0;
            let common1and2 = "";
            for (let j = 0; j < myArray[i].length; j++) {
                if (myArray[i + 1].includes(myArray[i].charAt(j))) {
                    common1and2 = myArray[i].charAt(j);
                    if (myArray[i + 2].includes(common1and2)) {
                        charVal = myArray[i].codePointAt(j);
//                    console.log(j, comp1.charAt(j), charVal);
                        break;
                    }
                }
            }
            //a = 97 maps to 1, A = 65 maps to 27
//            console.log("charval - ", charVal);
            if (charVal >= 97) {
                priority = (charVal - 96);
            } else {
                priority = (charVal - 38);
            }
//            console.log("Priority - ", priority);
            totalPriorities += priority;
//            console.log("Running total - ", totalPriorities);
        }
        console.log("Day 3 - part 2: " + totalPriorities);
    }

// day 4
    let assignments;

    function getDay4() { // hash map for icon filenames
        let url = `./assets/data/assignments.txt`
        $.ajax(url).done(function (data) { // once we have lat lon from zip code get the local area name
            assignments = data;
            day4();
            getDay5();
        }).fail(function (jqXhr, status, error) {
            alert("There was an error with the data file! Check the console for details");
            console.log("Response status: " + status);
            console.log("Error object: " + error);
        });
    }

    function day4() {
        let myArray = assignments.split("\n");
        let totalContainments = 0;
        for (let i = 0 ; i < myArray.length; i ++) {
            let groups =  myArray[i].split(",");
            let g1 = groups[0].split("-");
            let g2 = groups[1].split("-");
            let g1Min = parseInt(g1[0]);
            let g1Max = parseInt(g1[1]);
            let g2Min = parseInt(g2[0]);
            let g2Max = parseInt(g2[1]);
            if ((g1Min <= g2Min && g1Max >= g2Max) ||
                (g2Min <= g1Min && g2Max >= g1Max)) {
                totalContainments++;
            }
        }
        console.log("Day 4 - part 1: " + totalContainments);
        assignmentsPart2(myArray);
    }

    function assignmentsPart2(myArray) {
        let totalOverlaps = 0;
        for (let i = 0 ; i < myArray.length; i ++) {
            let groups =  myArray[i].split(",");
            let g1 = groups[0].split("-");
            let g2 = groups[1].split("-");
            let g1Min = parseInt(g1[0]);
            let g1Max = parseInt(g1[1]);
            let g2Min = parseInt(g2[0]);
            let g2Max = parseInt(g2[1]);
            if (
                ((g1Min >= g2Min && g1Min <= g2Max) ||
                 (g1Max >= g2Min && g1Max <= g2Max))
                ||
                ((g1Min <= g2Min && g1Max >= g2Max) ||
                 (g2Min <= g1Min && g2Max >= g1Max))
                ) {
                    totalOverlaps++;
                }
            }
        console.log("Day 4 - part 2: " + totalOverlaps);
    }

    // day 5
    let movements;

    function getDay5() { // hash map for icon filenames
        let url = `./assets/data/crates.txt`
        $.ajax(url).done(function (data) { // once we have lat lon from zip code get the local area name
            movements = data;
            day5();
            getDay6();
        }).fail(function (jqXhr, status, error) {
            alert("There was an error with the data file! Check the console for details");
            console.log("Response status: " + status);
            console.log("Error object: " + error);
        });
    }

    function day5() {
        let parts = movements.split("\n\n");
        let stacks = buildStacks();
        let myArray = parts[1].split("\n");;
        for (let i = 0 ; i < myArray.length; i ++) {
            let instBlocks = myArray[i].split(" ");
            let quant = instBlocks[1];
            let from = instBlocks[3];
            let to = instBlocks[5];
            for (let j = 0 ; j < quant; j ++) {
                let held = stacks[from].pop();
                stacks[to].push(held);
            }
        }
        let tops = "";
        for (let i = 1; i < 10; i ++) {
            tops += stacks[i].pop();
        }
        console.log("Day 5 - part 1: " + tops);
        movementsPart2(myArray);
    }

    function buildStacks() {
        let stacks = [];
        stacks.push([]);
        stacks.push(['C','Z','N','B','M','W','Q','V']);
        stacks.push(['H','Z','R','W','C','B']);
        stacks.push(['F','Q','R','J']);
        stacks.push(['Z','S','W','H','F','N','M','T']);
        stacks.push(['G','F','W','L','N','Q','P']);
        stacks.push(['L','P','W']);
        stacks.push(['V','B','D','R','G','C','Q','J']);
        stacks.push(['Z','Q','N','B','W']);
        stacks.push(['H','L','F','C','G','T','J']);
        return stacks;
    }

    function movementsPart2(myArray) {
        let stacks = buildStacks();
        for (let i = 0 ; i < myArray.length; i ++) {
            let instBlocks = myArray[i].split(" ");
            let quant = instBlocks[1];
            let from = instBlocks[3];
            let to = instBlocks[5];
            let holder = [];
            for (let j = 0 ; j < quant; j ++) {
                let held = stacks[from].pop();
                holder.push(held);
            }
            for (let j = 0 ; j < quant; j ++) {
                let held = holder.pop();
                stacks[to].push(held);
            }
        }
        let tops = "";
        for (let i = 1; i < 10; i ++) {
            tops += stacks[i].pop();
        }
        console.log("Day 5 - part 2: " + tops);
    }

    // day 6
    let signal;

    function getDay6() { // hash map for icon filenames
        let url = `./assets/data/signal.txt`
        $.ajax(url).done(function (data) { // once we have lat lon from zip code get the local area name
            signal = data;
            day6();
            getDay7();
        }).fail(function (jqXhr, status, error) {
            alert("There was an error with the data file! Check the console for details");
            console.log("Response status: " + status);
            console.log("Error object: " + error);
        });
    }

    function day6() {
        let signalArray = signal.split('');
        let leadup = 0;
        for (let i = 0; i < signalArray.length-4; i ++) {
            if (fourDifferent(signalArray[i], signalArray[i+1], signalArray[i+2], signalArray[i+3]) === true) {
                leadup = i + 4;
                break;
            }
        }
        console.log("Day 6 - part 1: " + leadup);
        signalPart2();
    }

    function fourDifferent(a, b, c, d) {
        return (a !== b && a !== c && a !== d &&
                b !== c && b !== d &&
                c !== d);
    }

    function signalPart2() {
        let signalArray = signal.split('');
        let leadup = 0;
        for (let i = 0; i < signalArray.length-14; i ++) {
            let arr = [signalArray[i], signalArray[i+1], signalArray[i+2], signalArray[i+3],
                signalArray[i+4], signalArray[i+5], signalArray[i+6], signalArray[i+7],
                signalArray[i+8], signalArray[i+9], signalArray[i+10], signalArray[i+11],
                signalArray[i+12], signalArray[i+13]];
            let str = arr.join('');
                if (fourteenDifferent(str, arr) === true) {
                leadup = i + 14;
                break;
            }
        }
        console.log("Day 6 - part 2: " + leadup);
    }

    function fourteenDifferent(str, arr) {
        let multi = false;
        for (let i = 0; i < arr.length; i ++) {
            multi = false;
            let newStr = str.substring(0, i) + str.substring(i+1,str.length);
            // console.log(str);
            // console.log(newStr)
            // console.log(str.charAt(i));
            // console.log(newStr.includes(str.charAt(i)));
            if (newStr.includes(str.charAt(i))) {
                multi = true;
                break;
            }
        }
//        console.log(multi);
        return !multi;
    }

    // day 7
    let entries;
    let foundIt;

    function getDay7() { // hash map for icon filenames
        let url = `./assets/data/terminalEntries.txt`
        $.ajax(url).done(function (data) { // once we have lat lon from zip code get the local area name
            entries = data;
            day7();
            //getDay8();
        }).fail(function (jqXhr, status, error) {
            alert("There was an error with the data file! Check the console for details");
            console.log("Response status: " + status);
            console.log("Error object: " + error);
        });
    }

    function day7() {
        let myArray = entries.split("\n");
//        let subDir = new Entity("directory", "dgsmith", 0, null)
        let struct = new Entity("directory", "/", 0, []);
 //       showEntity(struct, 0);
 //       console.log(dirExists(struct, "blue"));
        let currentDir = "/";
        let currentEntity = struct;
        let dirNames = new Map();
        let fileNames = new Map();
        for (let i = 0 ; i < myArray.length; i ++) {
            let buildItem = new Entity("", "", 0, []);
            let parts = myArray[i].split(' ');
            switch (parts[0]) {
                case '$':
//                    console.log("command " + myArray[i]);
                    if (parts[1] === "cd") {
                        currentDir = parts[2];
                        getEntity(struct, currentDir);
                        currentEntity = foundIt;
//                        console.log("       change directory to " + currentDir);
                    } else {
//                        console.log("       list of " + currentDir + " follows:");
                    }
                    break;
                case 'dir':
//                    console.log("directory " + myArray[i]);
                    buildItem.type = "directory";
                    buildItem.name = parts[1];
                    buildItem.size = 0;
                    buildItem.contents = [];
                    currentEntity.contents.push(buildItem);
                    dirNames.set(parts[1], currentEntity.name);  // dirname to parent
                    break;
                default:
//                    console.log("fileSize " + myArray[i]);
                    buildItem.type = "file";
                    buildItem.name = parts[1];
                    buildItem.size = parseInt(parts[0]);
                    //currentEntity.size += parseInt(parts[0]);
                    buildItem.contents = [];
                    currentEntity.contents.push(buildItem);
                    fileNames.set(parts[1], {size: parseInt(parts[0]), parent: currentEntity.name} ); // filename to size,parent
                    break;
            }
        }
        console.log("Show structure");
        showEntity(struct, 0);
        console.log(dirNames);              // dirname to parent
        console.log(fileNames);             // filename to size,parent

        let newDirs = new Map();
        for (const item of fileNames) {
            if (!newDirs.has(item[1].parent)) {
                if (dirNames.get(item[1].parent) === undefined) {
                    newDirs.set('root', {size:0, parent: 'none'});
                } else{
                    newDirs.set(dirNames.get(item[1].parent), {size: 0, parent: dirNames.get(item[1].parent)});
                }
            }
        }
        console.log(newDirs);
        /*
        for (const item of fileNames) {
            console.log("has - ", item[1].parent);
            // let n;
            // if (item[1].parent === "/") {
            //     n = "root";
            // } else {
            //     n = item[1].parent;
            // }
            if (newDirs.has(item[1].parent)) {
                console.log(newDirs.get(item[1].parent));
                console.log(item[1].size);
                console.log(newDirs.get(item[1].parent));
                newDirs.set(item[1].parent,{size: newDirs.get(item[1].parent).size + item[1].size, parent: newDirs.get(item[1].parent)})
            }
        }
        console.log(newDirs);    // filename to size,parent
*/
        // let nextNewDirs = new Map();
        // for (const item of newDirs) {
        //     if (!newDirs.has(item[1].parent)) {
        //         nextNewDirs.set(item[1].parent, {size: 0, parent: });
        //     }
        // }

        entriesPart2();
    }

    function Entity(type, name, size, contents) {
        this.type = type;
        this.name = name;
        this.size = size;
        this.contents = contents;
    }

    // function dirExists(ent, name) {
    //     let exists = false;
    //     if (ent.name === name) {
    //         exists = true;
    //     }
    //     if (ent.contents !== []) {
    //         for (let i = 0; i < ent.contents.length; i ++) {
    //             exists = dirExists(ent.contents[i], name);
    //         }
    //     }
    //     return exists;
    // }

    function getEntity(ent, name) {
        if (ent.name !== name) {
//            console.log("nope");
            if (ent.contents !== []) {
                for (let i = 0; i < ent.contents.length; i ++) {
                    getEntity(ent.contents[i], name);
                }
            }
        } else {
//            console.log("Found it");
            foundIt = ent;
        }
    }

    function findDirSizes(dirNames, fileNames) {
        let subDirs = [];
        let subDirSizes = [];
        for (let i = 0; i < fileNames.length; i ++) {
            if (!subDirs.includes(fileNames[i].parent)) {
                subDirs.push(fileNames[i].parent);
                subDirSizes.push({name: fileNames[i].parent, size: fileNames[i].size})
            } else {
                subDirSizes[subDirs.indexOf(fileNames[i].parent)].size += fileNames[i].size;
            }
        }
        console.log("Next step - ");
        console.log(findDirSizes2(dirNames, subDirSizes));

        //return subDirSizes;
        return findDirSizes2(dirNames, subDirSizes);
    }

    function findDirSizes2(dirNames, subDirSizes) {  // name and parent    name and size of all files
        console.log("dn", dirNames);
        console.log("sds", subDirSizes);
        let nextDirs = [];
        let nextDirsSizes = [];
        for (let i = 0; i < dirNames.length; i ++) {
            if (!nextDirs.includes(dirNames[i].parent)) {
                nextDirs.push(dirNames[i].parent);  // if a unique parent name is not in the array add it
                nextDirsSizes.push({name: dirNames[i].parent, size: 0})  // and add size to 0
           }
        }
        console.log("nds", nextDirsSizes);
        for (let i = 0; i < dirNames.length; i ++) {
            for (let j = 0; j < subDirSizes.length; j ++) {
                if (dirNames[i].parent === subDirSizes[j].name) {
                    nextDirsSizes[nextDirs.indexOf(dirNames[i].parent)].size += subDirSizes[j].size;
                }
            }
        }
        console.log("this one:");
        console.log(nextDirsSizes);
        return nextDirsSizes;
    }

    function showEntity(ent, lvl) {
        console.log(" ".repeat(lvl) + ent.type + " " + ent.name + " " + ent.size);
        lvl += 3;
        if (ent.contents !== []) {
            for (let i = 0; i < ent.contents.length; i ++) {
                showEntity(ent.contents[i], lvl);
            }
        }
    }

    function topThreeDirSum(totals) {
        let sum = 0;
        let first = 0;
        let second = 0;
        let third = 0;
        let max = 0;
        for (let i = 0; i < totals.length; i++) {
            if (totals[i].size > max) {
                first = i;
                max = totals[i].size;
            }
        }
        sum += totals[first].size;
        totals[first].size = 0;
        max = 0;
        for (let i = 0; i < totals.length; i++) {
            if (totals[i].size > max) {
                second = i;
                max = totals[i].size;
            }
        }
        sum += totals[second].size;
        totals[second].size = 0;
        max = 0;
        for (let i = 0; i < totals.length; i++) {
            if (totals[i].size > max) {
                third = i;
                max = totals[i].size;
            }
        }
        sum += totals[third].size;
        return sum;
    }

    function scrub(myArray) {
        console.log(myArray);
        for (let i = 0; i < myArray.length; i ++) {
            if (myArray[i].size > 100000) {
                myArray[i].size = 0;
            }
        }
        console.log(myArray);
        return myArray;
    }

    function entriesPart2() {

        console.log("Day 7 - part 2: ");
    }

    launch();

}());