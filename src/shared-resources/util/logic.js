

function isIntersection(set1, set2) {
    (set1.size > set2.size) && ([set1, set2] = [set2, set1]);
    for (const member of set1) {
        if (set2.has(member)) return true
    }
    return false;
}

export {
    isIntersection
}