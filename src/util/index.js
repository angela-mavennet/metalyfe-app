import SHA256 from 'sha256';

export function checkUserCount(email, hashArray, max_count) {
    
    if (!email) {
        const email = SHA256("random email 12123123");
        console.log("email in index", email)
    }
    const key = SHA256(email);
    console.log("key", key)
    //check value
    const savedValue = localStorage.getItem(key)
    // console.log("savedValue", savedValue)
    
    if(savedValue == SHA256(max_count.toString())) {
        // console.log("max count reached" + SHA256(max_count))
      return false
    } 
    else if (savedValue) {
       //increment
       const index = hashArray.indexOf(savedValue);
    //    console.log("last index", index)
        // console.log("new index", index + 1)

       const newValue = SHA256((index + 1).toString());
    //    console.log("newValue", newValue);
       localStorage.setItem(key, newValue);
       
    }
    else {
        //first time
        const one = SHA256((0).toString())
        localStorage.setItem(key, one);
        // console.log("set new value first time", one);
    }
    return true
}


export function createHashCount(max_count) {
    let hashArray = [];
    for(var i =0; i < max_count; i++) {
        // console.log(SHA256(i.toString()));
        // console.log(i);
        hashArray.push(SHA256(i.toString()));
    }
    
    // console.log("hashArray", hashArray);
    return hashArray;
}