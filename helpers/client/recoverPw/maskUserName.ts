export const maskUserName = (phone?: string , email?: string) => {
    let emailMasked;
    let phoneMasked;
    if (email) {
        const starArr = [];
        const chaUnmasked = [];
        let idx;
        for (let i = 0; i < email.length; i++) {
            starArr.push("*");
            if (email[i] == '@') idx = i;
            if (i < 3) chaUnmasked.push(email[i]);
        };
        
        starArr.splice(0,3,chaUnmasked.join(""));
        if (idx !== undefined) starArr.splice(idx,1,"@");

        emailMasked = starArr.join("");
    }
    if (phone) {
        const arrMasked = [];
        const arrUnmasked = [];
        for (let i = 0; i < phone.length; i++) {
            if (i < (phone.length-4)) arrMasked.push("*");
            else arrUnmasked.push(phone[i]);
        };
        
        const result = arrMasked.concat(arrUnmasked);
        phoneMasked = result.join("");
    }
    return {
        emailMasked: emailMasked,
        phoneMasked: phoneMasked
    };
}